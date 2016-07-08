var crypto = require('crypto');
var util = require('util');
var Model = require('./obsModel');
var log = require('./log.js').logUtil;

function Utils() {
	var access_key_id = "", secret_access_key = "", is_secure = false, server = "", path_style = true, is_v2Auth = true, region = null;
	// 1103-超时重连问题修复
//	var flag = true, reopt = null, msg = "", body = "";

	/**
	 * 初始化服务参数
	 * @param access_key_id_in 连接华为OBS的AK
	 * @param secret_access_key_in 鉴权使用的SK，可用于字符串的签名
	 * @param is_secure_in 连接是否使用SSL
	 * @param server_in 连接的服务器
	 * @param path_style_in 连接请求的格式是否是路径方式，True：是，False：不是
	 * @param is_v2Auth_in 是否用V2鉴权,True:V2鉴权，False:V4鉴权
	 * @param region_in 服务器所在区域，当鉴权方式为v4时，必选
	 * @returns 
	 */
	this.initFactory = function(access_key_id_in, secret_access_key_in, is_secure_in,
			server_in, path_style_in,is_v2Auth_in,region_in){
		
		access_key_id = access_key_id_in;			
		secret_access_key = secret_access_key_in;	
		server = server_in;						
		if ((typeof is_secure_in) == "boolean") {
			is_secure = is_secure_in;				
		}
		if ((typeof path_style_in) == "boolean") {
			path_style = path_style_in;				
		}
		if ((typeof is_v2Auth_in) == "boolean") {
			is_v2Auth = is_v2Auth_in;			
		}
		region = region_in;
	};
	
	/**
	 * 准备参数配置信息
	 * @param methodName 接口名
	 * @param prame 请求参数配置信息，Map类型，请求格式参见obsModel.js对应接口名的值
	 * @returns map 转换后的参配置信息
	 */
	this.makePrame = function(methodName,prame){
		var Fun = new Model();
		var model = Fun.getMode()['operations'][methodName];
		var method = model['httpMethod'];
		var uri = "/";
		var urlPath = "";
		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		var exheaders = {};
		var opt = {};
		var xmlFlag = false;
			
		if ('urlPath' in model){
			urlPath += "?" + model['urlPath'];
		}
		if('data' in model){
			xml += "<"+model['data']['xmlRoot'];
			if('namespace' in model['data']){
				xml += "  xmlns=\"" + model['data']['namespace'] + "\"";
			}
			xml += ">";
		}
		for (key in model['parameters']){
			meta =  model['parameters'][key];
			if (('required' in meta) && !(key in prame)){
				opt['err'] = key+" is required element!";
				log.RunLog('error',methodName,opt['err']);
				return opt;
			}
			if(meta['location'] == 'uri' && (key in prame)){
				if(uri == "/"){
					uri += prame[key];
				}else{
					uri += "/"+prame[key];
				}
			}
			if(meta['location'] == 'header'&& (key in prame)){
				if(meta['type'] == 'object'){
					if('x-amz-meta-' == meta['sentAs']){
						for(item in prame[key]){
							var iKey = meta['sentAs'] + item;
							exheaders[encodeURI(iKey).toLowerCase().trim()] = encodeURI(prame[key][item].trim());
						}
					}
				}else if(meta['type'] == 'array'){
					var arr = new Array();
					for(item in prame[key]){
						arr[item] = encodeURI(prame[key][item]);
					}
//					arr = prame[key];
					exheaders[meta['sentAs']] = arr;
				} else {
					// 修复%转义问题
					exheaders[meta['sentAs']] = encodeURI(prame[key]).replace(/\%20/g, "\ ");
				}
			}
			if(meta['location'] == 'urlPath' && (key in prame)){
				if(urlPath == ""){
					urlPath += "?" + meta['sentAs'] + "=" + prame[key];
				}else{
					urlPath += "&" + meta['sentAs'] + "=" + prame[key];
				}
			}
			if(meta['location'] == 'xml' && (key in prame)){
				var xmldate = model['parameters'];
				var mxml = toXml(prame,xmldate,key);
				if(mxml != ""){
					xmlFlag = true;
				}
				xml += mxml;
			}
			if(meta['location'] == 'body' && (key in prame)){
				xml = prame[key];
				xmlFlag = true;
			}		
		}
		if (xmlFlag){
			if('data' in model){
				xml += "</"+model['data']['xmlRoot'] + ">";
			}
		}else{
			xml = "";
		}
//		if(xml.length != 0){
//			logger.debug("prepare send msg:" + xml);
//		}
//		xml  = new Buffer(xml,'utf8');
//		if(xml.length != 0){
//			exheaders['content-Length'] = xml.length;
//		}
		
		exheaders['host'] = encodeURI(server);
		if(!(path_style)){
			var uriList = uri.split('/');
			if(uriList.length >= 2 && uriList[1] != null && uriList[1] != ""){
				exheaders['host'] = encodeURI(uriList[1] + "." + server);
			}
		}
		
		exheaders['date'] = new Date().toUTCString();
		
		opt['method'] = method;
		opt['uri'] = encodeURI(uri);
		opt['urlPath'] = encodeURI(urlPath).replace(/\//g, "%2F");
		opt['xml'] = xml;
		opt['headers'] = exheaders;
		return opt;
	};

	/**
	 * 执行请求
	 * @param methodName 接口名
	 * @param opt 请求参数
	 * @param bc 回调函数，执行结构通过回调函数返回，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.makeRequest = function(methodName,opt,bc){
		var fs = require('fs');
		var makeport = 80;
		var http = require('http');
		if (is_secure) {
			makeport = 443;
			http = require('https');
		}
//		if (true == flag) {
		if (('SourceFile' in opt)) {
			if (!fs.existsSync(opt['SourceFile'])) {
				var err = "the file [" + opt['SourceFile']+ "] is not exist!";
				log.RunLog('error', methodName, err);
				bc(err, null);
				return;
			}
			if (!('content-Length' in opt['headers'])) {
				var statInfo = fs.statSync(opt['SourceFile']);
				opt['headers']['content-Length'] = statInfo.size;
			}
			if (!('content-type' in opt['headers'])) {
				opt['headers']['content-type'] = "";
			}
		}
		opt['headers']['date'] = new Date().toUTCString();
		if('authorization' in opt['headers']){
			delete opt['headers']['authorization'];
		}

		var path = opt['uri'] + opt['urlPath'];
		if (is_v2Auth) {
			opt = makeStringToSign(access_key_id, secret_access_key, opt);
		} else {
			opt = v4Auth(region, access_key_id, secret_access_key, opt);
		}
	
		var ex = opt['headers'];
		var body = opt['xml'];
		body = new Buffer(body, 'utf8');
		if (body.length != 0) {
			ex['content-Length'] = body.length;
		}
		var msg = "method:" + opt['method'] + ", path:" + path + "\nheaders:"
				+ headerTostring(ex);
		if (opt['xml'] != "" && opt['xml'] != null) {
			msg += "\nbody:" + opt['xml'];
		}
		log.RunLog('info', methodName, "prepare request parameters ok,then Send request to service start");
		log.RunLog('debug',methodName, "request msg:" + msg);
		var reopt = {
			method : opt['method'],
			host : ex['host'],
			port : makeport,
			path : path,
			rejectUnauthorized : false,
			headers : ex,
		};
//			flag = false;
//		}
		var startTime = log.GetNowTime();

		var req = null;
		if('SaveAsFile' in opt){
			req = http.request(reopt,
				function(serverback) {
					getRequest(methodName,serverback,opt['SaveAsFile'],startTime,msg,bc);
					return;
				});
		}else{
			req = http.request(reopt,
				function(serverback) {
					getRequest(methodName,serverback,null,startTime,msg,bc);
					return;
				});
		}
		req.on('error',function(err){
			if(err){
				log.RunLog('error',methodName,"Send request to service error [" + headerTostring(err) + "]");
				log.InterfaceLog('error',methodName,server,null,startTime,msg,err['errno'],"error Msg:[" + headerTostring(err) + "]");
				bc(err,"connectErr");
				return;
			}
		});
		if(!('SourceFile' in opt)){
			req.write(body);
			req.end();
		}else {
			var stream = fs.createReadStream(opt['SourceFile']);
			stream.on('error',function(err){
				req.end();
				log.RunLog('error',methodName,"read file to send error [" + headerTostring(err) + "]");
				log.InterfaceLog('error',methodName,server,null,startTime,msg,err['errno'],"error Msg:[" + headerTostring(err) + "]");
				bc(err,null);
			});
			stream.pipe(req);
			stream.on('end',function(){
				req.end();
			});
		}
	};

	/**
	 * 字符串MD5值编码
	 * @param str 待编码字符串
	 * @returns string 编码后的MD5值
	 */
	this.strMD5 = function(data) {
		//  修复中文编码问题
		var Buffer = require('buffer').Buffer;
		var buf = new Buffer(data);
		var str = buf.toString("binary");
		var crypto = require('crypto');
		return crypto.createHash('md5').update(str).digest('base64');
	};
	
	/**
	 * 文件MD5值编码
	 * @param str 待编码的文件路径
	 * @returns string 编码后的MD5值
	 */
	this.fileMD5 = function (filePath,bc){
		var crypto = require('crypto');
		var fs = require('fs');
		var stream = fs.createReadStream(filePath);
		var sha = crypto.createHash('md5');
		stream.on('error',function(err){
			if(err){				
				bc(err,null);
			}
		});
		stream.on('data',function(data){
			sha.update(data);
		});
		stream.on('end',function(){
			var md5 = sha.digest('base64');
			bc(null,md5);
			return;
		});
	};
	
	
	/**
	 * 字典转字符串（记录日志用）
	 * @param obj 待转换字典原型
	 * @returns {String} 转换后的字符串
	 */
	function headerTostring(obj){
		var strout = "{";
		for (key in obj){
			if(strout == "{"){
				strout += key + ":" + obj[key]; 
			}else{
				strout += "," + key + ":" + obj[key];
			}
		}
		strout += "}";
		return strout;
	};
	
	/**
	 * V2鉴权
	 * @param obj 待转换字典原型
	 * @returns {String} 转换后的字符串
	 */
	function makeStringToSign(ak,sk, opt) {
		var method = opt['method'];
		var path = opt['uri'];
		var flag = "x-amz-";
		var listFlag = ["acl", "lifecycle", "location", "logging", "notification", "partNumber", "policy",
		                "uploadId", "uploads", "versionId", "versioning", "versions", "website", "quota",
		                "storagePolicy", "storageinfo", "delete", "deletebucket","cors", "response-content-type",
		                "response-content-language", "response-expires", "response-cache-control", 
		                "response-content-disposition","response-content-encoding"];
		var stringToSign = method + "\n";
		if('Content-MD5' in opt['headers']){
			stringToSign += opt['headers']['Content-MD5'];
		}
		stringToSign += "\n";
		// if('content-Type' in opt['headers']){
		// stringToSign += opt['headers']['content-Type'];
		// }
		var contentType = (null == opt['headers']['content-Type'] ? ""
				: opt['headers']['content-Type']);
		stringToSign += contentType;
		stringToSign += "\n";
		if (!('x-amz-date' in opt['headers'])){
			stringToSign += opt['headers']['date'];
		}
		stringToSign += "\n";
		var amz = new Array();
		var i = 0;
		for(key in opt['headers']){
			if (key.length > flag.length && key.slice(0,flag.length) == flag){
				amz[i] = key;
				i++;
//				stringToSign += key + ":" + opt['headers'][key] + "\n";
			}
		}
		amz = amz.sort();
		for(key in amz){
			stringToSign += amz[key] + ":" + opt['headers'][amz[key]] + "\n";
		}
		if(opt['urlPath'] != ""){
			var listopt = opt['urlPath'].split("&");
			var urlPath = "";
			for(i in listopt){
				var strOpt = listopt[i];
				if(strOpt[0] == '?'){
					strOpt = strOpt.slice(1);
				}
				
				var listvar = strOpt.split("=");
				for(var j = 0; j < listFlag.length; j++){
					if(listvar[0] == listFlag[j]){
						if(urlPath == ""){
							urlPath += "?" + strOpt;
						}else{
							urlPath += "&" + strOpt;
						}
						break;
					}
				}
			}
			path += urlPath;
		}
		stringToSign += path;
//		console.log("stringToSign:"+stringToSign);
		var hmac = crypto.createHmac('sha1', sk);
		hmac.update(stringToSign);
		opt['headers']['authorization'] = "AWS " + ak + ":" + hmac.digest(encoding = 'base64');
		return opt;
//		return hmac.digest(encoding = 'base64');
	}

	/**
	 * 获取http响应消息
	 * @param methodName接口方法名
	 * @param serverback http或https请求的回调函数
	 * @param filePath 下载文件的路径，非下载的时候填null
	 * @param startTime 请求开始时间，用于接口日志时间统计
	 * @param sendMsg 请求发送的消息，用于接口日志
	 * @param bc 回调函数
	 */
	function getRequest(methodName,serverback,filePath,startTime,sendMsg,bc){
		var opt ={};
		var Fun = new Model();
		var respOut = methodName + "Output";
		var model = Fun.getMode()['operations'][respOut];
		var obj = model['parameters'];
		opt['CommonMsg'] = {};
		opt['InterfaceResult'] = {};
		opt['CommonMsg']['Status']=serverback.statusCode;
		opt['CommonMsg']['Code'] = "";
		opt['CommonMsg']['Message'] = "";
		opt['CommonMsg']['HostId'] = "";
//		logger.debug("response statusCode:" + serverback.statusCode + ", headers:" + headerTostring(serverback.headers));
		log.RunLog('info',methodName,"get response start, statusCode:" + serverback.statusCode);
		log.RunLog('debug',methodName,"response msg :"+"statusCode:" + serverback.statusCode + ", headers:" + headerTostring(serverback.headers));
		if(filePath != null && serverback.statusCode < 300){
			var fs = require('fs');
			var stream = fs.createWriteStream(filePath);
			stream.on('error',function(err){
				stream.end();
				log.RunLog('error',methodName,"get response stream error [" + headerTostring(err) + "]");
				log.InterfaceLog('error',methodName,server,null,startTime,sendMsg,err['errno'],"error Msg:[" + headerTostring(err) + "]");
				bc(err,null);
				return;
			});
			serverback.pipe(stream);
			serverback.on('end',function(){
				stream.end();
				for (key in obj){
					if(obj[key]['location'] == 'header'){
						opt['InterfaceResult'][key] = "";
						if(obj[key]['sentAs'] in serverback.headers){
							opt['InterfaceResult'][key] = serverback.headers[obj[key]['sentAs']];
						}			
					}
				}
				log.RunLog('info',methodName,"exec interface " + methodName + " finish, Status:" + opt['CommonMsg']['Status'] + ", Code: ,Message: ");
				log.InterfaceLog('info',methodName,server,null,startTime,sendMsg,"0","Status :"+opt['CommonMsg']['Status']+", headers:" + headerTostring(serverback.headers));
				bc(null,opt);
				return;
			});
		}
		else{
			var body = "";
			serverback.on('data', function(data) {
				body += data;
			}).on('end', function() {
				var respMsg = "Status: "+opt['CommonMsg']['Status']+", headers: " +  headerTostring(serverback.headers);
				if(body != ""){
					respMsg += "\nbody: " + body;
					log.RunLog('debug',methodName,"response body :"+body);
				}
				log.InterfaceLog('info',methodName,server,null,startTime,sendMsg,"0",respMsg);
				if(serverback.statusCode < 300){
					for (key in obj){
						if(obj[key]['location'] == 'header'){
							opt['InterfaceResult'][key] = "";
								if(obj[key]['sentAs'] in serverback.headers){
									opt['InterfaceResult'][key] = serverback.headers[obj[key]['sentAs']];
								}			
						}
					}
					if(body != ""){
						if('data' in model && model['data']['type'] == 'xml'){
							makeObjFromXml(body,function(err,result){
								if(err){
									log.RunLog('error',methodName,"change xml to json err [" + headerTostring(err) + "]" );
									bc(err,null);
									return;
								}else{
									for (key in obj){
										if(obj[key]['location'] == 'xml'){
											var tempOpt = obj;
											var tempResult = result;
											if('xmlRoot' in model['data'] && model['data']['xmlRoot']  !== ""){
												tempResult = result[model['data']['xmlRoot']];
											}
											opt['InterfaceResult'][key] = jsonToObject(tempOpt,tempResult,key)[key];
										}
									}
								}
							});
						}else if('data' in model && model['data']['type'] == 'body'){
							for (key in obj){
								if(obj[key]['location'] == 'body'){
									opt['InterfaceResult'][key] = body;
								}
							}
						}
					}
				}else{
					if(body != ""){
						makeObjFromXml(body,function(err,re){
							if(err){
								log.RunLog('error',methodName,"change xml to json err [" + headerTostring(err) + "]" );
								bc(err,null);
								return;
							}else{
								if('Error' in re){
									var errMsg = re['Error'];
									if('Code' in errMsg){
										opt['CommonMsg']['Code'] = errMsg['Code'];
									}
									if('Message' in errMsg){
										opt['CommonMsg']['Message'] = errMsg['Message'];
									}
									if('HostId' in errMsg){
										opt['CommonMsg']['HostId'] = errMsg['HostId'];
									}
								}
							}
						});
					}
				}
				var logMsg = "Status:" + opt['CommonMsg']['Status'] + ", Code:";
				if('Code' in opt['CommonMsg']){
					logMsg += opt['CommonMsg']['Code'];
				}
				logMsg += ", Message:";
				if('Message' in opt['CommonMsg']){
					logMsg += opt['CommonMsg']['Message'];
				}
				log.RunLog('info',methodName,"exec interface " + methodName + " finish, "+logMsg);
				bc(null,opt);
			});
		}

		return;
	}

	/**
	 * 组装xml
	 * @param mXml 组装xml字符串的object消息体
	 * @param xmlMeta xml组装object模型
	 * @param root xml当前的根节点
	 * @returns {String} 组装后的xml字符串
	 */
	function toXml(mXml,xmlMeta,root){
		var xml = ""; 
		if(root != null){
			if(root in mXml){
				var key = root;
				
				if(xmlMeta[key]['type'] != 'array' && xmlMeta[key]['type'] != 'object' && xmlMeta[key]['sentAs']){
					xml += "<"+xmlMeta[key]['sentAs'] + ">"+mXml[key]+"</"+xmlMeta[key]['sentAs']+">";
				}else if(xmlMeta[key]['type'] == 'array' &&  xmlMeta[key]['sentAs']){	
					var xmlData = xmlMeta[key]['sentAs'];
					var xmlKey = key;
					for(var i = 0; i < mXml[xmlKey].length; i++){				
						if(xmlMeta[xmlKey]['items']['type'] != 'array' && xmlMeta[xmlKey]['items']['type'] != 'object'){
							xml += "<"+xmlData +">"+ mXml[key][i] + "</"+xmlData +">";
						}else if(xmlMeta[xmlKey]['items']['type'] == 'object'){
							xml += "<"+xmlData +">"+ toXml(mXml[xmlKey][i],xmlMeta[xmlKey]['items']['parameters'],null) + "</"+xmlData +">";
						};
					};
				}else if(xmlMeta[key]['type'] == 'object' && xmlMeta[key]['sentAs']){
					var xmlData = xmlMeta[key]['sentAs'];
					xml += "<"+xmlData;
					if('data' in xmlMeta[key]){
						if('xsiNamespace' in xmlMeta[key]['data']){
							xml += "  xmlns:xsi=\"" +  xmlMeta[key]['data']['xsiNamespace'] + "\"";
						}
						if('xsiType' in xmlMeta[key]['data']){
							xml += "  xsi:type=\"" + mXml[key][xmlMeta[key]['data']['xsiType']] + "\"";
						}
					}
					xml += ">";
					xml += toXml(mXml[key],xmlMeta[key]['parameters'],null) + "</"+xmlData +">";
				};
			}
		}else{
			for (key in xmlMeta){
				if (key in mXml){
					if(xmlMeta[key]['type'] != 'array' && xmlMeta[key]['type'] != 'object' && xmlMeta[key]['sentAs']){
						xml += "<"+xmlMeta[key]['sentAs'] + ">"+mXml[key]+"</"+xmlMeta[key]['sentAs']+">";
					}else if(xmlMeta[key]['type'] == 'array' && xmlMeta[key]['sentAs']){	
						var xmlData = xmlMeta[key]['sentAs'];
						var xmlKey = key;
						for(var i = 0; i < mXml[xmlKey].length; i++){				
							if(xmlMeta[xmlKey]['items']['type'] != 'array' && xmlMeta[xmlKey]['items']['type'] != 'object'){
								xml += "<"+xmlData +">"+ mXml[key][i] + "</"+xmlData +">";
							}else if(xmlMeta[xmlKey]['items']['type'] == 'object'){
								xml += "<"+xmlData +">"+ toXml(mXml[xmlKey][i],xmlMeta[xmlKey]['items']['parameters'],null) + "</"+xmlData +">";
							};
						};
					}else if(xmlMeta[key]['type'] == 'object' && xmlMeta[key]['sentAs']){
						var xmlData = xmlMeta[key]['sentAs'];
						
						xml += "<"+xmlData;
						if('data' in xmlMeta[key]){
							if('xsiNamespace' in xmlMeta[key]['data']){
								xml += "  xmlns:xsi=\"" +  xmlMeta[key]['data']['xsiNamespace'] + "\"";
							}
							if('xsiType' in xmlMeta[key]['data']){
								xml += "  xsi:type=\"" + mXml[key][xmlMeta[key]['data']['xsiType']] + "\"";
							}
						}
						xml += ">";
						xml += toXml(mXml[key],xmlMeta[key]['parameters'],null) + "</"+xmlData +">";
					};
				};
			}
		}
		return xml;
	}

	/**
	 * json转object结构体
	 * @param model 转换object的模型
	 * @param obj 待转换的json对象
	 * @param root 待转换的根节点
	 * @returns 转化后的object结构体
	 */
	function jsonToObject(model,obj,root){
		var opt = {};
//		opt[root] = obj[root];
//		return opt[root];
		if(root != null){
			var key = root;
			var datekey = key;
			if( obj != null && obj != "" && model[key]['sentAs'] in obj){
				if(model[key]['type'] != 'object' && model[key]['type'] != 'array'){
					opt[key] = obj[model[key]['sentAs']];
				}else if(model[key]['type'] == 'object'){
					opt[key] = jsonToObject(model[datekey]['parameters'],obj[model[datekey]['sentAs']],null);
					
				}else if(model[key]['type'] == 'array'){
					var arr = new Array();
					if(!isArray(obj[model[datekey]['sentAs']])){
						if(model[datekey]['items']['type'] == 'object'){
							arr[0] = jsonToObject(model[datekey]['items']['parameters'],obj[model[datekey]['sentAs']],null);
						}else{
							arr[0] = obj[model[datekey]['sentAs']];
						} 
					}else{
						for (var i = 0; i < obj[model[datekey]['sentAs']].length; i++ ){
							if(model[datekey]['items']['type'] == 'object'){
								arr[i] = jsonToObject(model[datekey]['items']['parameters'],obj[model[datekey]['sentAs']][i],null);
							}else{
								arr[i] = obj[model[datekey]['sentAs']][i];
							} 
						}
					}
					opt[datekey] = arr;
				}
			}else{
				if(model[key]['type'] != 'object' && model[key]['type'] != 'array'){
					opt[key] = "";
				}else if(model[key]['type'] == 'object'){
					opt[key] = jsonToObject(model[datekey]['parameters'],null,null);
				}else if(model[key]['type'] == 'array'){
					opt[key] = [];
				}
			}
		}else{
			for(key in model){
				var datekey = key;
				if( obj != null && obj != "" && model[key]['sentAs'] in obj){
					if(model[key]['type'] != 'object' && model[key]['type'] != 'array'){
						opt[key] = obj[model[key]['sentAs']];
					}else if(model[key]['type'] == 'object'){
						opt[key] = jsonToObject(model[datekey]['parameters'],obj[model[datekey]['sentAs']],null);
					}else if(model[key]['type'] == 'array'){
						var arr = new Array();
						if(!isArray(obj[model[datekey]['sentAs']])){
							if(model[datekey]['items']['type'] == 'object'){
								arr[0] = jsonToObject(model[datekey]['items']['parameters'],obj[model[datekey]['sentAs']],null);
							}else{
								arr[0] = obj[model[datekey]['sentAs']];
							} 
						}else{
							for (var i = 0; i < obj[model[datekey]['sentAs']].length; i++ ){
								if(model[datekey]['items']['type'] == 'object'){
									arr[i] = jsonToObject(model[datekey]['items']['parameters'],obj[model[datekey]['sentAs']][i],null);
								}else{
									arr[i] = obj[model[datekey]['sentAs']][i];
								} 
							}
						}
						opt[datekey] = arr;
					}
				}else{
					if(model[key]['type'] != 'object' && model[key]['type'] != 'array'){
						opt[key] = "";
					}else if(model[key]['type'] == 'object'){
						opt[key] = jsonToObject(model[datekey]['parameters'],null,null);
					}else if(model[key]['type'] == 'array'){
						opt[key] = [];
					}
				}
			}
		}
		return opt;
	}

	/**
	 * 判断数据类型是否是数组
	 * @param obj 待判断的数据
	 * @returns {Boolean} 是数组返回true，不是返回false
	 */
	function isArray(obj){
		return Object.prototype.toString.call(obj) === '[object Array]';
	}
	
	/**
	 * 解析xml字符串为json
	 * @param xml xml字符串
	 * @param bc 回调函数
	 */
	function makeObjFromXml(xml,bc){
		var para = require('xml2js').parseString;
		para(xml,{explicitArray:false,ignoreAttrs:true},function(err,result){
			if(err){
				bc(err,null);
				return;
			}
			bc(null,result);
			return;
		});
	}

	/**
	 * v4鉴权
	 * @param region 服务器所在区域
	 * @param ak 用于认证的AK的值
	 * @param sk 用于认证的SK的值
	 * @param opt 待发送的http消息体
	 * @returns 待发送的http消息体
	 */
	function v4Auth(region,ak,sk,opt){
//		console.log("region:"+region);
		var crypto = require('crypto');
		var CONTENT_SHA256 = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
		opt['headers']['x-amz-content-sha256'] = CONTENT_SHA256;
		var header = opt['headers'];
		var date = new Date();
		var hour = date.getUTCHours();
		var min = date.getUTCMinutes();
		var sec = date.getUTCSeconds();
		var day = date.getUTCDate();
		var moth = date.getUTCMonth() +1;
		var year = date.getUTCFullYear();
		var shortDate = "";
		var longDate = "";
		shortDate += year;
		if(moth < 10){
			shortDate += "0" + moth;
		}else{
			shortDate += moth;
		}
		if(day < 10){
			shortDate += "0" + day;
		}else{
			shortDate += day;
		}
		longDate += shortDate + "T";
		if(hour < 10){
			longDate += "0" + hour;
		}else{
			longDate +=  hour;
		}
		if(min < 10){
			longDate += "0" + min;
		}else{
			longDate +=  min;
		}
		if(sec < 10){
			longDate += "0" + sec;
		}else{
			longDate +=  sec;
		}
		longDate += "Z";
//		console.log("shortDate:"+shortDate);
		var credenttial = ak + "/" + shortDate + "/" + region + "/" + "s3" + "/" + "aws4_request";
		
		var arrheadKey = new Array();
		var arrhead = new Array();
		var i = 0;
		for(key in header){
			arrheadKey[i] = key.toLowerCase();
//			arrhead[i] = key.toLowerCase() + ":" + header[key] + "\n";
			arrhead[key.toLowerCase()] = header[key];
			i++;
		}
		arrheadKey = arrheadKey.sort();
//		arrhead = arrhead.sort();
		var signedHeaders = "";
		var canonicalHeaders = "";
		for(i = 0; i < arrheadKey.length; i++){
			if(i == 0){
				signedHeaders += arrheadKey[i];
			}else{
				signedHeaders +=  ";" + arrheadKey[i];
			}
			canonicalHeaders +=  arrheadKey[i] + ":" + arrhead[arrheadKey[i]] + "\n";
		};
		
		var canonicalQueryString = "";
		if(opt['urlPath'] != "" && opt['urlPath'][0] == '?'){
			var path = opt['urlPath'];
			path = path.slice(1);
			var arrPath = path.split("&");
			arrPath = arrPath.sort();
			for(item in arrPath){
				if(arrPath[item].indexOf("=") != -1){
					canonicalQueryString += arrPath[item] + "&";
				}else{
					canonicalQueryString += arrPath[item] + "=" + "" + "&";
				}
			}
			canonicalQueryString = canonicalQueryString.substring(0,
					canonicalQueryString.length - 1);
		}
		var canonicalRequest = opt['method'] + "\n";
		canonicalRequest += opt['uri'] +  "\n";
		canonicalRequest += canonicalQueryString + "\n";
		canonicalRequest +=  canonicalHeaders + "\n";
		canonicalRequest += signedHeaders + "\n";
		canonicalRequest += CONTENT_SHA256;
		var scop = shortDate + "/" + region + "/" + "s3" + "/" + "aws4_request";
		
//		console.log("canonicalRequest:"+canonicalRequest);
		var stringToSign = "AWS4-HMAC-SHA256" + "\n";
		stringToSign += longDate + "\n";
		stringToSign += scop + "\n";
		stringToSign += crypto.createHash('sha256').update(canonicalRequest).digest('hex');
//		console.log("stringToSign:"+stringToSign);
		
		var dateKey = crypto.createHmac('sha256',"AWS4" + sk ).update(shortDate).digest();
		var dateRegionKey = crypto.createHmac('sha256',dateKey ).update(region).digest();
		var dateRegionServiceKey = crypto.createHmac('sha256',dateRegionKey ).update("s3").digest();
		var signingKey = crypto.createHmac('sha256',dateRegionServiceKey ).update("aws4_request").digest();
		var signature = crypto.createHmac('sha256',signingKey).update(stringToSign).digest('hex');
		
		var auth = "AWS4-HMAC-SHA256 " + "Credential=" + credenttial + "," + "SignedHeaders=" + signedHeaders + "," + "Signature=" + signature; 
		opt['headers']['authorization'] = auth;
		return opt;
	}

}

module.exports = Utils;