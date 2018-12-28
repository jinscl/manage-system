import MUtil from 'util/ms.jsx';

const _ms = new MUtil();

class Product{
	//获取商品列表	
	getProductList(listParam){
		let url 	= '',
			data 	= {};
		if(listParam.listType === 'list'){
			url = '/manage/product/list.do';
			data.pageNum = listParam.pageNum;
		}else if(listParam.listType === 'search'){
			url = '/manage/product/search.do';
			data.pageNum = listParam.pageNum;
			data[listParam.searchType] = listParam.searchKeyword;
		}
		return _ms.request({
            type    : 'post',
            url     : url,
            data 	: data
		})
	}
	//获取商品详情
	getProduct(productId){
		return _ms.request({
            type    : 'post',
            url     : '/manage/product/detail.do',
            data    : {
            	productId:productId || 0
            }
        });
	}
	//商品上下架操作
	setProductStatus(productInfo){
		return _ms.request({
            type    : 'post',
            url     : '/manage/product/set_sale_status.do',
            data 	: productInfo
		})
	}
	//验证保存商品的表单信息
	checkProduct(product){
		let result = {
			status:true,
			msg:'验证通过'
		};	
		if(typeof product.name !== 'string' || product.name.length === 0){
			return {
				status:false,
				msg:'商品名称不能为空！'
			}
		}
		if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
			return {
				status:false,
				msg:'商品描述不能为空！'
			}
		}
		if(typeof product.categoryId !== 'number' || product.categoryId <= 0){
			return {
				status:false,
				msg:'请选择商品品类！'
			}
		}
		if(typeof product.price !== 'number' || product.price < 0){
			return {
				status:false,
				msg:'请输入正确的商品价格！'
			}
		}
		if(typeof product.stock !== 'number' || product.stock <= 0){
			return {
				status:false,
				msg:'请输入正确的商品库存！'
			}
		}
		return result;
	}
	//保存商品
	saveProduct(product){
		 return _ms.request({
            type    : 'post',
            url     : '/manage/product/save.do',
            data    : product
        });
	}	
	/**
	 * 品类相关
	 */
	getCategoryList(parentCategoryId){
		return _ms.request({
            type    : 'post',
            url     : '/manage/category/get_category.do',
            data 	: {
            	categoryId :parentCategoryId || 0
            }
		})
	}
	//新增品类
	saveCategory(category){
		return _ms.request({
            type    : 'post',
            url     : '/manage/category/add_category.do',
            data    : category
		})
	}
	updateCategoryName(category){
		return _ms.request({
            type    : 'post',
            url     : '/manage/category/set_category_name.do',
            data    : category
		})
	}

}
export default Product;