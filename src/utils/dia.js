
//页面组件共用方法


module.exports = (domain)=>{
	domain.open = (key, props)=>{
		domain.setState({
		  [`${key}`]: true,
		  props
		});
	}
	domain.close = (key)=>{
		domain.setState({
		  [`${key}`]: false,
		});
	}
};