#redux原理探究


redux类似包装器，顶层有个数据集，通过props一层一层往下传递

主要使用了装饰者模式和订阅者模式

使用了lodash工具库


1.Store如何接收来自Views的Action?

2.Store在接收到Action之后，需要根据Action.type和Action.payload修改存储数据，那么，这部分逻辑写在哪里，且怎么将这部分逻辑传递给Store知道呢？

3.Store通过Reducer修改好了内部数据之后，又是如何通知Views需要获取最新的Store数据来更新的呢？

在observes.js里,通过调用setState来进行组件的更新.更改了包装组件的state,然后更改了实际组件的props.


发布者
订阅者列表
订阅者回调函数

createDispathcer.js  observeStores(订阅或者退订)方法被observes.js调用


如何在浏览器里查看调用堆栈,跟踪代码的逻辑走向?


1.redux 原理图  http://images2015.cnblogs.com/blog/593627/201604/593627-20160418100233882-504389266.png
2.观察者模式
3.lodash的某些方法

mapValues 方法,类似ES6的map方法,遍历对象的属性,返回新对象  http://lodashjs.com/docs/#_mapvaluesobject-iteratee_identity-thisarg
pick 方法,挑选对象的属性,剔除掉某些属性,返回新对象 http://lodashjs.com/docs/#_pickobject-predicate-thisarg
identity方法,感觉是个没啥意义的方法,没有做任何处理 http://lodashjs.com/docs/#_pickobject-predicate-thisarg


包装层次 dispatcher>performs(需要dispatch的getActions方法)>observes(需要dispatch的observeStores方法)

dispatcher.receive方法将CounterAction和CounterReducer连接了起来

观察者模式在createDispathcer里实现

设计思想


http://mp.weixin.qq.com/s/nA2M2QznULKavQgHUFGsAQ   Thingking in Redux（如果你只了解MVC）

store在Redux中很特别，在MVC中难以找和它等价的东西。但是不用担心。store是深藏在幕后被小心保管的东西，就像是一个容器，
存储了所有为state服务的reducer集合。它有一个方法来获得当前的状态，并且暴露出方法来订阅state的变动（使用“connect()”方法）。
这就是Redux允许你调用action，并能将它们像props一样传入组件的秘密了。


http://cn.redux.js.org/docs/api/Store.html  Redux中的Store

connect方法很关键

目前写得比较好的redux原理分析文章:
http://www.aliued.com/?p=3204 Redux 卍解
http://div.io/topic/1309 深入到源码：解读 redux 的设计思路与用法


 dispatch(BOOTSTRAP_STORE); 为什么初始化state值无效?
 因为执行的时机不对, 还没包裹好

 根据component生命周期打印日志来看应该可以追踪到问题

 redux设计理念:
 统一管理类react应用的数据, 状态管理器


 actionCreator是怎么产生的?

