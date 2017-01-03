import ajax from './ajax';
import core from './core';
import util from '../util';
import Component from './component';

/**
 * Light
 * @type {Object}
 */
let Light = Object.create(null);

/**
 * 添加属性扩展方法
 * @param  {Object} extra [扩展对象]
 */
Light.extend = function(extra){
	util.extend.call(this, extra);
}

Light.extend({ ajax, core, util, Component });

export default Light;