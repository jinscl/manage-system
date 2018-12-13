import React from 'react';
import MUtil 		from 'util/ms.jsx';
import Product 		from 'service/product-service.jsx';

import './category-selector.scss';

const _ms 	   = new MUtil();
const _product = new Product();

class CategorySelector extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			firstCategoryId:0,
			firstCategoryList :[],
			secondCategoryId:0,
			secondCategoryList :[]
		}
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	componentWillReceiveProps(nextProps){
		let catergoryChange = this.props.categoryId !== nextProps.categoryId,
			parentCategoryChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
		//数据没有发生变化的时候，直接不做处理
		if(!catergoryChange && !parentCategoryChange){
			return;
		}
		//只有一级品类
		if(nextProps.parentCategoryId === 0){
			this.setState({
				firstCategoryId		:nextProps.categoryId,
				secondCategoryId 	: 0
			});
		}
		//有两级品类
		else{
			this.setState({
				firstCategoryId		:nextProps.parentCategoryId,
				secondCategoryId 	: nextProps.categoryId
			},()=>{
				//一级品类改变的时候，加载二级品类
				parentCategoryChange && this.loadSecondCategory()
			});
		}
	}
	//加载一级分类
	loadFirstCategory(){
		_product.getCategoryList().then(res =>{
			this.setState({
				firstCategoryList:res
			});
		},errMsg =>{
			_ms.errorTips(errMsg);
		});
	}
	//加载二级分类
	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res =>{
			this.setState({
				secondCategoryList:res
			});
		},errMsg =>{
			_ms.errorTips(errMsg);
		});
	}
	//选择一级分类
	onFirstCategoryChange(e){
		if(this.props.readOnly){
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId :newValue,
			secondCategoryId:0,
			secondCategoryList :[],
		},()=>{
			this.loadSecondCategory();
			this.onPropsCategoryChange();
		});
	}
	//选择二级分类
	onSecondCategoryChange(e){
		if(this.props.readOnly){
			return;
		}
		let newValue = e.target.value || 0;
		this.setState({		
			secondCategoryId:newValue			
		},()=>{			
			this.onPropsCategoryChange();
		});
	}
	//传给父组件选中的结果
	onPropsCategoryChange(){
		let categoryChangable = typeof this.props.onCategoryChange === 'function';
		//如果有二级品类
		if(this.state.secondCategoryId){
			categoryChangable && this.props.onCategoryChange(
				this.state.secondCategoryId,this.state.firstCategoryId);
		}
		//如果只有一级品类
		else{
			categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0);
		}
	}
	render(){	
		return (			
			<div className="col-md-10">
				<select className="form-control cate-select"
					value={this.state.firstCategoryId}
					readOnly={this.props.readOnly}
					onChange={(e)=>{this.onFirstCategoryChange(e)}}>
					<option value="">请选择一级分类</option>
					{this.state.firstCategoryList.map(
						(category,index) =>{
							return <option key={index} value={category.id}>{category.name}</option>
						})
					}
				</select>
				<select className="form-control cate-select"
					value={this.state.secondCategoryId}
					readOnly={this.props.readOnly}
					onChange={(e)=>{this.onSecondCategoryChange(e)}}>
					<option value="">请选择二级分类</option>
					{this.state.secondCategoryList.map(
						(category,index) =>{
							return <option key={index} value={category.id}>{category.name}</option>
						})
					}
				</select>
			</div>	
			)
		}
};
export default CategorySelector;