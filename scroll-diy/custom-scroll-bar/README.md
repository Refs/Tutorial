# custom-scroll-bar
custom-scroll-bar bases on imooc
Demo online https://841660202.github.io/custom-scroll-bar/

## 代码组织思路，以及代码的组织方式；

* 创建一个构造函数CusScrollBar

* 通过new操作符来实例化这个构造函数 ，在实例化的过程中会调用构造函数的初始化函数_init ,这个函数是一个统一的初始化入口；

```js
var Scroll = {};

//1. 创建一个自调用的匿名函数，函数在调用的过程中会传入三个实参；
(function (win,doc,$){
    //2. 创建一个构造函数 构造函数有一个形参options,用来在实例化的时候，传入一些配置信息；再为构造函数的原型上添加属性与方法，如此其所有的实例就会去共享这些实例与方法；而_init()入口函数应为其所有的实例所共享，所以此处我们这个入口函数方法，定义到构造函数的额原型的原型函数上面； 
    function CusScrollBar(options){
        // 3. 我们要在初始化的时候去调用这个示例方法，所以我们就在构造函数体中直接调用_init方法，这样在创建实例时就会直接被调用；此处我们直接调用_init方法，并将配置项options当作实参传到函数中去；
        this._init(options);

    }
    CusScrollBar.prototype._init = function(){

    }
  
    //4、 我们的构造函数是在匿名函数内部定义的，所以在外面是访问不到构造函数的，即在匿名函数外部是无法通过new操作符来实例化这个构造函数的；一般的解决办法是创建一个全局的对象，将构造函数作为这个全局对象的一个属性方法；然后示例化的时候，直接利用new操作符来实例化这个全局变量的属性方法就可以了； 其实有一个默认的全局对象window，即我们可以直接将构造函数方法放到win的属性中 但是在项目中为了避免冲突我们不建议使用；
    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)

    // 实例化全局对象的构造函数方法；
    new Scroll.CusScrollBar();
```

* 利用$.extend()方法来优化我们的代码；

```js
var Scroll = {};

(function (win,doc,$){
    function CusScrollBar(options){
        this._init(options);

    }
    // CusScrollBar.prototype._init = function(){
    // }
    // 我们现在要做的实际上就是向CusScrollBar.prototype上面去添加属性以及方法；而利用extend方法将可以将传入对象的属性与方法给merge到原型队形当中去，我们将_init方法放在传入对象的属性上面；
    $.extend(CusScrollBar.prototype,{
        // 这样extend方法返回的结果，就是会向CusScrollBar.prototype对象上添加一个_init方法；
        _init:function(){

        }
    })

    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)

    new Scroll.CusScrollBar();
```

## jquery交互初始化操作的实现；

```js
var Scroll = {};

(function (win,doc,$){
    function CusScrollBar(options){
        this._init(options);

    }
  
    $.extend(CusScrollBar.prototype,{
        _init:function(options){
            //1、 将this存放在slef变量内，目的是为了防止this的混用；
            var self = this;
            // 2、 指定一些默认的属性，这些属性以自变量的方式存放在self.options的属性中；
            self.options = {
                scrollDir : "y",
                contSelector : "",
                barSelector : "",
                sliderSelector : ""
            //3、 后面三个选择器并没有传值，需要等到具体实例化的时候，将值传输进去； 具体实现还是通过jquery的extend方法；
            }

            //4、 true意思是执行深 copy ， self.options合并的目标对象， options 函数调用的时候传入的配置项参数,为保持程序的健壮性可以传入一个空对象；  这样我们在实例化的时候就可以将配置项传进去；
            $.extend(true, self.options, options||{});
        }

        // 7、在对象的原型上面添加属性与方法，就会被其实例化对象所共享，而在此处给self(this)添加属性与方法时，就会在每个实例上创建一遍，而这些属性在每一个实例之间是独立的；
    })

    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)

    new Scroll.CusScrollBar({
        //5、实例化传入的配置项会被合并到_init 函数的options对象中去；
        contSelector : ".scroll-wrap",
        barSelector : ".scroll-bar",
        sliderSelector : ".scroll-slider"
    });
```

## 拖动滑块内容滚动的思路；

```js
var Scroll = {};

(function (win,doc,$){
    function CusScrollBar(options){
        this._init(options);

    }
    // CusScrollBar.prototype._init = function(){
    // }
    // 我们现在要做的实际上就是向CusScrollBar.prototype上面去添加属性以及方法；而利用extend方法将可以将传入对象的属性与方法给merge到原型队形当中去，我们将_init方法放在传入对象的属性上面；
    $.extend(CusScrollBar.prototype,{
        // 这样extend方法返回的结果，就是会向CusScrollBar.prototype对象上添加一个_init方法；
        _init:function(){

        }
    })

    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)

    new Scroll.CusScrollBar();
```

## jquery交互初始化操作的实现；

```js
var Scroll = {};

(function (win,doc,$){
    function CusScrollBar(options){
        this._init(options);
    }
  
    $.extend(CusScrollBar.prototype,{
        _init:function(options){
            var self = this;
            self.options = {
                scrollDir : "y",
                contSelector : "",
                barSelector : "",
                sliderSelector : ""
            }

            $.extend(true, self.options, options||{});
            // 在_init函数中来调用dom引用函数
            self._initDomEvent();

            return self;
        }

        //1、 我们新增一个函数 _initDomEvent 来初始化Dom引用， 并且在_init函数中去调用这个函数，而这样做的目的是dom的引用更加容易使用；而不用在使用dom的时候编辑那么一长串$(opts.sliderSelector);

        _initDomEvent : function (){
          var opts = this.options;
          this.$cont = $(opts.contSelector);
          this.$slider = $(opts.sliderSelector);
          this.$bar = opts.barSelector ?  $(opts.barSelector) : self.$slider.parent();
          this.$doc = $(doc);
          
        //   8、在 _initDomEvent 内部直接调用 _initSliderDragEvent
          this._initSliderDragEvent();
        }

        // 2、 我们增加另外一个方法，初始化滑块的拖动功能；因为定义的这些方法，统一都是实例上的额方法，即调用都是实例在调用，this也是统一指向实例； 

        _initSliderDragEvent : function (){
            //3 、 将选择器存入一个更短的变量，方便在方法中去使用；
            var slider = this.$slider;
            var sliderEl = slider[0];

            if(sliderEl){
                //4、因为只有sliderEl对象存在，下面的变量才有定义的必要，所以放到if判断语句中；
                var doc = this.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;
                slider.on("mousedown", function(e){
                    //5、 此处应该注意，此处的事件对象e，是经jquery封装后的事件对象，因为原生事件对象在不同的浏览器之间有很大的差异，所以jquery的原生的事件对象进行了封装和修正，统一了事件对象的属性与方法；我们就可以直接使用jquery事件对象，而不用考虑其兼容性；

                    // 6、因为事件的，默认行为 往往会产生许多不可预测的效果；所以我们通过preventDefault来将事件的默认行为给阻止掉；
                    e.preventDefault();

                    // 7、 将mousemove绑定到document上面，这样做的目的是当我们按下鼠标拖动滑块，鼠标移出滑块范围的时候，还可以持续的触发mousemove事件；
                    doc.on("mousemove.scroll",function(e){

                    }).on("mouseup.scroll",function(e){
                        // 9、松开鼠标的时候，去解除事件的绑定；
                        doc.off("mousemove.scroll mouseup.sroll");
                    })

                    // 10、但是我们这样做会将doc上绑定的所有mousemove与mouseup事件解除绑定，即这样做会存有一定的风险；解决办法是利用jquery的事件命名空间；
                })
            }
        }
    })
    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)
    new Scroll.CusScrollBar({
        contSelector : ".scroll-wrap",
        barSelector : ".scroll-bar",
        sliderSelector : ".scroll-slider"
    });
```


## 拖动滑块内容滚动的实现；

```js
var Scroll = {};

(function (win,doc,$){
    function CusScrollBar(options){
        this._init(options);
    }
  
    $.extend(CusScrollBar.prototype,{
        _init:function(options){
            var self = this;
            self.options = {
                scrollDir : "y",
                contSelector : "",
                barSelector : "",
                sliderSelector : ""
            }

            $.extend(true, self.options, options||{});
            self._initDomEvent();

            return self;
        },


        _initDomEvent : function (){
          var opts = this.options;
          this.$cont = $(opts.contSelector);
          this.$slider = $(opts.sliderSelector);
          this.$bar = opts.barSelector ?  $(opts.barSelector) : self.$slider.parent();
          this.$doc = $(doc);
        //   12. 初始_bindContScroll();
          this._initSliderDragEvent()._bindContScroll();
        },


        _initSliderDragEvent : function (){
            var slider = this.$slider;
            var sliderEl = slider[0];

            if(sliderEl){
                
                // 7、 mousedown事件的处理函数，
                 function mousemoveHandler(e) {
                    e.preventDefault();
                    console.info("mousemove");
                    //  dragStartPagePosition == null 就代表并没有在滑块上按下鼠标，如果有具体的值就接着向下走；
                    if (dragStartPagePosition == null) {
                        return;
                    }
                    // 8、自定义了一个方法scrollTo  方法内的表达式就是用来表示内容的滚动高度，
                    self.scrollTo((e.pageY - dragStartPagePosition) * dragContBarRate);
                }


                var doc = this.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;

                function 
                slider.on("mousedown", function(e){
                    e.preventDefault();
                    // 1、获取事件发生时，鼠标相对与文档的坐标；
                    dragStartPagePosition = e.pageY;
                    // 2、鼠标按下时，内容有可能已经移出了可视区域上边界一定的距离；所以我们按下鼠标的时候，需要去存储这个距离，我们可以利用dom元素属性的scollTop来获取这个值；
                    dragStartScrollPosition = self.$cont[0].scrollTop;

                    // 3、存储内容可滚动高度与滑块可移动距离的比值
                    dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();

                    // 6、鼠标移动的时候我们来计算内容的滚动高度，根据内容的滚动高度，来设置内容的滚动位置； 此处我们将mousedown的时间处理函数拿出来，作为一个方法mousemoveHandler
                    doc.on("mousemove.scroll",mousemoveHandler)
                        .on("mouseup.scroll",function(e){
                        doc.off("mousemove.scroll mouseup.sroll");
                    })
                })
            }
            // 将this返回 以可以使用链式调用；
            return self; 
        },

         //4、内容可滚动的高度 = 整篇文档的高度 - 内容可视区的高度； 
        getMaxScrollPosition: function () {
            var self = this;
            // console.info(self.$cont.height())
            // console.info(self.$cont[0].scrollHeight)
            // 5、 若内容的整体高度 小于可视区的高度 我们就要去取可视区的高度(self.$cont.height())
            return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
        },

        //5、 滑块可移动的距离 = 滚动条的高度 - 滑块的高度；
        getMaxSliderPosition: function () {
            var self = this;
            return self.$bar.height() - self.$slider.height();
        },
        // 9、滚动方法，滚动到指定的位置； 此时内容会跟着滚动，但是滑块不会去滚动； 创建一个方法，用来监听可视区内容的滚动，并同步滑块的位置；
        scrollTo: function (positionVal) {
            var self = this;
            self.$cont.scrollTop(positionVal);
        },
        // 10、监听可视区内容的滚动，同步滑块的位置：
        _bindContScroll: function () {
            var self = this;
            self.$cont.on("scroll", function () {
                var sliderEl = self.$slider && self.$slider[0];
                // 首先获取一下滑块的元素，如果滑块是存在的，就计算一下滑块的位置；滑块的位置实际上就是滑块的移动距离；当我们获取了内容滚动高度，滑块可移动距离，内容可滚动高度，就能根据 滚动的比例关系，来求得滑块的移动距离，从而确定滑块的位置；getSliderPosition
                if (sliderEl) {
                    sliderEl.style.top = self.getSliderPosition() + "px";
                }
            });
            return self;
        },
        //  11、 计算滑块当前的位置
        getSliderPosition: function () {
            var self = this;
            MaxSliderPosition = self.getMaxSliderPosition();
            // 我们取最小值的目的是限制滑块只在滚动条上面移动；
            return Math.min(MaxSliderPosition, MaxSliderPosition * self.$cont[0].scrollTop /
                self.getMaxScrollPosition());
        },
    })
    Scroll.CusScrollBar = CusScrollBar;
})(window,document,jQuery)
    new Scroll.CusScrollBar({
        contSelector : ".scroll-wrap",
        barSelector : ".scroll-bar",
        sliderSelector : ".scroll-slider"
    });
```