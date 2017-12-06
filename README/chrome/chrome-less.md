# 利用chrome来调试less文件

## Working With LESS and the Chrome DevTools

https://code.tutsplus.com/tutorials/working-with-less-and-the-chrome-devtools--net-36636

DevTools already has write access to your development folder (through Workspaces). Command/Control-S your changes in the Sources panel to have DevTools overwrite the source LESS file with your new change, Grunt compiles a new CSS file which DevTools pulls in and applies to the page.

## 用到的插件

* vscode --- Easy LESS
* vscode --- browsersync


## 剩下迫切需要解决的问题

* 图床的问题 最好是能利用github作为图床，因为比较靠谱

https://www.bilibili.com/video/av9698681/ 利用github 搭建图床，外加绑定地址；

![组件监控图](./images/4组件监控.jpg)

> 其实问题被自己想的太复杂了，自己利用图床的目的就是，写markdown文件，而markdown不但可以引用http开头的绝对路径图片，其也可以引用相对路径的本地图片，类似于html文件一样，如同书写html一样，将图片单独放到一个文件夹，而后在md文件中引用，而后将整个workspace提交到git上面就可以了，文件与md文件同处一个环境，且无论是在gtihub线上 还是在本地 都可以正常的预览；

* 无密码提交git的问题，已经反复的出现多次了；

* 明日迫切要解决的问题，云朵的移动问题；

可以将云朵视为一类对象，而云彩的移动的是对象的方法；
而云朵 都是通过jquery来获取的，获取的结果都是jquery对象，也就是说，可以将云朵移动的方法添加到jquery的实例方法上面去，而后每朵云彩统一去调用这个方法； 这是最简单的一种方法；

方式二就是 利用构造函数 去构建 云彩的类； 然后添加原生的方法，然后统一实例化，统一调用云朵移动的方法； 明天可以研究一下；

利用构造函数的思想，去改造自己的页面；如气球与飞机就是一类； 两者有不同之处，可以通过传option来讲这个不同之处 抵消掉；