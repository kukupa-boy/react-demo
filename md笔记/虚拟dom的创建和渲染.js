// 创建虚拟dom对象
export function createElement(el,prop,...children){
    let virtualDom = {
        $$type: Symbol('react.element'),
        type: null,
        ref: null,
        props: null
    }
    virtualDom.type = el;
    virtualDom.props =prop ? {...prop} : {};
    if(children.length > 0){
        virtualDom.props.children = children.length === 1 ? children[0] : children;
    }
    return virtualDom;
}

/**
 * 封装一个对象迭代方法:拿取当前的对象的所有私有对象
 * 1. 传统的for-- in循环性能差，即可以迭代私有的，也可以迭代公有的（property）；只能迭代可枚举的，非symbol类型的
 * 2. 获取对象所有的私有属性【不论类型和是否可以枚举】 Object.getOwnPropertyNames(obj) + Object.getOwnPropertySymbols(obj)
 * let key = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)); -->keys可以拿到所有的私有属性
 * 3. 获取对象的所有的私有属性：Reflect.ownKeys(obj) --> 但是这个方法不兼容ie
 */
function Each(obj,callback){
    if(obj === null || typeof obj !== 'object'){
        throw new TypeError('obj is not object');
    }
    if(typeof callback !== 'function'){
        throw new TypeError('callback is not function');
    }
    let keys = Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj));
    keys.forEach(key => {
        callback(key,obj[key]);
    })
} 

// 给元素添加属性的方式
/**
 * 1. 这样元素的属性就添加上了(对于自定义属性添加到了堆内存中，不会设置到元素标签中，对于内置属性会设置到元素标签中)
    let ele = docuemnt.getElementById('root')
    ele.index = 0;
    获取：ele.index
    删除： delete ele.index
 * 2. 通过setAttribute方法添加属性，直接设置在元素的标签上
    ele.setAttribute('index',0);
    获取： ele.getAttribute('index')
    删除：ele.removeAttribute('index')
 */


// 将虚拟dom对象转换为真实dom对象
export function createDom(virtualDom,container){
    // 获取虚拟dom对象的type属性和props属性
    let {type,props} = virtualDom;
    // 如果type是字符串，那么就是一个原生的标签，如果是函数，那么就是一个组件
    if(typeof type === 'string'){
        // 创建一个真实的dom节点
        let ele = document.createElement(type); // 递归获取，作用域链（ele）
        // 将props属性中的属性添加到真实的dom节点上
        Each(props,(key,value) => {
            // 判断特殊情况className、style、children
            if(key === 'className'){
                 ele.setAttribute('class',value);
                 return;
            }else if(key === 'style'){
                Each(value,(styleKey,styleValue) => {
                    ele.style[styleKey] = styleValue;
                })
                return;
            }else if(key === 'children'){
                // 如果是children属性，那么就是子节点，如果是一个字符串，那么就是一个文本节点，如果是一个数组，那么就是一个元素节点
                let children = value
                if(!Array.isArray(children)){
                    children = [children];
                }
                children.forEach(child => {
                    if(typeof child === 'string'){ // 子节点为文本节点直接插入
                        ele.appendChild(document.createTextNode(child));
                    }else{
                        createDom(child,ele);
                    }
                }
                )
                return;
            }
            // 其他情况直接添加到元素上
            ele.setAttribute(key,value);
        })
        // 将创建的元素添加到容器中
        container.appendChild(ele);
    }
}