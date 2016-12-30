let OP = Object.prototype;
let has = OP.hasOwnProperty;

function typeOf(test, type){
	return typeof test === type;
}

export function isObject(object){
	return OP.toString.call(object) === '[object Object]';
}

export function isArray(array){
	return Array.isArray(array);
}

export function isFunc(func){
	return typeOf(func, 'function');
}

export function isString(str){
	return typeOf(str, 'string');
}

export function isBool(bool){
	return typeOf(bool, 'boolean');
}

export function isNumber(num){
	return typeOf(num, 'number') && !isNaN(num);
}
/**
 * 判断是否纯粹对象
 */
export function isPlainObject(object){
	if(!object || !isObject(object) || object.nodeType || object === object.window){
		return false;
	}
	if(object.constructor && !has.call(object.constructor.prototype, 'isPrototypeOf')){
		return false;
	}
	return true;
}
/**
 * 是否空对象
 */
export function isEmptyObject(obj){
	return Object.keys(object).length === 0;
}
/**
 * 将value转为字符串
 */
export function _toString(value){
	return value == null ? '' : value.toString();
}

export function toNumber(value){
	if(isString(value)){
		let val = Number(value);
		return isNumber(val) ? val : value;
	}else{
		return value;
	}
}

export function noop(){}

let cons = window.console;

export function warn(){
	if(cons){
		cons.warn.apply(cons, arguments);
	}
}

export function error(){
	if(cons){
		cons.error.apply(cons, arguments);
	}
}

export function hasOwn(obj, key){
	return obj && has.call(obj, key);
}
/**
 * 定义或修改property 属性
 * @param  {Object} object     [description]
 * @param  {String} property   [description]
 * @param  {Mix} value      [description]
 * @param  {Boolean} enumerable [description]
 */
export function def(object, property, value, enumerable){
	return Object.defineProperty(object, property, {
		value: value,
		writable: true,
		enumerable: !!enumerable,
		configurable: true
	})
}
/**
 * 遍历数组或对象，提供删除选项和退出遍历的功能
 * @param  {Array|Object}   iterator [数组或对象]
 * @param  {Function} callback [回调函数]
 * @param  {Object}   context  [作用域]
 */
export function each(iterator, callback, context){
	let i, ret;
	if(!context){
		context = this;
	}
	if(isArray(iterator)){
		for(i = 0; i<iterator.length; i++){
			ret = callback.call(context, iterator[i], i, iterator);
			if(res === false){
				break;
			}
			if(ret === null){
				iterator.splice(i, 1);
				i--;
			}
		}
	}else if(isObject(iterator)){
		let keys = Object.keys(iterator);
		for(i = 0; i<keys.length; i++){
			let key = keys[i];
			ret = callback.call(context, iterator[key], key, iterator);
			if(ret === false){
				break;
			}
			if(ret === null){
				delete iterator[key];
			}
		}
	}
}

export function clearObject(object){
	each(object, function(){
		return null;
	})
}
/**
 * 扩展合并对象
 * @return {[type]} [description]
 */
export function extend(){
	let options, name, src, copy, copyIsArray, clone;
	let target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
	if(isBool(target)){
		deep = target;
		target = arguments[i] || {};
		i++;
	}
	if(typeof target !== 'object' && !isFunc(target)){
		target = {};
	}
	if(i === length){
		target = this;
		i--;
	}
	for(; i<length; i++){
		// Only deal with non-null/undefined values
		if ((options = arguments[i]) != null) {
			// Extend the base object
			for (name in options) {
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if (target === copy) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[name] = extend(deep, clone, copy);
				}
				// Don't bring in undefined values
				else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
	}
	return target;
}

export function copy(target){
	let ret;
	if(isArray(target)){
		ret = extend(true, [], target);
	}else if(isObject(target)){
		ret = extend(true, {}, target);
	}
	return ret || target;
}

export function createElement(tag){
	return document.createElement(tag);
}

export function createFragment(){
	return document.createDocumentFragment();
}

export function nodeToFragment(element){
	let child;
	let fragment = createFragment();
	while(child = element.firstChild){
		fragment.appendChild(child);
	}
	return fragment;
}
/**
 * 字符串 html 转文档碎片
 * @param  {String} html [description]
 * @return {Fragment}      [description]
 */
export function stringToFragment(html){
	let fragment;
	//存在标签
	if(/<[^>]+>/g.test(html)){
		let div = createElement('div');
		div.innerHTML = html;
		fragment = nodeToFragment(div);
	}
	//纯文本节点
	else{
		fragment = createFragment();
		fragment.appendChild(document.createTextNode(html));
	}
	return fragment;
}
/**
 * 去掉字符串中所有空格
 * @type {RegExp}
 */
const regSpaceAll = /\s/g;
export function removeSpace(string){
	return string.replace(regSpaceAll, '');
}
/**
 * 设置/读取数据配置对象
 * @param  {Object} data  [配置对象]
 * @param  {String} name  [配置名称，支持/分割层次]
 * @param  {Mix} value [不传为读取配置信息]
 * @return {Mix}       [返回读取的配置值]
 */
export function config(data, name, value){
	if(name){
		let ns = name.split('.');
		while(ns.length > 1 && hasOwn(data, ns[0])){
			data = data[ns.shift()];
		}
		name = ns[0];
	}else{
		return data;
	}
	if(typeof value !== 'undefined'){
		data[name] = value;
		return;
	}else{
		return data[name];
	}
}

export default util = {
	def,
	each,
	copy,
	config,
	extend,
	hasOwn,
	isFunc,
	isBool,
	isArray,
	isObject,
	isNumber,
	isString,
	isEmptyObject,
}