
var Utils = require('./utils');
var log = require('./log.js').logUtil;

function ObsClient(){
	
	var utils = null;
	
	/**
	 * ��ʼ����־
	 * @param filename ��־ȫ·��
	 * @param maxLogSize ��־�����ļ���С
	 * @param backups ��־�����ļ���
	 * @param level ��־����
	 * @returns 
	 */
	this.InitLog = function(filename,maxLogSize,backups,level){
		log.InitLog(filename,maxLogSize,backups,level);
	};
	
	/**
	 * ��ʼ���������
	 * @param access_key_id ���ӻ�ΪOBS��AK
	 * @param secret_access_key ��Ȩʹ�õ�SK���������ַ�����ǩ��
	 * @param is_secure �����Ƿ�ʹ��SSL
	 * @param server ���ӵķ�����
	 * @param path_style ��������ĸ�ʽ�Ƿ���·����ʽ��True���ǣ�False������
	 * @param is_v2Auth �Ƿ���V2��Ȩ,True:V2��Ȩ��False:V4��Ȩ
	 * @param region �������������򣬵���Ȩ��ʽΪv4ʱ����ѡ
	 * @returns 
	 */
	this.Factory = function(access_key_id, secret_access_key, is_secure,server, path_style,is_v2Auth,region){
		utils = new Utils();
		utils.initFactory(access_key_id, secret_access_key, is_secure,server, path_style,is_v2Auth,region);
	};
	
	/**
	 * ����Ͱ
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��CreateBucketֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.CreateBucket = function(param,backcall){
		exec('CreateBucket',param,backcall);
	};
	
	/**
	 * �о�Ͱ
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��ListBucketsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.ListBuckets = function(backcall){
		exec('ListBuckets',{},backcall);
	};
	
	/**
	 * Head Ͱ
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��HeadBucketֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.HeadBucket = function(param,backcall){
		exec('HeadBucket',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteBucket = function(param,backcall){
		exec('DeleteBucket',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketWithObjectsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ����Ͱ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketQuotaֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketQuota = function(param,backcall){
		exec('SetBucketQuota',param,backcall);
	};
	
	/**
	 * ��ȡͰ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketQuotaֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketQuota = function(param,backcall){
		exec('GetBucketQuota',param,backcall);
	};
	
	/**
	 * ��ȡͰ����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketStorageInfoֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketStorageInfo = function(param,backcall){
		exec('GetBucketStorageInfo',param,backcall);
	};
	
	/**
	 * ����Ͱ�Ĳ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketPolicyֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketPolicy = function(param,backcall){
		exec('SetBucketPolicy',param,backcall);
	};
	
	/**
	 * ��ȡͰ�Ĳ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketPolicyֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketPolicy = function(param,backcall){
		exec('GetBucketPolicy',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ�Ĳ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketPolicyֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteBucketPolicy = function(param,backcall){
		exec('DeleteBucketPolicy',param,backcall);
	};
	
	/**
	 * ����Ͱ�Ķ�汾״̬
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketVersioningConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketVersioningConfiguration = function(param,backcall){
		exec('SetBucketVersioningConfiguration',param,backcall);
	};
	
	/**
	 * ��ȡͰ�Ķ�汾״̬
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketVersioningConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketVersioningConfiguration =  function(param,backcall){
		exec('GetBucketVersioningConfiguration',param,backcall);
	};
	
	/**
	 * ��ȡͰ������λ��
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketLocationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketLocation = function(param,backcall){
		exec('GetBucketLocation',param,backcall);
	};
	
	/**
	 * �о�Ͱ�ڶ��󣨺���汾��
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��ListVersionsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.ListVersions = function(param,backcall){
		exec('ListVersions',param,backcall);
	};
	
	/**
	 * �о�Ͱ�ڶ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��ListObjectsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.ListObjects = function(param,backcall){
		exec('ListObjects',param,backcall);
	};
	
	/**
	 * ����Ͱ��������������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketLifecycleConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ��ȡͰ��������������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketLifecycleConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketLifecycleConfiguration = function(param,backcall){
		exec('GetBucketLifecycleConfiguration',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ��������������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketLifecycleConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteBucketLifecycleConfiguration = function(param,backcall){
		exec('DeleteBucketLifecycleConfiguration',param,backcall);
	};
	
	/**
	 * ����Ͱ��ACL
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketAclֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketAcl = function(param,backcall){
		exec('SetBucketAcl',param,backcall);
	};
	
	/**
	 * ��ȡͰ��ACL
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketAclֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketAcl = function(param,backcall){
		exec('GetBucketAcl',param,backcall);
	};
	
	/**
	 * ����Ͱ����־����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketLoggingConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketLoggingConfiguration = function(param,backcall){
		exec('SetBucketLoggingConfiguration',param,backcall);
	};
	
	/**
	 * ��ȡͰ����־����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketLoggingConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketLoggingConfiguration = function(param,backcall){
		exec('GetBucketLoggingConfiguration',param,backcall);
	};
	
	/**
	 * ����Ͱ����������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketWebsiteConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetBucketWebsiteConfiguration = function(param,backcall){
		exec('SetBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * ��ȡͰ����������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketWebsiteConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketWebsiteConfiguration = function(param,backcall){
		exec('GetBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ����������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketWebsiteConfigurationֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteBucketWebsiteConfiguration = function(param,backcall){
		exec('DeleteBucketWebsiteConfiguration',param,backcall);
	};
	
	/**
	 * �ϴ�����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��PutObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ���ض���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ���ƶ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��CopyObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.CopyObject = function(param,backcall){
		exec('CopyObject',param,backcall);
	};
	
	/**
	 * ��ȡ����Ԫ����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetObjectMetadataֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetObjectMetadata = function(param,backcall){
		exec('GetObjectMetadata',param,backcall);
	};
	
	/**
	 * ���ö���ACL
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetObjectAclֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.SetObjectAcl = function(param,backcall){
		exec('SetObjectAcl',param,backcall);
	};
	
	/**
	 * ��ȡ����ACL
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetObjectAclֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetObjectAcl = function(param,backcall){
		exec('GetObjectAcl',param,backcall);
	};
	
	/**
	 * ɾ������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteObject = function(param,backcall){
		exec('DeleteObject',param,backcall);
	};
	
	/**
	 * ����ɾ������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ��ʼ���ϴ�������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��InitiateMultipartUploadֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.InitiateMultipartUpload = function(param,backcall){
		exec('InitiateMultipartUpload',param,backcall);
	};
	
	/**
	 * �г�����ϴ�����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.ListMultipartUploads = function(param,backcall){
		exec('ListMultipartUploads',param,backcall);
	};
	
	/**
	 * �ϴ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * �г��ϴ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��ListPartsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.ListParts = function(param,backcall){
		exec('ListParts',param,backcall);
	};
	
	/**
	 * ������
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��CopyPartֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.CopyPart = function(param,backcall){
		exec('CopyPart',param,backcall);
	};
	
	/**
	 * ȡ������ϴ�����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��AbortMultipartUploadֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.AbortMultipartUpload = function(param,backcall){
		exec('AbortMultipartUpload',param,backcall);
	};
	
	/**
	 * �ϲ���
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��CompleteMultipartUploadֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.CompleteMultipartUpload = function(param,backcall){
		exec('CompleteMultipartUpload',param,backcall);
	};
	
	/**
	 * ����Ͱ��CORS
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��SetBucketCorsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ��ȡͰ��CORS
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��GetBucketCorsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.GetBucketCors = function(param,backcall){
		exec('GetBucketCors',param,backcall);
	};
	
	/**
	 * ɾ��Ͱ��CORS
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��DeleteBucketCorsֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.DeleteBucketCors = function(param,backcall){
		exec('DeleteBucketCors',param,backcall);
	};
	
	/**
	 * OPTION Ͱ
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��OptionsBucketֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.OptionsBucket = function(param,backcall){
		exec('OptionsBucket',param,backcall);
	};
	
	/**
	 * OPTION ����
	 * @param param �������������Ϣ��Map���ͣ������ʽ�μ�obsModel.js��Ӧ��OptionsObjectֵ
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
	 * @returns 
	 */
	this.OptionsObject = function(param,backcall){
		exec('OptionsObject',param,backcall);
	};
	
	/**
	 * �ӿ�ִ����ں���
	 * @param funcName �ӿ���
	 * @param param �������������Ϣ��Map���͡�
	 * @param backcall ִ�н���ص�����������ԭ��Ϊ function backcall(err,result); err��ִ�г�����Ϣ��result������ִ�н����ֻ��errΪ��ʱ��result��Ч
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
	 * ��ȡִ�н���������ӳ�������3��
	 * @param funcName �ӿ���
	 * @param opt ׼���õĲ����б�
	 * @param backcall �ص����� 
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
	 * �ֵ�ת�ַ�������¼��־�ã�
	 * @param obj ��ת���ֵ�ԭ��
	 * @returns {String} ת������ַ���
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





