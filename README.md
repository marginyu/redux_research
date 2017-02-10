# redux_research
redux原理探究


redux类似包装器，顶层有个数据集，通过props一层一层往下传递

主要使用了装饰者模式和订阅者模式

使用了lodash工具库


参考链接:http://dev.ancii.com/a/6i17585.html Redux 卍解


1.Store如何接收来自Views的Action?

2.Store在接收到Action之后，需要根据Action.type和Action.payload修改存储数据，那么，这部分逻辑写在哪里，且怎么将这部分逻辑传递给Store知道呢？

3.Store通过Reducer修改好了内部数据之后，又是如何通知Views需要获取最新的Store数据来更新的呢？

在observes.js里,通过调用setState来进行组件的更新.更改了包装组件的state,然后更改了实际组件的props.


发布者
订阅者列表
订阅者回调函数

createDispathcer.js  observeStores(订阅或者退订)方法被observes.js调用


如何在浏览器里查看调用堆栈,跟踪代码的逻辑走向?


1.redux 原理图
2.观察者模式
3.lodash的某些方法