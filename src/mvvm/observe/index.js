import Depend from '../depend';
import Watched from '../watcher';
import { setMutationProto } from './array';
import {
	def,
	each,
	noop,
	warn,
	hasOwn,
	isFunc,
	isArray,
	isObject
} from '../../util';

/**
 * 生成取值路径
 * @param  {String} prefix 
 * @param  {String} suffix 
 * @return {String}        
 */
function createPath(prefix, suffix){
	return prefix ? (prefix + '*' + suffix) : suffix;
}

/**
 * 检测对象
 * @param  {Object} object 
 * @param  {String} path   
 */
function observeObject(object, path){
	each(object, function(value, key){
		observe(object, key, value, createPath(path, key));
	});
}

/**
 * 数据检测模块
 * @param {Object} data [检测对象/数组]
 * @param {String} path [检测字段名称]
 */
function Observe(data, path){
	this.dep = new Depend(path);
}




