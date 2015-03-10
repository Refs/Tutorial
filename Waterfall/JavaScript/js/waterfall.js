
window.onload=function(){

// js要解决的问题是：我们要让第二行的图片，根据第一行图片的高度，计算第二行的每张图片，应该出现在那些位置；

    waterfall('main','pin');

    
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    //9、 拖动滚动条来加载图片；
    window.onscroll=function(){
        // 9.1 检查一下拖动后是否具备加载的条件； 我们检测一定是最后一个数据块的位置；根据其来判断是否具备加载条件；

        //9.2加载时机 滚动条向下走20px 页面就会向上偏离窗口顶部20px; 如果最后一张图片还没有到浏览器的可视区域之内，则不具备加载条件，当最后一张图片在浏览器视口内高度露出一半的的时候，就开始加载；或者最后一张图片一露面的时候就开始去加载；
        // 9.3 即当最后一个数据块的offsetTop（数据块顶部相对与页面顶部的距离有可能不是offfsetTop,需要从新计算）加上数据块高度的一半 小于 浏览器视口的宽度加上滚动条滚动距离的时候，就可以进行加载了；
        if(checkscrollside()){

            // 9.4 线程进入到此处 说明 已经可以进行数据加载了， 而加载的数据都是从后台来的；如后台返回给我们一个dataInt json对象（里面一般会包含图片的名称以及路径信息），而我们要做的就是将这个对象中的数据渲染到我们的html当中；
            var oParent = document.getElementById('main');// 父级对象
            for(var i=0;i<dataInt.data.length;i++){
                var oPin=document.createElement('div'); //添加 元素节点
                oPin.className='pin';                   //添加 类名 name属性
                oParent.appendChild(oPin);              //添加 子节点 到父元素的最后面；
                var oBox=document.createElement('div');
                oBox.className='box';
                oPin.appendChild(oBox);
                var oImg=document.createElement('img');
                oImg.src='./images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            // 后面加载的图片，只是简单的被加载到页面之中，其并没有通过waterfall，来计算位置；
            waterfall('main','pin');
        };
    }
}

/*
    parent 父级id
    pin 元素id
*/
// 该函数的目的在于，使图片出现在其应该出现的位置；
function waterfall(parent,pin){
    // 1、将parent下的所有class为 pin的元素取出来；
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getClassObj(oParent,pin);// 获取存储块框pin的数组aPin

    // 2、 计算当前页面显示的劣俗；因为横向是采用浮动布局的，所以页面显示的列数是会随页面宽度的变化而发生改变的，（页面宽/每一个盒子的宽）
    var iPinW=aPin[0].offsetWidth;// 一个块框pin的宽
    var num=Math.floor(document.documentElement.clientWidth/iPinW);//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】

    // 3、虽然算了列数，但当浏览器窗口发生变化的时候，列数还是在变化的，原因就是外面的大盒子，没有宽度，所以大盒子的宽度，会随浏览器窗口的变化而变化，而列数也自然会发生变化（因为列是浮动的，宽度不够的时候就会跑到下面去），所以此时应将外面大盒子的宽度定死； 此外也应该使外层外层大盒子居中； 
    oParent.style.cssText='width:'+iPinW*num+'px;margin:0 auto;';//设置父级居中样式：定宽+自动水平外边距
 
    // 4、使图片出现在其应该出现的位置；第一排是不需要去做定位的，而第二排的第一张会出现在第一排中高度最小的数据块的下面；第二张、第三张以此去类推； 也就是说我们需要知道第一行当中那一数据块是最矮的；解决的方式是去创建是个数组，刚开始这个数组将第一行所有数据块的高度都放进去，随后这个数组就会被修改为每一列的高度；

    var pinHArr=[];//用于存储 每列中的所有块框相加的高度。
    for(var i=0;i<aPin.length;i++){//遍历数组aPin的每个块框元素
        var pinH=aPin[i].offsetHeight;
        // 5、刚开始数组中存放的第一行每个数据块的高；而第一行的列数是已知的；
        if(i<num){
            pinHArr[i]=pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            // 6、接下来要解决的是要将第7张图片放在第一行最矮的图片下面；即其位置是由数组中最小的值（等于top）与最小值在数组中的索引（可以计算left）来确定的；
            var minH=Math.min.apply(null,pinHArr);//数组pinHArr中的最小值minH
            // 7、利用函数获取最小值在数组中的索引；
            var minHIndex=getminHIndex(pinHArr,minH);
            aPin[i].style.position='absolute';//设置绝对位移
            aPin[i].style.top=minH+'px';
            aPin[i].style.left=aPin[minHIndex].offsetLeft+'px';
            //8、修改一下数组，否则所有的图片都会叠加在，第一行最矮数据块的下面；数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/****
    *通过父级和子元素的class类 获取该同类子元素的数组
    */
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
/****
    *获取 pin高度 最小值的索引index
    */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

// 检测滚动是否具备加载数据块的条件；
function checkscrollside(){
    var oParent=document.getElementById('main');
    var aPin=getClassObj(oParent,'pin');
    var lastPinH=aPin[aPin.length-1].offsetTop+Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//页面滚走的距离，注意解决兼容性 
    var documentH=document.documentElement.clientHeight||document.body.clientHeight;//当前浏览器可视区域的高度
    return (lastPinH<scrollTop+documentH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
}