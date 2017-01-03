import Depend from './depend';
import { copy, each, extend, isFunc } from '../util';
import { createGetter, createSetter } from './expression/index';

/**
 * 遍历对象/数组每一个可枚举属性
 * @param {Object|Array}	target	[遍历值/对象或数组]
 * @param {Boolean} 			root		[是否根对象/数组]
 */
let walkedObs = [];
function walkThrough(target, root){
	let ob = target && target.__ob__;
	let guid = ob && ob.dep.guid;

	if(guid){
		if(walkedObs.indexOf(guid) > -1){
			return;
		}else{
			walkedObs.push(guid);
		}
	}

	each(target, function (value){
		walkThrough(value, false);
	});

	if(root){
		walkedObs.length = 0;
	}
}