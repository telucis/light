import {
	each,
	extend,
	isFunc
} from '../util';

const regSuper = /\b\.Super\b/;
const toString = Function.prototype.toString;

/**
 * 对子类方法挂载 Super
 * @param  {Function} Super  [Super 函数]
 * @param  {Mix} method [子类属性或方法]
 * @return {Mix}        
 */
function bindSuper(Super, method){
	if(
		isFunc(method) && 
		regSuper.test(toString.call(method))
	){
		return function(){
			this.Super = Super;
			method.apply(this, arguments);
		}
	}else {
		return method;
	}
}


function Root(){}
Root.extend = function(proto){

}

export default Root;