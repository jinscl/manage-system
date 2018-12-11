import MUtil from 'util/ms.jsx';

const _ms = new MUtil();

class User{
	//因为request是一个promise对象，所有返回它,login就可以链式调用
	login(loginInfo){
		return _ms.request({
			type:'post',
			//http://admintest.happymmall.com/
			url:'/manage/user/login.do',
			data:loginInfo
		})
	}
	//检查登录数据
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username),
			password = $.trim(loginInfo.password);

		if(typeof username !== 'string' || username.length === 0){
			return {
				status:false,
				msg:'用户名不能为空！'
			}
		}
		if(typeof password !== 'string' || password.length === 0){
			return {
				status:false,
				msg:'密码不能为空！'
			}
		}
		return {
			status:true,
			msg:'验证通过'
		}
	}
	//退出登录
	logout(){
		return _ms.request({
            type    : 'post',
            url     : '/user/logout.do'
        });
	}
	//获取用户列表	
	getUserList(pageNum){
		return _ms.request({
            type    : 'post',
            url     : '/manage/user/list.do',
            data 	: {
            	pageNum:pageNum
            }
		})
	}
}
export default User;