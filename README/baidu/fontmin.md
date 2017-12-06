# fontmin  利用js使用自定义的字体
http://ecomfe.github.io/fontmin/

http://efe.baidu.com/blog/fontmin-getting-started/

http://mini.eastday.com/mobile/160313173523935.html

http://www.jianshu.com/p/bd9d78e3e11a

> 坑点一：fontmin默认支持的是ttf字体，下载的字体若不是ttf格式的需要去转换，且就算下载的字体是ttf格式的也是需要去转换，否则fontmin会识别不了而使用默认的宋体，也就是说即使转换不成功也不是fontmin 的事情，而是字体格式的事情；解决方式是使用font creator打开后，导出

[use-font-creator](../images/use-font-creator.png)

> 坑点二，即使转为fontmin右侧面板上可以正常显示的样式，点击生成之后，生成的是字体源文件，而没有生成子集；

[use-font-creator2](../images/use-font-creator2.png)

在导出设置里面多调整调整；点击生成就可以了，使用起来和字体图标一样；

格式选择为ttf;再拉到font-min 就会发现可以正常的去转化；

## 字体转换软件
font creature 
软件地址：自己的百度云工具里面（mac-win7）
安装说明：http://www.pcsoft.com.cn/soft/21156.html



## 利用字蛛这个工具 需要用到grunt
https://github.com/aui/font-spider

http://www.jianshu.com/p/ef1280ebe91a


* 坑点
1、安装插件的时候npm要低于5.0版本，否则装不上

2、安装Python的2.X系列版本 来兼容插件

3、压缩字体的时候不要有英文和空格

4、自定义字体名称的时候不要和系统或者已有的字体名称有命名冲突

5、这里建议对需要替换大段文字的文本少使用字蛛，因为使用后这样你会发现在有标点和空格的地方会出现“!”。
> 解决方案：
> 1.可以利用标签嵌套标点的方法进行微调。
> 2.有网友说 写成 font-family:Arial +自己的字体，感叹号就会消失 （本人未亲自测试）。

[dh-view-title的字体](../resource/dh-view/造字工房尚黑G0v1粗体.rar)
[dh-view-number的字体](../resource/dh-view/MFJianHei_Noncommercial-Regular.ttf)
其它字体统一采用微软雅黑；


