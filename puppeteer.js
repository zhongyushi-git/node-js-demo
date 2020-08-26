/**
 * 输入网址和保存路径，把网页保存为pdf
 */
var puppeteer = require('puppeteer')
var readline = require('readline')
var path = require('path')
var fs = require('fs')

var util=require('./util')

//指定从终端读取和输入内容
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
//发送请求
rl.question('请输入要保存pdf的网址：', url => {
    rl.question('请输入保存pdf的路径：', fpath => {
        dirExists(fpath)
        savePdf(url, fpath)
    })

})
//关闭时结束进程
rl.on('close', () => {
    process.exit(0)
})
function dirExists(fpath) {
    //判断目录是否存在
    fs.exists(fpath, (exist) => {
        if (!exist) {
            console.log('>>>目录不存在,正在创建...')
            //创建目录
            fs.mkdir(fpath, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log(`>>>目录${fpath}创建完成`)
                }
            })
        }
    })
}

//异步保存为pdf
async function savePdf(url, filepath) {
    console.log('>>>正在保存为pdf,请稍后...')
    var option = {
        //设置视窗的大小
        defaultViewport: {
            width: 1920,
            height: 1096
        }
    }
    if (url == null || url == '') {
        console.log('>>>无效网址，程序已退出！')
        rl.close()
        return
    }
    //创建browser的实例
    const browser = await puppeteer.launch(option)
    //打开新页面
    const page = await browser.newPage()
    let filename = util.generateTimeReqestNumber()
    filepath = path.join(filepath, filename + '.pdf')
    //访问页面
    await page.goto(url)
    //把当前页面保存为pdf,只能在headless为true时调用
    await page.pdf({ path: filepath, format: 'A4' })
    //关闭浏览器实例
    await browser.close()
    //当没有输入保存路径，返回的就是相对路径
    if (!path.isAbsolute(filepath)) {
        filepath = path.join(__dirname, filepath)
    }
    console.log('>>>恭喜你，保存成功。文件路径为：' + filepath)
    //关闭终端
    rl.close()

}



