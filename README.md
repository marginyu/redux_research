# redux_research
redux原理探究


redux类似包装器，顶层有个数据集，通过props一层一层往下传递

主要使用了装饰者模式和订阅者模式

使用了lodash工具库