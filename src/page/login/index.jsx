import React from 'react';
import MUtil from 'util/ms.jsx';
import User from 'service/user-service.jsx';

const _ms = new MUtil();
const _user = new User();

import './index.scss';

class Login extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username:"",
			password:"",
			redirect:_ms.getUrlParam('redirect') || ''
		}
	}
	componentWillMount(){
		document.title = '登录 —— MANAGE SYS'
	}
	//输入框改变事件
	onInputChange(e){		
		let inputName  = e.target.name,
			inputValue = e.target.value;			
		this.setState({
			[inputName]: inputValue
		});
	}
	onInputKeyUp(e){
		if(e.keyCode === 13){
			this.onSubmit();
		}		
	}
	//登录按钮提交事件
	onSubmit(){
		let loginInfo = {
				username:this.state.username,
				password:this.state.password
			},
			checkResult = _user.checkLoginInfo(loginInfo);
		if(checkResult.status){
			_user.login(loginInfo).then((res) =>{
				_ms.setStorage('userInfo',res);
				this.props.history.push(this.state.redirect);
			},(errMsg) =>{
				_ms.errorTips(errMsg);
			});
		}
		else{
			_ms.errorTips(checkResult.msg);
		}
		
		
	}
	render(){
		return (			
			<div className="col-md-4 col-md-offset-4">
				<div className="panel panel-default login-panel">
					<div className="panel-heading">欢迎登录-管理系统</div>
					<div className="panel-body">
						<div>
							<div className="form-group">								
								<input type="text" 
									name="username"
									className="form-control" 
									placeholder="请输入用户名" 
									onChange={e => this.onInputChange(e)}
									onKeyUp={e => this.onInputKeyUp(e)}/>
							</div>
							<div className="form-group">								
								<input type="password" 
									name="password"
									className="form-control" 
									placeholder="请输入密码" 
									onChange={e => this.onInputChange(e)}
									onKeyUp={e => this.onInputKeyUp(e)}/>
							</div>												
							<button className="btn btn-lg btn-primary btn-block"
							onClick={e => this.onSubmit(e)}>登录</button>
						</div>
					</div>
				</div>
			</div>			
		)
	};	
};
export default Login;