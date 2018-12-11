class MUtil{
	//新方法promise
	//这样request方法返回的就是一个promise对象，可以链式调用了
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type 		: param.type 		|| 'get',
				url  		: param.url  		|| '',
				dataType 	: param.dataType 	|| 'json',
				data 		: param.data 		|| null,
				success		:res =>{
					//数据请求成功
					if(0 === res.status){
						typeof resolve === 'function' && resolve(res.data,res.msg);
					}
					//没有登录状态，强制登录
					else if(10 === res.status){
						this.doLogin();
					}
					else{
						typeof reject === 'function' && reject(res.msg || res.data);
					}
				},
				error 		:err=>{
					typeof reject === 'function' && reject(err.statusText);
				}
			});
		}); 		
	}
	//跳转登录
	doLogin(){
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	//获取URL参数
	getUrlParam(name){
		// param=123&param1=456
		var queryString = window.location.search.split("?")[1] || '',
			reg			= new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
			result		= queryString.match(reg);
			//match方法，没有全局标志，返回的是数组[第0个匹配文本，其他存放的是子表达式的匹配]
		    //["param=123&", "", "123", "&", index: 0, input: "param=123&param1=456", groups: undefined]			
			return result ? decodeURIComponent(result[2]) : null;
	}
	//错误提示
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了~');
	}
	//添加本地存储
	setStorage(name,data){
		let dataType = typeof data;
		//json对象
		if(dataType === 'object'){
			window.localStorage.setItem(name,JSON.stringify(data));
		}
		//基础类型
		else if(['string','number','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name,data);
		}
		//其他类型不支持
		else{
			alert('该类型不能用于本地存储');
		}
	}
	//获取本地存储
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(data){
			return JSON.parse(data);
		}else{
			return '';
		}		
	}
	//清除本地存储
	removeStorage(name){
		window.localStorage.removeItem(name);
	}
	//传统方法
	// request(param){
	// 	$.ajax({
	// 		type 		: param.type 		|| "get",
	// 		url  		: param.url  		|| "",
	// 		dataType 	: param.dataType 	|| "json",
	// 		data 		: param.data 		|| null,
	// 		success(res){

	// 		},
	// 		error(err){

	// 		}

	// 	});
	// }
}

export default MUtil;