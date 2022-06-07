const fs = require('fs')
    // fs.readFile("./resource/paragraph.md", (err, data) => {
    //     if (err) throw err;
    //     console.log(data.toString())
    // })

//  切换成使用promise封装的读取方法：
let p = new Promise((resolve, reject) => {
        fs.readFile("./resource/paragraph.md", (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);

        })

    }

)



p.then((value) => {
    console.log(value.toString())
}, (err) => {
    console.log(err)
})