### ======================== Promise Study Notes ====================================
# 基础： 
    - 抽象表达： 
        1. Promise 是一门新的技术（ES6规范）
        2. Promise 是 JS 中进行异步编程的新解决方案 （旧方案是单纯使用回调函数）
        3. 异步编程包括： 文件操作，数据库操作， AJAX 请求，SetTimeout 等；
            require('fs').readFile('./index.html',(err,data)=>{})
            $.get('/server',(data)=>{})
            setTimeout(()=>{},2000)
    - 具体表达： 
        1. 从语法上来说 Promise 是一个构造函数
        2. 从功能上说： Promise 对象用来封装一个异步操作，并可以获取其成功或失败的结果值
    - 支持链式调用，解决回调地狱问题
        1. 回调地狱就是回调函数嵌套调用，外部回调函数异步执行的结果是嵌套的回调执行的条件
        2. 回调地狱不便于阅读，不便于异常处理
    - 指定回调函数的方式更加灵活：
        1. 旧的JS： 必须在启动异步任务之前指定
        2. promise： 启动异步任务 ---> 返回 promise 对象 ------> 给 promise 对象绑定回调函数 （甚至可以再异步任务结束后指定/多个）
    - 
# Promise 对象状态属性介绍： 
    - PromiseState:  实例对象中的一个属性；属性值： pending, fulfilled/resolved, rejected;
    - pending 变为 resolved
    - pending 变为 rejected
    - 说明： 只有这2种，且一个promise对象状态只能改变一次，状态不能逆变换。 
# Promise 对象结果值属性介绍
    - PromiseResult： 是Promise实例对象的一个属性，存的是对象中封存的异步任务成功/失败的结果。 只有 resolve 和 reject  两个回调函数可以修改 promise对象的结果值
        1， resolve
        2. reject 
# Promise 的工作流程
    - 通过 new Promise() 创建一个 promise对象
    - 在promise实例对象中封装异步操作，
    - 如果异步操作成功了，则调用 resolve(data) 函数，否则调用 reject(err) 函数
    - 如果调用了 resolve() , 则promise对象的状态由pending 变成 resolved, 然后继续链式调用 .then()， 成功时候调用 .then 里的第一个回调函数（也叫成功的回调）
    - 如果调用了 reject() , 则promise对象的状态由pending 变成 rejected, 然后继续链式调用 .then()， 成功时候调用 .then 里的第二个回调函数（也叫失败的回调）
    - .then() 返回的也是一个新的 promise对象，可以继续链式调用；
# 