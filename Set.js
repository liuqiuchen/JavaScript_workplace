/*Set.js: JavaScript 面向对象技术*/

// 值的任意集合

/**
 *
 * 构造函数
 * @constructor
 */
function Set() { // 这是一个构造函数
    this.values = {}; // 集合数据保存在对象的属性里
    this.n = 0; // 集合中值的个数
    this.add.apply(this, arguments); // 把所有属性都添加进这个集合
}

// 将每个参数都添加至集合中
Set.prototype.add = function () {
    for(var i = 0;i < arguments.length;i++) { // 遍历每个参数
        var val = arguments[i]; // 待添加到集合中的值
        var str = Set._v2s(val); // 把它转换为唯一字符串
        //var str = val.toString(); // 把它转换为字符串
        if(!this.values.hasOwnProperty(str)) {
            this.values[str] = val;
            this.n++;
        }
    }
    return this; // 支持链式方法调用
};

// 这是一个内部函数，将任意JavaScript值和唯一的字符串对应起来
Set._v2s = function (val) {
    switch (val) {
        case undefined: return 'u'; // 特殊原始值
        case null: return 'n';
        case  true: return 't';
        case false: return 'f';
        default: switch (typeof val) {
            case 'number': return '#' + val;
            case 'string': return '"' + val;
            default: return '@' + objectId(val);
        }
    }

    function objectId(o) {
        var prop = "|**objectid**|";
        if(!o.hasOwnProperty(prop))
            o[prop] = Set._v2s.next++;
        return o[prop];
    }

};
Set._v2s.next = 100; // 设置初始化id的值

var set1 = new Set('html', 'css', 'javascript');
set1.add();
//console.log(set1);
//console.log(set1.values);
//console.log(set1.n);

// 从集合删除元素，这些元素由参数指定
Set.prototype.remove = function () {
    for(var i = 0;i < arguments.length;i++) {
        var str = Set._v2s(arguments[i]);
        if(this.values.hasOwnProperty(str)) {
            delete this.values[str];
            this.n--;
        }
    }
    return this;
};

//set1.remove('html', 'css');
//console.log(set1.values);

// 如果包含这个值，返回true，如果不包含，返回false
Set.prototype.contain = function (val) {
  return this.values.hasOwnProperty(Set._v2s(val));
};

//console.log(set1.contain('css'));

// 返回集合的大小
Set.prototype.size = function () {
    return this.n;
};

//console.log(set1.size());

/**
 * 一个例子：枚举类型
 */
//JavaScript 中的枚举类型
function enumeration(namesToValues) {
    // 这个虚拟的构造函数是返回值
    var enumeration = function () {
        throw "不能枚举";
    };

    // 枚举值继承自这个对象
    var proto = enumeration.prototype = {
        constructor: enumeration, // 标识类型
        toString: function () {
            return this.name;
        },
        valueOf: function () {
            return this.value;
        },
        toJSON: function () {
            return this.name;
        }
    };

    // 用以存放枚举对象的数组
    enumeration.values = [];

    // 现在创建新类型的实例
    for(var name in namesToValues) { // 遍历每个值
        // 创建一个代表它的值
        var e = inherit(proto);
        e.name = name;
        e.value = namesToValues[name];
        enumeration[name] = e; // 设置为构造函数的属性
        enumeration.values.push(e); // 将它存储到值数组中
    }

    // 返回标志这个新类型的构造函数
    return enumeration;
}


/**
 * 通过原型继承创建一个新对象
 * @param p 是原型对象
 * @returns 返回一个继承于原型对象p的属性的新对象
 */
function inherit(p) {
    // p 是一个对象，但不能是null
    if(p == null) {
        throw TypeError();
    }
    // 如果Object.create()存在
    // create 函数按照指定的原型创建一个新对象。
    if(Object.create) {
        // 直接使用它
        return Object.create(p);
    }
    var t = typeof p;
    if(t !== 'object' && t !== 'function') {
        throw TypeError();
    }
    // 定义一个空的构造函数
    function F() {};
    // 将其原型属性设置为p
    F.prototype = p;
    // 使用f()创建p的继承对象
    return new F();
}







































