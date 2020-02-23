const tool = {
    // 圣杯继承，继承原型
    inherit(target,oringe){
        const F = function () {};
        F.prototype = oringe.prototype;
        target.prototype = new F();
        target.prototype.constructor = target;
    },
    // 继承私有属性和原型并放回一个构造函数
    extends(oringe){
        const result = function (...arg) {
            // 继承私有属性
              oringe.call(this,...arg);
              return this
        }
        this.inherit(result,Square);
        // 返回一个构造函数
        return result;
    },
    // 构造一个单例模式,调用此函数可以得到一个单例构造函数
    single(oringe){
        const result = (function () {
            let newObj = null;
            return function (...arg) {
                if(newObj != null){
                    return newObj;
                }
                oringe && oringe.call(this,...arg)
                newObj = this;
            }
        })()
        oringe && this.inherit(result,oringe)
        return result;
    }

}

