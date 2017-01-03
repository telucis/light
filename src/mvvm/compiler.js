/**
 * node.attributes: 返回节点的所有属性
 * node.hasAttributes(): 当前元素拥有任何属性返回true,否则false
 * node.textContent: 
 */

import { DirectiveParsers } from './directives/index';
import { createObserver, setComputedProperty } from './observe/index';
import { def, each, warn, isObject, isFunc, nodeToFragment } from '../util';
import { hasAttr, isElement, isTextNode, removeAttr, empty, getAttr } from '../dom';

const regNewline = /\n/g;
const regText = /\{\{(.+?)\}\}/g;
const regMustache = /(\{\{.*\}\})/;
const noNeedParsers = ['velse', 'vpre', 'vcloak', 'vonce', 'vhook'];

function isDirective(directive){
	return directive.indexOf('v-') === 0;
}

function isOnceNode(node){
	return isElement(node) && hasAttr(node, 'v-once');
}
/**
 * 节点的子节点是否延迟编译
 * 单独处理 vif, vfor 和 vpre 子节点的编译
 * @param  {[type]}  node [description]
 * @return {Boolean}      [description]
 */
function hasLateCompileChilds(node){
	return hasAttr(node, 'v-if') || hasAttr(node, 'v-for') || hasAttr(node, 'v-pre');
}
/**
 * 节点是否含有合法指令
 * @param  {[type]}  node [description]
 * @return {Boolean}      [description]
 */
function hasDirective(node){
	if(isElement(node) && node.hasAttributes()){
		let nodeAttrs = node.attributes;
		for(let i=0; i<nodeAttrs.length; i++){
			if(isDirective(nodeAttrs[i].name)){
				return true;
			}
		}
	}else if(isTextNode(node) && regMustache.test(node.textContent)){
		return true;
	}
}
/**
 * 获取指令信息
 * @param  {Attr} attribute [description]
 * @return {Object}           [description]
 */
function getDirectiveDesc(attribute){
	let attr = attribute.name;
	let expression = attribute.value;
	let directive, args, pos = attr.indexOf(':');
	if(pos > -1){
		args = atrr.substr(pos + 1);
		directive = attr.substr(0, pos);
	}else {
		directive = attr;
	}
	return { args, attr, directive, expression };
}
/**
 * 缓存指令钩子函数名称
 * @param  {Element} node [description]
 */
function saveDirectiveHooks(node){
	if(!node.__afterHook__){
		def(node, '__afterHook__', getAttr(node, 'v-hook:after'));
	}
	if(!node.__beforeHook__){
		def(node, '__beforeHook__', getAttr(node, 'v-hook:before'))
	}
}
/**
 * 统一变更回调函数
 * 保证多个相同依赖的变更只触发一次
 * @param  {Function} func    [description]
 * @param  {Object} context [description]
 * @return {Function}         [description]
 */
function makeUnifyCallback(func, context){
	let _path, _newVal, _oldVal;
	return function(param, newVal, oldVal){

	}
}
/**
 * ViewModel 编译模块
 * @param {Object} option [description]
 */
function Compiler(option){
	let model = option.model;
	let element = option.view;
	let computed = option.computed;
	let watchAll = option.watchAll;

	if(!isElement(element)){
		return warn('view must be a type of DOMElement: ', element);
	}
	if(!isObject(model)){
		return warn('model must be a type of Object: ', model);
	}

	//编译节点缓存队列
	this.$queue = [];
	//数据模型对象
	this.$data = model;
	//缓存根节点
	this.$element = element;
	//DOM注册索引
	this.$regEles = {};
	//指令实例缓存
	this.$directives = [];
	//钩子和统一回调作用域
	this.$context = option.context || this;

	//检测数据模型
	this.$ob = createObserver(this.$data);
	if(computed){
		setComputedProperty(this.$data, computed);
	}

	//编译完成后的回调集合
	this.$afters = [];
	//v-if, v-for DOM 插删钩子函数
	this.$hooks = option.hooks || {};
	//自定义1指令刷新函数
	this.$customs = option.customs || {};
	//监听变更统一回调
	this.$unifyCb = isFunc(watchAll) ? makeUnifyCallback(watchAll, this.$context) : null;
	
	//是否立刻编译根元素
	if(!option.lazy){
		this.mount();
	}
}

let cp = Compiler.prototype;


























export default Compiler;
