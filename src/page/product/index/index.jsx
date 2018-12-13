import React 		from 'react';
import {Link} 		from 'react-router-dom';
import MUtil 		from 'util/ms.jsx';
import Product 		from 'service/product-service.jsx';

import PageTitle 	from 'component/page-title/index.jsx';
import ListSearch	from './index-list-search.jsx';
import TableList 	from 'util/table-list/index.jsx';
import Pagination 	from 'util/pagination/index.jsx';
import './index.scss';

const _ms 	   = new MUtil();
const _product = new Product();


class ProductList extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			listType	 :'list',
			list    	 : [],
			pageNum 	 : 1
		}		
	}
	componentDidMount(){
		this.loadProductList();
	}
	//加载商品列表
	loadProductList(){
		let listParam = {};
		listParam.listType 	= this.state.listType;
		listParam.pageNum 	= this.state.pageNum;
		//如果是
		if(this.state.listType === 'search'){
			listParam.searchType 	= this.state.searchType;
			listParam.searchKeyword 	= this.state.searchKeyword;
		}
		//请求接口
		_product.getProductList(listParam).then(res => {
			this.setState(res);
		},errMsg => {
			this.setState({
				list :[]
			})
			_ms.errorTips(errMsg);
		})
	}
	//搜索
	onSearch(searchType,searchKeyword){
		let listType = searchKeyword === '' ? 'list' :'search';
		this.setState({
			listType 		: listType,
			pageNum 		:1,
			searchType		:searchType,
			searchKeyword	:searchKeyword
		},()=>{
			this.loadProductList();
		})
	}
	//页数改变函数
	onPageNumChange(pageNum){
		//setState是异步函数,如果想setState结束之后执行某函数，就后面跟一个回调函数
		this.setState({
			pageNum:pageNum
		},() =>{
			this.loadProductList();
		})
	}
	//改变商品状态
	setProductStatus(e,productId,currentStatus){
		let newStatus 	= currentStatus == 1 ? 2 : 1,
			confirmTips = currentStatus == 1 
			? '确定要下架该商品？' :'确定要上架该商品？'
		if(window.confirm(confirmTips)){
			_product.setProductStatus({
				productId:productId,
				status:newStatus
			}).then(res => {
				_ms.successTips(res);
				this.loadProductList();
			},errMsg =>{
				_ms.errorTips(errMsg);
			});
		}
	}	
	render(){
		let tableHeads = [
			{'name':'商品ID',width:'10%'},
			{'name':'商品信息',width:'50%'},
			{'name':'价格',width:'10%'},
			{'name':'状态',width:'15%'},
			{'name':'操作',width:'15%'},
		];	
		return (
			<div id="page-wrapper">
				<PageTitle title="商品列表">
					<div className='page-header-right'>
						<Link to='/product/save' className='btn btn-primary'>
							<i className='fa fa-plus'></i>
							<span>添加商品</span>
						</Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={(searchType,searchKeyword) => {
					this.onSearch(searchType,searchKeyword)
				}}/>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product,index) =>{
							return(
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										<p>{product.subtitle}</p>
									</td>
									<td>￥{product.price}</td>
									<td>
										<p>{product.status === 1 ? '在售' : '已下架'}</p>	
										<button className='btn btn-xs btn-warning'
											onClick={e =>{this.setProductStatus(e,product.id,product.status)}}>
											{product.status === 1 ? '下架':'上架'}
										</button>								
									</td>
									<td>
										<Link className='opear' to={`/product/detail/${product.id}`}>查看</Link>
										<Link className='opear' to={`/product/save/${product.id}`}>编辑</Link>										
									</td>
								</tr>
							)
						})
					}
				</TableList>					
				<Pagination current={this.state.pageNum} 
					total={this.state.total}
					onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>		
			</div>
		)
	};
};
export default ProductList;