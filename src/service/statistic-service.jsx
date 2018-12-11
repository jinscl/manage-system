import MUtil from 'util/ms.jsx';

const _ms = new MUtil();

class Statistic{
	//首页数据统计
	getHomeCount(){
		return _ms.request({
			url:'/manage/statistic/base_count.do'
		})
	}

}
export default Statistic;