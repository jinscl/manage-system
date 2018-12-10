import React 	from 'react';
import {Link} 	from 'react-router-dom';
import MUtil from 'util/ms.jsx';
import User from 'service/user-service.jsx';

const _ms = new MUtil();
const _user = new User();

class NavTop extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username :_ms.getStorage('userInfo').username  || ''
		}		
	}
	onLogout(){
		_user.logout().then(res => {
			_ms.removeStorage('userInfo');
			window.location.href = '/login';
		},errMsg => {
			_ms.errorTips(errMsg);
		})
	}
	render(){		
		return(
			<div className="navbar navbar-default top-navbar">
	            <div className="navbar-header">	                
	                <Link className="navbar-brand" to="index.html"><b>MANAGE</b>SYS</Link>
	            </div>

	            <ul className="nav navbar-top-links navbar-right">	          	               
	                <li className="dropdown">
	                    <a className="dropdown-toggle" href="javascript:;">
	                        <i className="fa fa-user fa-fw"></i>
	                        {
	                        	this.state.username
	                        	?<span>欢迎，{this.state.username}</span>
	                        	:<span>欢迎您</span>
	                        }	                        
	                        <i className="fa fa-caret-down"></i>
	                    </a>
	                    <ul className="dropdown-menu dropdown-user">	                        
	                        <li>
		                        <a onClick={() => {this.onLogout()}}>
			                        <i className="fa fa-sign-out fa-fw"></i> 
			                        <span>退出登录</span>
		                        </a>
	                        </li>
	                    </ul>	                    
	                </li>	               
	            </ul>
	        </div>
		);
	};
}
export default NavTop;