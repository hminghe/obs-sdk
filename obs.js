
var Utils = require('./utils');
var log = require('./log.js').logUtil;

function ObsClient(){
	
	var utils = null;
	
	/**
	 * 初始化日志
	 * @param filename 日志全路径
	 * @param maxLogSize 日志备份文件大小
	 * @param backups 日志备份文件数
	 * @param level 日志级别
	 * @returns 
	 */
	this.InitLog = function(filename,maxLogSize,backups,level){
		log.InitLog(filename,maxLogSize,backups,level);
	};
	
	/**
	 * 初始化服务参数
	 * @param access_key_id 连接华为OBS的AK
	 * @param secret_access_key 鉴权使用的SK，可用于字符串的签名
	 * @param is_secure 连接是否使用SSL
	 * @param server 连接的服务器
	 * @param path_style 连接请求的格式是否是路径方式，True：是，False：不是
	 * @param is_v2Auth 是否用V2鉴权,True:V2鉴权，False:V4鉴权
	 * @param region 服务器所在区域，当鉴权方式为v4时，必选
	 * @returns 
	 */
	this.Factory = function(access_key_id, secret_access_key, is_secure,server, path_style,is_v2Auth,region){
		utils = new Utils();
		utils.initFactory(access_key_id, secret_access_key, is_secure,server, path_style,is_v2Auth,region);
	};
	
	/**
	 * 创建桶
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的CreateBucket值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.CreateBucket = function(param,backcall){
		exec('CreateBucket',param,backcall);
	};
	
	/**
	 * 列举桶
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的ListBuckets值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.ListBuckets = function(backcall){
		exec('ListBuckets',{},backcall);
	};
	
	/**
	 * Head 桶
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的HeadBucket值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.HeadBucket = function(param,backcall){
		exec('HeadBucket',param,backcall);
	};
	
	/**
	 * 删除桶
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucket值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucket = function(param,backcall){
		exec('DeleteBucket',param,backcall);
	};
	
	/**
	 * 删除桶数据
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucketWithObjects值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucketWithObjects = function(param,backcall){
		log.RunLog('info',"DeleteBucketWithObjects","enter " + "DeleteBucketWithObjects" + "..." );
		var opt = utils.makePrame('DeleteBucketWithObjects',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
		xml += "<DeleteBucket><Bucket>" + param['Bucket'] + "</Bucket></DeleteBucket>";
		opt['xml'] = xml;
		opt['headers']['content-Length'] = xml.length;
		getRequest('DeleteBucketWithObjects',opt,backcall);
//		utils.makeRequest('DeleteBucketWithObjects',opt,backcall);
		return ;
	};
	
	/**
	 * 更新桶配额
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketQuota值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketQuota = function(param,backcall){
		exec('SetBucketQuota',param,backcall);
	};
	
	/**
	 * 获取桶配额
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketQuota值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketQuota = function(param,backcall){
		exec('GetBucketQuota',param,backcall);
	};
	
	/**
	 * 获取桶存量
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketStorageInfo值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketStorageInfo = function(param,backcall){
		exec('GetBucketStorageInfo',param,backcall);
	};
	
	/**
	 * 设置桶的策略
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketPolicy值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketPolicy = function(param,backcall){
		exec('SetBucketPolicy',param,backcall);
	};
	
	/**
	 * 获取桶的策略
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketPolicy值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketPolicy = function(param,backcall){
		exec('GetBucketPolicy',param,backcall);
	};
	
	/**
	 * 删除桶的策略
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucketPolicy值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucketPolicy = function(param,backcall){
		exec('DeleteBucketPolicy',param,backcall);
	};
	
	/**
	 * 设置桶的多版本状态
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketVersioningConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketVersioningConfiguration = function(param,backcall){
		exec('SetBucketVersioningConfiguration',param,backcall);
	};
	
	/**
	 * 获取桶的多版本状态
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketVersioningConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketVersioningConfiguration =  function(param,backcall){
		exec('GetBucketVersioningConfiguration',param,backcall);
	};
	
	/**
	 * 获取桶的区域位置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketLocation值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketLocation = function(param,backcall){
		exec('GetBucketLocation',param,backcall);
	};
	
	/**
	 * 列举桶内对象（含多版本）
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的ListVersions值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.ListVersions = function(param,backcall){
		exec('ListVersions',param,backcall);
	};
	
	/**
	 * 列举桶内对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的ListObjects值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.ListObjects = function(param,backcall){
		exec('ListObjects',param,backcall);
	};
	
	/**
	 * 设置桶的生命周期配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketLifecycleConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketLifecycleConfiguration = function(param,backcall){
		log.RunLog('info',"SetBucketLifecycleConfiguration","enter " + "SetBucketLifecycleConfiguration" + "..." );
		var opt = utils.makePrame('SetBucketLifecycleConfiguration',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		opt['headers']['Content-MD5'] = utils.strMD5(opt['xml']);
		getRequest('SetBucketLifecycleConfiguration',opt,backcall);
//		utils.makeRequest('SetBucketLifecycleConfiguration',opt,backcall);
		return ;
	};
	
	/**
	 * 获取桶的生命周期配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketLifecycleConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketLifecycleConfiguration = function(param,backcall){
		exec('GetBucketLifecycleConfiguration',param,backcall);
	};
	
	/**
	 * 删除桶的生命周期配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucketLifecycleConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucketLifecycleConfiguration = function(param,backcall){
		exec('DeleteBucketLifecycleConfiguration',param,backcall);
	};
	
	/**
	 * 设置桶的ACL
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketAcl值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketAcl = function(param,backcall){
		exec('SetBucketAcl',param,backcall);
	};
	
	/**
	 * 获取桶的ACL
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketAcl值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketAcl = function(param,backcall){
		exec('GetBucketAcl',param,backcall);
	};
	
	/**
	 * 设置桶的日志配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketLoggingConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketLoggingConfiguration = function(param,backcall){
		exec('SetBucketLoggingConfiguration',param,backcall);
	};
	
	/**
	 * 获取桶的日志配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketLoggingConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketLoggingConfiguration = function(param,backcall){
		exec('GetBucketLoggingConfiguration',param,backcall);
	};
	
	/**
	 * 设置桶的网络配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketWebsiteConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketWebsiteConfiguration = function(param,backcall){
		exec('SetBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * 获取桶的网络配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketWebsiteConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketWebsiteConfiguration = function(param,backcall){
		exec('GetBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * 删除桶的网络配置
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucketWebsiteConfiguration值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucketWebsiteConfiguration = function(param,backcall){
		exec('DeleteBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * 上传对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的PutObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.PutObject = function(param,backcall){
		log.RunLog('info',"PutObject","enter " + "PutObject" + "..." );
		if(('Body' in param) && ('SourceFile' in param)){
			var err = "the input body and sourcefile exist at same time,please specify one of eigther a string or file to be send!";
			log.RunLog("error","PutObject",err);
			backcall(err,null);
			return;
		}
		var opt = utils.makePrame('PutObject',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		if('SourceFile' in param){
			opt['SourceFile'] = param['SourceFile'];
		}
		getRequest('PutObject',opt,backcall);
//		utils.makeRequest('PutObject',opt,backcall);
		return ;
	};
	
	/**
	 * 下载对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetObject = function(param,backcall){
		log.RunLog('info',"GetObject","enter " + "GetObject" + "..." );
		var opt = utils.makePrame('GetObject',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		opt['SaveAsFile'] = param['SaveAsFile'];
		getRequest('GetObject',opt,backcall);
//		utils.makeRequest('GetObject',opt,backcall);
		
		return ;
	};
	
	/**
	 * 复制对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的CopyObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.CopyObject = function(param,backcall){
		exec('CopyObject',param,backcall);
	};
	
	/**
	 * 获取对象元数据
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetObjectMetadata值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetObjectMetadata = function(param,backcall){
		exec('GetObjectMetadata',param,backcall);
	};
	
	/**
	 * 设置对象ACL
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetObjectAcl值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetObjectAcl = function(param,backcall){
		exec('SetObjectAcl',param,backcall);
	};
	
	/**
	 * 获取对象ACL
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetObjectAcl值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetObjectAcl = function(param,backcall){
		exec('GetObjectAcl',param,backcall);
	};
	
	/**
	 * 删除对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteObject = function(param,backcall){
		exec('DeleteObject',param,backcall);
	};
	
	/**
	 * 批量删除对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteObjects = function(param,backcall){
		log.RunLog('info',"DeleteObjects","enter " + "DeleteObjects" + "..." );
		var opt = utils.makePrame('DeleteObjects',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		opt['headers']['Content-MD5'] = utils.strMD5(opt['xml']);
		getRequest('DeleteObjects',opt,backcall);
//		utils.makeRequest('DeleteObjects',opt,backcall);
		return ;
	};
	
	/**
	 * 初始化上传段任务
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的InitiateMultipartUpload值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.InitiateMultipartUpload = function(param,backcall){
		exec('InitiateMultipartUpload',param,backcall);
	};
	
	/**
	 * 列出多段上传任务
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.ListMultipartUploads = function(param,backcall){
		exec('ListMultipartUploads',param,backcall);
	};
	
	/**
	 * 上传段
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.UploadPart = function(param,backcall){
		log.RunLog('info',"UploadPart","enter " + "UploadPart" + "..." );
		if(('Body' in param) && ('SourceFile' in param)){
			var err = "the input body and sourcefile exist at same time,please specify one of eigther a string or file to be send!";
			log.RunLog("error","UploadPart",err);
			backcall(err,null);
			return;
		}
		var opt = utils.makePrame('UploadPart',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		if('SourceFile' in param){
			opt['SourceFile'] = param['SourceFile'];
			utils.fileMD5(param['SourceFile'],function(err,md5){
				if(err){
					log.RunLog("error","UploadPart","Calculation file MD5 failure,err [" + headerTostring(err) + "]");
					backcall(err,null);
					return;
				}
				opt['headers']['Content-MD5'] = md5;
				getRequest('UploadPart',opt,backcall);
//				utils.makeRequest('UploadPart',opt,backcall);
			});
		}else{
			opt['headers']['Content-MD5'] = utils.strMD5(opt['xml']);
			getRequest('UploadPart',opt,backcall);
//			utils.makeRequest('UploadPart',opt,backcall);
		}
		return ;
	};
	
	/**
	 * 列出上传段
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的ListParts值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.ListParts = function(param,backcall){
		exec('ListParts',param,backcall);
	};
	
	/**
	 * 拷贝段
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的CopyPart值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.CopyPart = function(param,backcall){
		exec('CopyPart',param,backcall);
	};
	
	/**
	 * 取消多段上传任务
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的AbortMultipartUpload值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.AbortMultipartUpload = function(param,backcall){
		exec('AbortMultipartUpload',param,backcall);
	};
	
	/**
	 * 合并段
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的CompleteMultipartUpload值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.CompleteMultipartUpload = function(param,backcall){
		exec('CompleteMultipartUpload',param,backcall);
	};
	
	/**
	 * 设置桶的CORS
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的SetBucketCors值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.SetBucketCors = function(param,backcall){
		log.RunLog('info',"SetBucketCors","enter " + "SetBucketCors" + "..." );
		var opt = utils.makePrame('SetBucketCors',param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		opt['headers']['Content-MD5'] = utils.strMD5(opt['xml']);
		getRequest('SetBucketCors',opt,backcall);
//		utils.makeRequest('SetBucketCors',opt,backcall);
		return ;
	};
	
	/**
	 * 获取桶的CORS
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的GetBucketCors值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.GetBucketCors = function(param,backcall){
		exec('GetBucketCors',param,backcall);
	};
	
	/**
	 * 删除桶的CORS
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的DeleteBucketCors值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.DeleteBucketCors = function(param,backcall){
		exec('DeleteBucketCors',param,backcall);
	};
	
	/**
	 * OPTION 桶
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的OptionsBucket值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.OptionsBucket = function(param,backcall){
		exec('OptionsBucket',param,backcall);
	};
	
	/**
	 * OPTION 对象
	 * @param param 请求参数配置信息，Map类型，请求格式参见obsModel.js对应的OptionsObject值
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	this.OptionsObject = function(param,backcall){
		exec('OptionsObject',param,backcall);
	};
	
	/**
	 * 接口执行入口函数
	 * @param funcName 接口名
	 * @param param 请求参数配置信息，Map类型。
	 * @param backcall 执行结果回调函数，函数原型为 function backcall(err,result); err：执行出错信息，result：返回执行结果，只有err为空时，result有效
	 * @returns 
	 */
	function exec(funcName,param,backcall){
		log.RunLog('info',funcName,"enter " + funcName + "..." );
		var opt = utils.makePrame(funcName,param);
		if('err' in opt){
			backcall(opt['err'],null);
			return;
		};
		getRequest(funcName,opt,backcall);
		return ;
	}
	
	/**
	 * 获取执行结果，当连接出错，重连3次
	 * @param funcName 接口名
	 * @param opt 准备好的参数列表
	 * @param backcall 回调函数 
	 */
	function getRequest(funcName,opt,backcall){
		utils.makeRequest(funcName,opt,function(err,msg){
			if (err != null && msg == "connectErr"){
				utils.makeRequest(funcName,opt,function(err,msg){
					if (err != null && msg == "connectErr"){
						utils.makeRequest(funcName,opt,function(err,msg){
							if (err != null && msg == "connectErr"){
								backcall(err,null);
							}else{
								backcall(err,msg);
							}
						});
					}else{
						backcall(err,msg);
					}
				});
			}else{
				backcall(err,msg);
			}
		});
	}
	
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
	
}

module.exports = ObsClient;





