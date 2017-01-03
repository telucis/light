import cache from './cache';
import Module from './module';
import { isFunc } from '../util';
import messager from './messager';

/**
 * Core 核心模块，用于顶层组件模块的创建
 */
let Core = Module.extend({
	/**
	 * 获取顶级组件实例
	 * @param  {String} name [组件实例名称]
	 * @return {Object}
	 */
	get: function(name){
		return this.getChild(name);
	},

	/**
	 * 全局广播消息， 由core 实例发出， 系统全部实例接收
	 * @param  {name}   name     [发送的消息名称]
	 * @param  {[type]}   param    [description]
	 * @param  {Function} callback [description]
	 * @param  {[type]}   context  [description]
	 * @return {[type]}            [description]
	 */
	globalCast: function(name, param, callback, context){
		if(isFunc(param)){
			context = callback;
			callback = param;
			param = null;
		}
		messager.globalCast(name, param, callback, context);
	},

	/**
	 * 重写destroy, core 模块不允许销毁
	 */
	destroy: function(){}
})

export default cache['0'] = new Core();