import Watcher from './watcher';
import Compiler from './compiler';
import { each, copy, isFunc, isArray, isString, isObject, config } from '../util';

export default function MVVM(option){
	let context = option.context || option.model;

	//将事件函数 this 指向调用者
	each(option.model, function(value, key){
		if(isFunc(value)){
			option.model[key] = value.bind(context);
		}
	})

	//整合事件函数声明对象
	each(option.methods, function(callback, func){
		option.model[func] = callback.bind(context);
	})

	//事件或 watch 函数作用域
	this.__ct__ = context;
	//初始数据备份，用于reset
	this.__bk__ = copy(option.model);
	//内部 ViewModel 实例
	this.__vm__ = new Compiler(option);

	//数据模型对象
	this.$data = this.__vm__.$data;
	//DOM注册索引
	this.$els = this.__vm__.$regEles;

	
}






