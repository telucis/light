/**
 * H5新增属性
 * classList 返回元素的class属性数组，具有方法(add/remove/contains/toggle)
 */


/**
 * 是否元素节点
 * @param  {Element}  element 
 * @return {Boolean}         
 */
export function isElement(element){
	return element.nodeType === 1;
}
/**
 * 是否文本节点
 * @param  {Element}  element 
 * @return {Boolean}         
 */
export function isTextNode(element){
	return element.nodeType === 3;
}
/**
 * 清空element所有子节点
 * @param  {Element} element [description]
 * @return {Element}         [description]
 */
export function empty(element){
	while(element.firstChild){
		element.removeChild(element.firstChild);
	}
	return element;
}
/**
 * 获取节点属性
 * @param  {Element} node [description]
 * @param  {String} name [description]
 * @return {String}      [description]
 */
export function getAttr(node, name){
	return node.getAttribute(name) || '';
}
/**
 * 删除节点属性
 * @param  {Element} node [description]
 * @param  {String} name [description]
 */
export function removeAttr(node, name){
	node.removeAttribute(name);
}
/**
 * 设置节点属性
 * @param {Element} node  [description]
 * @param {String} name  [description]
 * @param {String} value [description]
 */
export function setAttr(node, name, value){
	if(value == null || value === false){
		return removeAttr(node, name)
	}
	if(value === true){
		node[name] = value;
		if(!hasAttr(node, name)){
			node.setAttribute(name, '');
		}
	}else if(value !== getAttr(node, name)){
		node.setAttribute(name, value);
	}
}
/**
 * 判断节点是否存在属性
 * @param  {Element}  node [description]
 * @param  {String}  name [description]
 * @return {Boolean}      [description]
 */
export function hasAttr(node, name){
	return node.hasAttribute(name);
}

export function hasClass(node, classname){
	let current, list = node.classList;
	if(list){
		return list.contains(classname);
	}else{
		current = ' ' + getAttr(node, 'class') + ' ';
		return current.indexOf(' ' + classname + ' ') > -1;
	}
}

export function addClass(node, classname){
	let current, list = node.classList;
	if(!classname || hasClass(node, classname)){
		return;
	}
	if(list){
		list.add(classname)
	}else{
		current = ' ' + getAttr(node, 'class') + ' ';
		if(current.indexOf(' ' + classname + ' ') === -1){
			setAttr(node, 'class', (current + classname).trim());
		}
	}
}

export function removeClass(node, classname){
	let current, target, list = node.classList;
	if(!classname || !hasClass(node, classname)){
		return;
	}
	if(list){
		list.remove(classname);
	}else{
		target = ' ' + classname + ' ';
		current = ' ' + getAttr(node, 'class') + ' ';
		while(current.indexOf(target) > -1){
			current = current.replace(target, ' ');
		}
		setAttr(node, 'class', current.trim());
	}
	if(!node.className){
		removeAttr(node, 'class');
	}
}

export function addEvent(node, evt, callback, capture){
	node.addEventListener(evt, callback, capture);
}

export function removeEvent(node, evt, callback, capture){
	node.removeEventListener(evt, callback, capture);
}

export default function DOM(){
	this.empty = empty;
	this.getAttr = getAttr;
	this.removeAttr = removeAttr;
	this.setAttr = setAttr;
	this.hasAttr = hasAttr;
	this.hasClass = hasClass;
	this.addClass = addClass;
	this.removeClass = removeClass;
	this.addEvent = addEvent;
	this.removeEvent = removeEvent;
}




























