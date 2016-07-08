
var logUtil = {};
exports.logUtil = logUtil;


var log4js = require('log4js');
var fs = require('fs');
var path = require('path');

var loggerInf = null;
var loggerRun = null;

var localIP = "";

/**
 * 初始化日志
 * @param filename 日志全路径
 * @param maxLogSize 日志备份文件大小
 * @param backups 日志备份文件数
 * @param level 日志级别
 * @returns 
 */
logUtil.InitLog = function(filename,maxLogSize,backups,level){
	var dir = path.dirname(filename);
	checkAndCreateDir(dir);
	var ext = path.extname(filename);
	var file = path.basename(filename,ext);
	if(ext == "" || ext == null){
		ext = ".log";
	}
	var fileInterface = path.join(dir,file + "_interfaceLog"+ext);
	var fileRun = path.join(dir,file + "_runningLog"+ext);
	log4js.configure({
		appenders:[
			{
				type:'console',
				category:'console',
				layout:{
					type:'pattern',
					pattern:"%m"
				}
			},
			{
				type:'file',
				category:'interfaceLog',
				filename:fileInterface,
				maxLogSize:maxLogSize,
				backups:backups,
				layout:{
					type:'pattern',
					pattern:"%d{yyyy/MM/dd hh:mm:ss SSS}|%-5p|%m"
				}
			},
			{
				type:'file',
				category:'runLog',
				filename:fileRun,
				maxLogSize:maxLogSize,
				backups:backups,
				layout:{
					type:'pattern',
					pattern:"%d{yyyy/MM/dd hh:mm:ss SSS}|%-5p|%m"
				}
			}
		],
		replaceConsole:true,
		levels:{
			interfaceLog:level.toLowerCase(),
			runLog:level.toLowerCase(),
			console:'debug'
		}
	});
	loggerInf = log4js.getLogger('interfaceLog');
	loggerRun = log4js.getLogger('runLog');
	localIP = getLocalIP();
};

/**
 * 设置日志模块句柄
 * @returns 
 */
logUtil.GetLogger = function(){
	loggerInf = log4js.getLogger('interfaceLog');
	loggerRun = log4js.getLogger('runLog');
	localIP = getLocalIP();
};

/**
 * 写接口日志
 * @param level 日志级别
 * @param methodName 接口模块名
 * @param serviceAddress 服务端地址
 * @param businessType 事务标示
 * @param startTime 任务开始时间
 * @param msg 任务请求参数配置
 * @param 结果码，0或不填表示成功，其他情况填写错误码
 * @param 任务应答参数
 * @returns 
 */
logUtil.InterfaceLog = function(level,methodName,serviceAddress,businessType,startTime,msg,resultCode,resp){
	//接口所属业务
	var product = "Storage"; 
	// 接口类型，1：北向接口，2：南向接口
	var infType = "2"; 
	//接口协议
	var infProtocol = "HTTP+XML"; 
	
	var split = "|";
	
	var form = product + split + infType + split + infProtocol + split;
	
	form += methodName + split;
	
	if(localIP == null || localIP == ""){
		localIP = getLocalIP();
	}
	form += localIP + split;
	
	form += serviceAddress + split;
	
	form += businessType + split;
	
	form += startTime + split;
	
	form += this.GetNowTime() + split;
	
	form += msg + split;
	
	form += resultCode + split;
	
	form += resp + split;
	
	if(loggerInf != null){
		if(level.toLowerCase() == "debug"){
			loggerInf.debug(form);
		}
		if(level.toLowerCase() == "info"){
			loggerInf.info(form);
		}
		if(level.toLowerCase() == "warn"){
			loggerInf.warn(form);
		}
		if(level.toLowerCase() == "error"){
			loggerInf.error(form);
		}
	}
};

/**
 * 写运行日志
 * @param level 日志级别
 * @param methodName 接口模块名
 * @param msg 日志关键信息描述点
 * @returns 
 */
logUtil.RunLog = function(level,methodName,msg){
	var form = "";
	var split = "|";
	form += methodName + split;
	form += msg;	
	if(loggerRun != null){
		if(level.toLowerCase() == "debug"){
			loggerRun.debug(form);
		}
		if(level.toLowerCase() == "info"){
			loggerRun.info(form);
		}
		if(level.toLowerCase() == "warn"){
			loggerRun.warn(form);
		}
		if(level.toLowerCase() == "error"){
			loggerRun.error(form);
		}
	}
};

/**
 * 获取当前时间
 * @returns 
 */
 logUtil.GetNowTime = function(){
	 var nowDate = new Date();
	 var result = nowDate.toLocaleDateString() + " " + nowDate.toLocaleTimeString();
	 return result;
 };

 /**
  * 创建目录
  * @param dir 目录路径
  * @returns 
  */
 function checkAndCreateDir(dir){
	if(!fs.existsSync(dir)){
		var rout = path.dirname(dir);
		if(fs.existsSync(rout)){
			fs.mkdirSync(dir);
		}else{
			checkAndCreateDir(rout);
			fs.mkdirSync(dir);
		}
	}
}

/**
 * 获取本地IP地址
 * @returns 本地IP地址
 */
 function getLocalIP(){
	 var network = require('os').networkInterfaces();
	 for(var key in network){
		var iface = network[key];
		for(var i = 0; i < iface.length; i++){
			var alias = iface[i];
			if(alias.family == 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
				return alias.address;
			}
		}
	 }
	 return "";
 }






