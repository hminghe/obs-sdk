var ObsClient = require('./obs'); 

var access_key_id = "C0D20CF5022AC5A68DF4";
var secret_access_key = "1J07tSHg8ki0c8Hg/pCqkKn/rY0AAAFQAirFprfO";
var is_secure = false;
var server = "129.25.64.1";
var path_style = true;
var is_v2Auth = true;
var region = "regionA";

var obs = new ObsClient();

//初始化服务类工厂
obs.Factory(access_key_id, secret_access_key, is_secure,
		server, path_style,is_v2Auth,region);

//初始化日志模块
obs.InitLog("C:\\logs\\哈哈\\NodeJs\\eSDK_Strorage_obs.log",20480,10,'info');


//创建桶
function createBucket(){
	obs.CreateBucket({
		"Bucket":'123456-5',
		"ACL":'log-delivery-write',
		'Location':region
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//列举桶列表
function listBucket(){
	obs.ListBuckets(function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Owner:");
				console.log("ID-->"+result.InterfaceResult.Owner.ID);
				console.log("Name-->"+result.InterfaceResult.Owner.Name);
				console.log("Buckets:");
				var i = 1;
				for(key in result.InterfaceResult.Buckets.Bucket){
					console.log("Bucket[" + i + "]:");
					console.log("BucketName-->" + result.InterfaceResult.Buckets.Bucket[key].BucketName);
					console.log("CreationDate-->" + result.InterfaceResult.Buckets.Bucket[key].CreationDate);
					i++;
				}
			}
			
		}
	});
}

//HEAD 桶
function headBucket(){
	obs.HeadBucket({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//删除桶
function deleteBucket(){
	obs.DeleteBucket({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//删除桶数据
function deleteBucketWithObjects(){
	obs.DeleteBucketWithObjects({
		"Bucket":'123456-20',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//更新桶配额
function setBucketQuota(){
	obs.SetBucketQuota({
		"Bucket":'123456-10',
		"StorageQuota":1048576000,
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}	
	});
}

//获取桶配额
function  getBucketQuota(){
	obs.GetBucketQuota({
		"Bucket":'123456-10',
	},function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("StorageQuota-->"+result.InterfaceResult.StorageQuota);
			}
		}	
	});
}

//获取桶存量
function getBucketStorageInfo(){
	obs.GetBucketStorageInfo({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Size-->"+result.InterfaceResult.Size);
				console.log("ObjectNumber-->"+result.InterfaceResult.ObjectNumber);
			}
		}
	});
}

//设置桶的策略
function setBucketPolicy(){
	obs.SetBucketPolicy({
		"Bucket":'123456-10',
		"Policy":"{\"Version\":\"2008-10-17\",\"Id\": \"Policy1375342051334\",\"Statement\": [{\"Sid\": \"Stmt1375240018061\",\"Action\": [\"s3:GetBucketPolicy\"],\"Effect\": \"Allow\",\"Resource\": \"arn:aws:s3:::123456-10\",\"Principal\": { \"CanonicalUser\": \"D4B110B32D2E00000140E3AF2E7F003F\" } }]}",
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的策略
function getBucketPolicy(){
	obs.GetBucketPolicy({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Policy-->"+result.InterfaceResult.Policy);
			}
		}
	});
}

//删除桶的策略
function deleteBucketPolicy(){
	obs.DeleteBucketPolicy({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//设置桶的多版本状态
function setBucketVersioningConfiguration(){
	obs.SetBucketVersioningConfiguration({
		"Bucket":'12345-10',
		"VersionStatus":'Enabled',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的多版本状态
function getBucketVersioningConfiguration(){
	obs.GetBucketVersioningConfiguration({
		"Bucket":'12345-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("VersionStatus-->"+result.InterfaceResult.VersionStatus);
			}
		}
	});
}

//获取桶的区域位置
function getBucketLocation(){
	obs.GetBucketLocation({
		"Bucket":'123456-5',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Location-->"+result.InterfaceResult.Location);
			}
		}
	});
}

//列举桶内对象（含多版本）
function listVersions(){
	obs.ListVersions({
		"Bucket":'12345-10',
		'MaxKeys':10,	
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("Prefix-->"+result.InterfaceResult.Prefix);
				console.log("KeyMarker-->"+result.InterfaceResult.KeyMarker);
				console.log("VersionIdMarker-->"+result.InterfaceResult.VersionIdMarker);
				console.log("NextKeyMarker-->"+result.InterfaceResult.NextKeyMarker);
				console.log("NextVersionIdMarker-->"+result.InterfaceResult.NextVersionIdMarker);
				console.log("MaxKeys-->"+result.InterfaceResult.MaxKeys);
				console.log("IsTruncated-->"+result.InterfaceResult.IsTruncated);
				console.log("Versions:");
				for(var j in result.InterfaceResult.Versions){
					console.log("Version[" + (j+1) +  "]:");
					console.log("Key-->" + result.InterfaceResult.Versions[j]['Key']);
					console.log("VersionId-->" + result.InterfaceResult.Versions[j]['VersionId']);
					console.log("IsLatest-->" + result.InterfaceResult.Versions[j]['IsLatest']);
					console.log("LastModified-->" + result.InterfaceResult.Versions[j]['LastModified']);
					console.log("ETag-->" + result.InterfaceResult.Versions[j]['ETag']);
					console.log("Size-->" + result.InterfaceResult.Versions[j]['Size']);
					console.log("Owner[ID]-->" + result.InterfaceResult.Versions[j]['Owner']['ID']);
					console.log("Owner[Name]-->" + result.InterfaceResult.Versions[j]['Owner']['Name']);
					console.log("StorageClass-->" + result.InterfaceResult.Versions[j]['StorageClass']);
				}
				console.log("DeleteMarkers:");
				for(var i in result.InterfaceResult.DeleteMarkers){
					console.log("DeleteMarker[" + (i+1) +  "]:");
					console.log("Key-->" + result.InterfaceResult.DeleteMarkers[i]['Key']);
					console.log("VersionId-->" + result.InterfaceResult.DeleteMarkers[i]['VersionId']);
					console.log("IsLatest-->" + result.InterfaceResult.DeleteMarkers[i]['IsLatest']);
					console.log("LastModified-->" + result.InterfaceResult.DeleteMarkers[i]['LastModified']);
					console.log("Owner[ID]-->" + result.InterfaceResult.DeleteMarkers[i]['Owner']['ID']);
					console.log("Owner[Name]-->" + result.InterfaceResult.DeleteMarkers[i]['Owner']['Name']);
				}
				console.log("CommonPrefixes:");
				if (result.InterfaceResult.CommonPrefixes) {
					for ( var i in result.InterfaceResult.CommonPrefixes.Prefix) {
						console.log("CommonPrefixe[" + (i + 1) + "]:");
						console.log("Prefix-->"+ result.InterfaceResult.CommonPrefixes.Prefix[i]);
					}
				}
			}
		}
	});
}

//列举桶桶内对象
function listObjects(){
	obs.ListObjects({
		"Bucket":'123456-10',
		'MaxKeys':10,
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("Delimiter-->"+result.InterfaceResult.Delimiter);
				console.log("Marker-->"+result.InterfaceResult.Marker);
				console.log("NextMarker-->"+result.InterfaceResult.NextMarker);
				console.log("MaxKeys-->"+result.InterfaceResult.MaxKeys);
				console.log("IsTruncated-->"+result.InterfaceResult.IsTruncated);
				console.log("Contents:");
				for(var j in result.InterfaceResult.Contents){
					console.log("Contents[" + (j+1) +  "]:");
					console.log("Key-->" + result.InterfaceResult.Contents[j]['Key']);
					console.log("LastModified-->" + result.InterfaceResult.Contents[j]['LastModified']);
					console.log("ETag-->" + result.InterfaceResult.Contents[j]['ETag']);
					console.log("Size-->" + result.InterfaceResult.Contents[j]['Size']);
					console.log("Owner[ID]-->" + result.InterfaceResult.Contents[j]['Owner']['ID']);
					console.log("Owner[Name]-->" + result.InterfaceResult.Contents[j]['Owner']['Name']);
					console.log("StorageClass-->" + result.InterfaceResult.Contents[j]['StorageClass']);
				}
				console.log("CommonPrefixes:");
				for(var i in result.InterfaceResult.CommonPrefixes.Prefix){
					console.log("CommonPrefixe[" + (i+1) +  "]:");
					console.log("Prefix-->" + result.InterfaceResult.CommonPrefixes.Prefix[i]);
				}
			}
		}
	});
}

//设置桶的生命周期配置
function setBucketLifecycleConfiguration(){
	obs.SetBucketLifecycleConfiguration({
		"Bucket":'123456-10',
		"Rules":[{'ID':"1234",'Prefix':"Test",'Status':"Enabled",'Expiration':{'Days':30}}]
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的生命周期配置
function getBucketLifecycleConfiguration(){
	obs.GetBucketLifecycleConfiguration({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Rules:");
				for(var i in result.InterfaceResult.Rules){
					console.log("Rule[" + (i+1) + "]:");
					console.log("ID-->"+result.InterfaceResult.Rules[i]['ID']);
					console.log("Prefix-->"+result.InterfaceResult.Rules[i]['Prefix']);
					console.log("Status-->"+result.InterfaceResult.Rules[i]['Status']);
					console.log("Expiration[Date]-->"+result.InterfaceResult.Rules[i]['Expiration']['Date']);
					console.log("Expiration[Days]-->"+result.InterfaceResult.Rules[i]['Expiration']['Days']);
				}
			}
		}
	});
}

//删除桶的生命周期配置
function deleteBucketLifecycleConfiguration(){
	obs.DeleteBucketLifecycleConfiguration({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//设置桶的ACL
function setBucketAcl(){
	obs.SetBucketAcl({
		"Bucket":'123456-10',
		"Owner":{"ID":'D4B110B32D2E00000140E3AF2E7F003F',"Name":'liuwenpan'},
		"Grants":{"Grant":[{"Grantee":{"Type":'CanonicalUser',"ID":'D4B110B32D2E00000140E3AF2E7F003F',},"Permission":'READ'},
		                   {"Grantee":{"Type":'Group',"URI":'http://acs.amazonaws.com/groups/s3/LogDelivery',},"Permission":'WRITE'},
		                   {"Grantee":{"Type":'Group',"URI":'http://acs.amazonaws.com/groups/s3/LogDelivery',},"Permission":'READ_ACP'},]
		},
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的ACL
function getBucketAcl(){
	obs.GetBucketAcl({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Owner[ID]-->"+result.InterfaceResult.RequestId.Owner.ID);
				console.log("Owner[Name]-->"+result.InterfaceResult.RequestId.Owner.Name);
				console.log("Grants:");
				for(var i in result.InterfaceResult.Grants.Grant){
					console.log("Grant[" + (i+1) + "]:");
					console.log("Grantee[ID]-->"+result.InterfaceResult.Grants.Grant['Grantee']['ID']);
					console.log("Grantee[Name]-->"+result.InterfaceResult.Grants.Grant['Grantee']['Name']);
					console.log("Grantee[URI]-->"+result.InterfaceResult.Grants.Grant['Grantee']['URI']);
					console.log("Permission-->"+result.InterfaceResult.Grants.Grant['Permission']);
				}
			}
		}
	});
}

//设置桶的日志配置
function setBucketLoggingConfiguration(){
	obs.SetBucketLoggingConfiguration({
		"Bucket":'123456-10',
		'LoggingEnabled':{
			'TargetBucket':'123456-20',
			'TargetPrefix':'bucket-10.log',
			'TargetGrants':{
				"Grant":[{"Grantee":{"Type":'CanonicalUser',"ID":'D4B110B32D2E00000140E3AF2E7F003F',},"Permission":'WRITE'},
				         {"Grantee":{"Type":'Group',"URI":'http://acs.amazonaws.com/groups/global/AllUsers',},"Permission":'READ'},],
			},
		},
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的日志配置
function getBucketLoggingConfiguration(){
	obs.GetBucketLoggingConfiguration({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("LoggingEnabled:");
				console.log("TargetBucket-->"+result.InterfaceResult.LoggingEnabled.TargetBucket);
				console.log("TargetPrefix-->"+result.InterfaceResult.LoggingEnabled.TargetPrefix);
				console.log('InterfaceResult[TargetGrants]:');
				for(var i in result.InterfaceResult.LoggingEnabled.TargetGrants.Grant){
					console.log("Grant[" + (i+1) + "]:");
					console.log("Grantee[ID]-->"+result.InterfaceResult.LoggingEnabled.TargetGrants.Grant['Grantee']['ID']);
					console.log("Grantee[Name]-->"+result.InterfaceResult.LoggingEnabled.TargetGrants.Grant['Grantee']['Name']);
					console.log("Grantee[URI]-->"+result.InterfaceResult.LoggingEnabled.TargetGrants.Grant['Grantee']['URI']);
					console.log("Permission-->"+result.InterfaceResult.LoggingEnabled.TargetGrants.Grant['Permission']);
				}
			}
		}
	});
}

//设置桶的网络配置
function setBucketWebsiteConfiguration(){
	obs.SetBucketWebsiteConfiguration({
		"Bucket":'123456-10',
//		'RedirectAllRequestsTo':{'HostName':'www.baidu.com','Protocol':'http'},
		'IndexDocument':{'Suffix':'index.html'},
		'ErrorDocument':{'Key':'error.html'},
		'RoutingRules':{
			'RoutingRule':[{'Condition':{'HttpErrorCodeReturnedEquals':'404'},'Redirect':{'Protocol':'http','ReplaceKeyWith':'NotFound.html'}},
			               {'Condition':{'HttpErrorCodeReturnedEquals':'404'},'Redirect':{'Protocol':'http','ReplaceKeyWith':'abc.html'}}]}
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的网络配置
function getBucketWebsiteConfiguration(){
	obs.GetBucketWebsiteConfiguration({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("RedirectAllRequestsTo:");
				console.log("HostName-->"+result.InterfaceResult.RedirectAllRequestsTo['HostName']);
				console.log("Protocol-->"+result.InterfaceResult.RedirectAllRequestsTo['Protocol']);
				console.log("IndexDocument[Suffix]-->" + result.InterfaceResult.IndexDocument['Suffix']);
				console.log("ErrorDocument[Key]-->" + result.InterfaceResult.IndexDocument['Key']);
				console.log("RoutingRules:");
				for(var i in result.InterfaceResult.RoutingRules.RoutingRule){
					console.log("RoutingRule[" + (i+1) + "]:");
					var RoutingRule = result.InterfaceResult.RoutingRules.RoutingRule[i];
					console.log("Condition[HttpErrorCodeReturnedEquals]-->"+RoutingRule['Condition']['HttpErrorCodeReturnedEquals']);
					console.log("Condition[KeyPrefixEquals]-->"+RoutingRule['Condition']['KeyPrefixEquals']);
					console.log("Redirect[HostName]-->"+RoutingRule['Redirect']['HostName']);
					console.log("Redirect[HttpRedirectCode]-->"+RoutingRule['Redirect']['HttpRedirectCode']);
					console.log("Redirect[Protocol]-->"+RoutingRule['Redirect']['Protocol']);
					console.log("Redirect[ReplaceKeyPrefixWith]-->"+RoutingRule['Redirect']['ReplaceKeyPrefixWith']);
					console.log("Redirect[ReplaceKeyWith]-->"+RoutingRule['Redirect']['ReplaceKeyWith']);
				}
			}
		}
	});
}

//删除桶的网络配置
function deleteBucketWebsiteConfiguration(){
	obs.DeleteBucketWebsiteConfiguration({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//上传对象
function putObject(){
	obs.PutObject({
		"Bucket":'12345-10',
		"Key":'7G.rar',
		"Metadata":{'啊啊':"啊啊"},
//		'Body':"我爱你  node.js",
		'SourceFile':"C:\\6G.rar",
		'WebsiteRedirectLocation':"http://www.baidu.com"
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("ETag-->"+result.InterfaceResult.ETag);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
			}
		}
	});
}

//
function getObject(){
	obs.GetObject({
		"Bucket":'123456-20',
		"Key":'hao.txt',
		'Range':"bytes=0-10",
		'SaveAsFile':"C:\\bb1.log"
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("ETag-->"+result.InterfaceResult.ETag);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("ContentLength-->"+result.InterfaceResult.ContentLength);
				console.log("DeleteMarker-->"+result.InterfaceResult.DeleteMarker);
				console.log("LastModified-->"+result.InterfaceResult.LastModified);
				console.log("WebsiteRedirectLocation-->"+result.InterfaceResult.WebsiteRedirectLocation);				
			}
		}
	});
}

//复制对象
function copyObject(){
	obs.CopyObject({
		"Bucket":'12345-10',
		"Key":'test/AA2.xml',
		'CopySource':'12345-10/a',
		"Metadata":{'啊啊':"啊啊"},
		'WebsiteRedirectLocation':"http://www.baidu.com"
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("ETag-->"+result.InterfaceResult.ETag);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("CopySourceVersionId-->"+result.InterfaceResult.CopySourceVersionId);
				console.log("LastModified-->"+result.InterfaceResult.LastModified);				
			}
		}
	});
}

//获取对象元数据
function getObjectMetadata(){
	obs.GetObjectMetadata({
		"Bucket":'123456-20',
		"Key":'hao.txt',
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("ETag-->"+result.InterfaceResult.ETag);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("ContentLength-->"+result.InterfaceResult.ContentLength);
				console.log("Expiration-->"+result.InterfaceResult.Expiration);
				console.log("LastModified-->"+result.InterfaceResult.LastModified);
				console.log("WebsiteRedirectLocation-->"+result.InterfaceResult.WebsiteRedirectLocation);	
			}
		}
	});
}

//设置对象ACL
function setObjectAcl(){
	obs.SetObjectAcl({
		"Bucket":'123456-20',
		'Key':'hao.txt',
		"Owner":{"ID":'D4B110B32D2E00000140E3AF2E7F003F',"Name":'liuwenpan'},
		"Grants":{"Grant":[{"Grantee":{"Type":'CanonicalUser',"ID":'D4B110B32D2E00000140E3AF2E7F003F',},"Permission":'READ'},
		                   {"Grantee":{"Type":'Group',"URI":'http://acs.amazonaws.com/groups/s3/LogDelivery',},"Permission":'WRITE'},
		                   {"Grantee":{"Type":'Group',"URI":'http://acs.amazonaws.com/groups/s3/LogDelivery',},"Permission":'READ_ACP'},]
		},
	}, function(err,result){
		if(err){
			console.error("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
			}
		}
	});
}

//获取对象的ACl
function getObjectAcl(){
	obs.GetObjectAcl({
		"Bucket":'12345-10',
		"Key":'part1',
//		"VersionId":'################################################'
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			console.dir(result.InterfaceResult);
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("Owner[ID]-->"+result.InterfaceResult.Owner.ID);
				console.log("Owner[Name]-->"+result.InterfaceResult.Owner.Name);
				console.log("Grants:");
				for(var i in result.InterfaceResult.Grants.Grant){
					console.log("Grant[" + (i+1) + "]:");
					console.log("Grantee[ID]-->"+result.InterfaceResult.Grants.Grant[i]['Grantee']['ID']);
					console.log("Grantee[Name]-->"+result.InterfaceResult.Grants.Grant[i]['Grantee']['Name']);
					console.log("Grantee[URI]-->"+result.InterfaceResult.Grants.Grant[i]['Grantee']['URI']);
					console.log("Permission-->"+result.InterfaceResult.Grants.Grant[i]['Permission']);
				}
			}
		}
	});
}

//删除对象
function deleteObject(){
	obs.DeleteObject({
		"Bucket":'12345-10',
		"Key":'a',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("DeleteMarker-->"+result.InterfaceResult.RequestId.DeleteMarker);	
			}
		}
	});
}

//批量删除对象
function deleteObjects(){
	obs.DeleteObjects({
		"Bucket":'123456-20',
		'Quiet':true,
		'Objects':[{'Key':'ooo.log'},{'Key':'test/'},{'Key':'test.txt',VersionId:'123456789'}]
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Deleteds:");
				for(var i in result.InterfaceResult.Deleteds){
					console.log("Deleted[" + (i+1) + "]:");
					console.log("Key-->"+result.InterfaceResult.Deleted['Key']);
					console.log("VersionId-->"+result.InterfaceResult.Deleted['VersionId']);
					console.log("DeleteMarker-->"+result.InterfaceResult.Deleted['DeleteMarker']);
					console.log("DeleteMarkerVersionId-->"+result.InterfaceResult.Deleted['DeleteMarkerVersionId']);
				}
				console.log("Errors:");
				for(var i in result.InterfaceResult.Errors){
					console.log("Error[" + (i+1) + "]:");
					console.log("Key-->"+result.InterfaceResult.Errors['Key']);
					console.log("VersionId-->"+result.InterfaceResult.Errors['VersionId']);
					console.log("Code-->"+result.InterfaceResult.Errors['Code']);
					console.log("Message-->"+result.InterfaceResult.Errors['Message']);
				}
			}
		}
	});
}

//初始化多段上传任务
function initiateMultipartUpload(){
	obs.InitiateMultipartUpload({
		"Bucket":'12345-10',
		'Key':'acd',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("Key-->"+result.InterfaceResult.Key);
				console.log("UploadId-->"+result.InterfaceResult.UploadId);
				
			}
		}
	});
}

//列出多段上传任务
function listMultipartUploads(){
	obs.ListMultipartUploads({
		"Bucket":'12345-10',
		'MaxUploads':20,
		'Prefix':'a',
		'Delimiter':'d',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("KeyMarker-->"+result.InterfaceResult.KeyMarker);
				console.log("UploadIdMarker-->"+result.InterfaceResult.UploadIdMarker);
				console.log("NextKeyMarker-->"+result.InterfaceResult.NextKeyMarker);
				console.log("Prefix-->"+result.InterfaceResult.Prefix);
				console.log("Delimiter-->"+result.InterfaceResult.Delimiter);
				console.log("NextUploadIdMarker-->"+result.InterfaceResult.NextUploadIdMarker);
				console.log("MaxUploads-->"+result.InterfaceResult.MaxUploads);
				console.log("IsTruncated-->"+result.InterfaceResult.IsTruncated);
				console.log("Uploads：");
				for(var i in result.InterfaceResult.Uploads){
					console.log("Uploads[" + (i+1) + "]");
					console.log("UploadId-->"+result.InterfaceResult.Uploads[i]['UploadId']);
					console.log("Key-->"+result.InterfaceResult.Uploads[i]['Key']);
					console.log("Initiated-->"+result.InterfaceResult.Uploads[i]['Initiated']);
					console.log("StorageClass-->"+result.InterfaceResult.Uploads[i]['StorageClass']);
					console.log("Owner[ID]-->"+result.InterfaceResult.Uploads[i]['Owner']['ID']);
					console.log("Owner[Name]-->"+result.InterfaceResult.Uploads[i]['Owner']['Name']);
					console.log("Initiator[ID]-->"+result.InterfaceResult.Uploads[i]['Initiator']['ID']);
					console.log("Initiator[Name]-->"+result.InterfaceResult.Uploads[i]['Initiator']['Name']);
				}
				console.log("CommonPrefixes：");
				for(var i in result.InterfaceResult.CommonPrefixes){
					console.log("Uploads[" + (i+1) + "]-->"+result.InterfaceResult.CommonPrefixes[i].Prefix);
				}
			}
		}
	});
}

//上传段
function uploadPart(){
	obs.UploadPart({
		"Bucket":'123456-20',
		'Key':'abcd',
		'PartNumber':1,
		'UploadId':'AFB5BFB84ED2EFB8855DE8ACCBC9427B',
//		'Body':"abcdefghijklmnopqrstuvwxyz",
		'SourceFile': "C:\\bb1.rar"
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("ETag-->"+result.InterfaceResult.ETag);
			}
		}
	});
}

//列出上传段
function listParts(){
	obs.ListParts({
		"Bucket":'123456-20',
		'Key':'abcd',
		'UploadId':'AFB5BFB84ED2EFB8855DE8ACCBC9427B',
		MaxParts:10,
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("Key-->"+result.InterfaceResult.Key);
				console.log("UploadId-->"+result.InterfaceResult.UploadId);
				console.log("PartNumberMarker-->"+result.InterfaceResult.PartNumberMarker);
				console.log("NextPartNumberMarker-->"+result.InterfaceResult.NextPartNumberMarker);
				console.log("MaxParts-->"+result.InterfaceResult.MaxParts);
				console.log("IsTruncated-->"+result.InterfaceResult.IsTruncated);
				console.log("StorageClass-->"+result.InterfaceResult.StorageClass);
				console.log("Initiator[ID]-->"+result.InterfaceResult.Initiator['ID']);
				console.log("Initiator[Name]-->"+result.InterfaceResult.Initiator['Name']);
				console.log("Owner[ID]-->"+result.InterfaceResult.Owner['ID']);
				console.log("Owner[Name]-->"+result.InterfaceResult.Owner['Name']);
				console.log("Parts:");
				for(var i in result.InterfaceResult.Parts){
					console.log("Part["+(i+1)+"]:");
					console.log("PartNumber-->"+result.InterfaceResult.Parts[i]['PartNumber']);
					console.log("LastModified-->"+result.InterfaceResult.Parts[i]['LastModified']);
					console.log("ETag-->"+result.InterfaceResult.Parts[i]['ETag']);
					console.log("Size-->"+result.InterfaceResult.Parts[i]['Size']);
				}

			}
		}
	});
}

//拷贝段
function copyPart(){
	obs.CopyPart({
		"Bucket":'123456-20',
		'Key':'abc',
		'partNumber':3,
		'UploadId':'CD315EF8F25130AB6C5D2BB59B1244D4',
		'CopySource':'123456-20/test.txt'
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("LastModified-->"+result.InterfaceResult.LastModified);
				console.log("ETag-->"+result.InterfaceResult.ETag);
			}
		}
	});
}

//合并段
function completeMultipartUpload(){
	obs.CompleteMultipartUpload({
		"Bucket":'123456-20',
		'Key':'abcd',
		'UploadId':'AFB5BFB84ED2EFB8855DE8ACCBC9427B',
		'Parts':[{'PartNumber':1,'ETag':'cbe7b041b0f7f24b1004553c0ffbc647'},
		         {'PartNumber':2,'ETag':'56d54575f3601cefd7bc74570b781e1c'}]
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				console.log("VersionId-->"+result.InterfaceResult.VersionId);
				console.log("Location-->"+result.InterfaceResult.Location);
				console.log("Bucket-->"+result.InterfaceResult.Bucket);
				console.log("Key-->"+result.InterfaceResult.Key);
				console.log("ETag-->"+result.InterfaceResult.ETag);
			}
		}
	});
}

//取消多段上传任务
function abortMultipartUpload(){
	obs.AbortMultipartUpload({
		"Bucket":'123456-20',
		'Key':'abcd',
		'UploadId':'7EB48F3043F337297306429C69AB3FF7',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//设置桶的CORS
function setBucketCors(){
	obs.SetBucketCors({
		"Bucket":'12345-10',
		'CorsRule':[
		    {'ID':'123456789',
			'AllowedMethod':['PUT','POST','GET','DELETE'],
			'AllowedOrigin':["www.baidu.com","www.huawei.com"],
			'AllowedHeader':["header-1",],
			'MaxAgeSecond':60,},
			 {'ID':'1234567810',
				'AllowedMethod':['PUT','POST','GET'],
				'AllowedOrigin':["www.gogo.com","www.huawei.com"],
				'AllowedHeader':["header-1","header-2"],
				'MaxAgeSeconds':50,}],
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
			}
		}
	});
}

//获取桶的CORS
function getBucketCors(){
	obs.GetBucketCors({
		"Bucket":'12345-10',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			console.dir(result.InterfaceResult);
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);
				for(var k in result.InterfaceResult.CorsRule){
					console.log("CorsRule[",k,"]");
					console.log("CorsRule[ID]-->"+result.InterfaceResult.CorsRule[k]['ID']);
					console.log("CorsRule[MaxAgeSeconds]-->"+result.InterfaceResult.CorsRule[k]['MaxAgeSeconds']);
					for (var i in result.InterfaceResult.CorsRule[k]['AllowedMethod']){
						console.log("CorsRule[AllowedMethod][" , (i+1) ,"]-->"+result.InterfaceResult.CorsRule[k]['AllowedMethod'][i]);
					}
					for(var i in result.InterfaceResult.CorsRule[k]['AllowedOrigin']){
						console.log("CorsRule[AllowedOrigin][",(i+1) ,"]-->"+result.InterfaceResult.CorsRule[k]['AllowedOrigin'][i]);
					}
					for(var i in result.InterfaceResult.CorsRule[k]['AllowedHeader']){
						console.log("CorsRule[AllowedHeader]",(i+1),"]-->"+result.InterfaceResult.CorsRule[k]['AllowedHeader'][i]);
					}
					for(var i in result.InterfaceResult.CorsRule[k]['ExposeHeader']){
						console.log("CorsRule[ExposeHeader][",(i+1) ,"]-->"+result.InterfaceResult.CorsRule[k]['ExposeHeader'][i]);
					}	
				}
			}
		}
	});
}

//删除桶的CORS配置
function deleteBucketCors(){
	obs.DeleteBucketCors({
		"Bucket":'123456-10',
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);			
			}
		}
	});
}

//OPTION 桶
function optionsBucket(){
	obs.OptionsBucket({
		"Bucket":'123456-10',
		'Origin':"www.baidu.com",
		'AccessControlRequestMethods':["HEAD","PUT"],
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);	
				console.log("AccessContorlAllowOrigin-->"+result.InterfaceResult.AccessContorlAllowOrigin);	
				console.log("AccessContorlAllowHeaders-->"+result.InterfaceResult.AccessContorlAllowHeaders);	
				console.log("AccessContorlAllowMethods-->"+result.InterfaceResult.AccessContorlAllowMethods);	
				console.log("AccessContorlExposeHeaders-->"+result.InterfaceResult.AccessContorlExposeHeaders);	
				console.log("AccessContorlMaxAge-->"+result.InterfaceResult.AccessContorlMaxAge);		
			}
		}
	});
}

//OPTION 对象
function optionsObject(){
	obs.OptionsObject({
		"Bucket":'123456-3',
		"Key":'abcd',
		'Origin':"www.baidu.com",
		'AccessControlRequestMethods':["PUT","GET"],
	}, function(err,result){
		if(err){
			console.log("err:"+err);
		}else{
			console.log('CommonMsg:');
			console.log("Status-->"+result.CommonMsg.Status);
			console.log("Code-->"+result.CommonMsg.Code);
			console.log("Message-->"+result.CommonMsg.Message);
			console.log("HostId-->"+result.CommonMsg.HostId);
			console.log('InterfaceResult:');
			if(result.InterfaceResult != {}){
				console.log("RequestId-->"+result.InterfaceResult.RequestId);	
				console.log("AccessContorlAllowOrigin-->"+result.InterfaceResult.AccessContorlAllowOrigin);	
				console.log("AccessContorlAllowHeaders-->"+result.InterfaceResult.AccessContorlAllowHeaders);	
				console.log("AccessContorlAllowMethods-->"+result.InterfaceResult.AccessContorlAllowMethods);	
				console.log("AccessContorlExposeHeaders-->"+result.InterfaceResult.AccessContorlExposeHeaders);	
				console.log("AccessContorlMaxAge-->"+result.InterfaceResult.AccessContorlMaxAge);		
			}
		}
	});
}

//createBucket();
//listBucket();
//headBucket();
//deleteBucket();
//deleteBucketWithObjects();
//setBucketQuota();
//getBucketQuota();
//getBucketStorageInfo();
//setBucketPolicy();
//getBucketPolicy();
//deleteBucketPolicy();
//setBucketVersioningConfiguration();
//getBucketVersioningConfiguration();
//getBucketLocation();
//listVersions();
//listObjects();
//setBucketLifecycleConfiguration();
//getBucketLifecycleConfiguration();
//deleteBucketLifecycleConfiguration();
//setBucketAcl();
//getBucketAcl();
//setBucketLoggingConfiguration();
//getBucketLoggingConfiguration();
//setBucketWebsiteConfiguration();
//getBucketWebsiteConfiguration();
//deleteBucketWebsiteConfiguration();
//putObject();
//getObject();
//copyObject();
//getObjectMetadata();
//setObjectAcl();
//getObjectAcl();
//deleteObject();
//deleteObjects();
//initiateMultipartUpload();
//listMultipartUploads();
//uploadPart();
//listParts();
//copyPart();
//completeMultipartUpload();
//abortMultipartUpload();
//setBucketCors();
//getBucketCors();
//deleteBucketCors();
//optionsBucket();
//optionsObject();





