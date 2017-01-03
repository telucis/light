import Root from './root';
import cache from './cache';
import messager from './messager';
import { each, isFunc, isBool, isString, warn, hadOwn, clearObject } from '../util';

const childMap = 'map';
const childArray = 'array';

/**
 * Module 系统组件模块基础类，实现所有模块的通用方法
 * @type {[type]}
 */
let Module = Root.extend({
	/**
	 * __rd__ 记录模块信息
	 * @type {Object}
	 */
	__rd__: {};

	creat: function(name, Class, config){
		if(!isString(name)){
			return warn('Module name ['+ name +'] must be a type of String');
		}
		if(!isFunc(Class)){
			return warn('Module Class ['+ Class +'] must be a type of Component');
		}

		let record = this.__rd__;

		if(!hadOwn)
	}
})










