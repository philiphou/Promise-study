// 封装自己定义的 Promise，  首先在全局中，把 window 里的 Promise() 替换掉： 只需要在全局中声明一个新的 Promise() 函数：
function Promise(executor) {
    // 给 Promise 添加属性： 
    this.PromiseState = 'pending' // 默认起始值
    this.PromiseResult = null // 默认值
        // 声明一个属性：用来在下面保存.then中的回调函数; 为了实现 p.then() 方法可以重复使用以调用多个回调函数，我们应该把回调函数保存在数组中，防止后面的回调将前面的回调函数覆盖；
    this.callbacks = [];

    // 保存实例对象的this 值 
    const self = this;
    //  声明 resolve 和 reject  函数： 
    function resolve(value) {
        //  resolve 函数执行时候作用就是： 1. 改变promisez状态，s属性名：PromiseState, 属性值由pending改为 fulfilled, 
        //2. 设定 promise的 result; 属性名：PromiseResult, 属性值为给形参value传入的实参 
        // 为了保证 resolve或者 reject 只能被执行一个，也就是 promise的对象只能被改变一次，我们先要判断 promise 的状态是否被改过了：
        if (self.PromiseState !== "pending") return
        self.PromiseState = 'fulfilled'; // 为了避免直接使用this,导致this指向全局window， 所以我们预先保存实例对象的this 值,保存在 变量 self 中；
        self.PromiseResult = value;
        // 执行成功状态下 。then 中的 成功回调函数： 注意 是调用所有的对应相应状态的回调函数
        self.callbacks.forEach(item => {
            item.onResolved(self.PromiseResult)
        })
    }

    function reject(reason) {
        //  reject 函数执行时候作用就是： 1. 改变promisez状态，属性名：PromiseState, 属性值由pending改为 rejected, 
        //2. 设定 promise的 result; 属性名：PromiseResult, 属性值为给形参value传入的实参 
        // 同理，为了使promise状态只能被改变一次：
        if (self.PromiseState !== "pending") return
        self.PromiseState = 'rejected';
        self.PromiseResult = reason;
        // 执行失败态下 。then 中的 失败回调函数： 
        self.callbacks.forEach(item => {
            item.onRejected(self.PromiseResult)
        })
    }

    //  抛出异常也可以改变promise 的状态，由 pending 变为 rejecetd; 利用 try{}catche(e){} 来捕捉 throw 的错误； 
    try {
        //  同步调用执行器函数：
        executor(resolve, reject)
    } catch (e) {
        //   修改 promise的状态： 
        reject(e)

    }


}
//  为了让新构建的 promise 实例对象可以调用。then 方法，我们来给自己的Promise()添加 .then()方法：
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数：
    if (this.PromiseState === "fulfilled" || this.PromiseState === "resolved") {
        onResolved(this.PromiseResult)
    }
    if (this.PromiseState === "rejected") {
        onRejected(this.PromiseResult)
    }
    // 为了使promise 实例对象中的异步操作完成再执行。then(), 我们继续加一种情况，promise.state 是pending的时候： 
    if (this.PromiseState === "pending") {
        // 保存回调函数，然后在 promise 的执行器函数中当执行器函数调用完毕，promise状态改变时候，执行这个 .then中的回调函数
        // 最好将这个回调函数保存在Promise 类上；所以我们回去到构造函数 Promise中加入一个属性： this.callback
        this.callbacks.push({ onResolved, onRejected }) // 此处作了简写，如果键名和键值相同，可以简写成一个
    }
}