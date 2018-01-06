# 这是一个vue的项目


## 用(传统方式)命令行把修改过后的代码上传到git
1. git add .
2. git commit -m "提交信息"
3. git push

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 Tabbar.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把 扩展图标的 css 样式，拷贝到 项目中
 + 拷贝 扩展字体库 ttf 文件，到项目中
 + 为 购物车 小图标 ，添加 如下样式 `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在 中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对应的路由组件,添加组件切换动画
1. 使用vue-router, 配置路由规则
2. 组件切换动画
 + v-enter, v-leave-to 分别添加偏移+ - 100%
 + 容器添加overflow-x: hidden; 解决横向滚动条
 + v-leave-to中添加position: absolute 组件离开不占文档流,更流畅


## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据, 使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 身上
4. 使用 v-for 循环渲染 每个 item 项

## 改造 九宫格 区域的样式
1. 使用的是 MUI 中的九宫格组件

## 改造 新闻资讯 路由链接

## 新闻资讯 页面 制作
1. 绘制界面， 使用 MUI 中的 media-list.html
2. 使用 vue-resource 获取数据 并v-for 渲染到新闻资讯页面中

## 实现 新闻资讯列表 点击跳转到新闻详情
1. 把列表中的每一项改造为 router-link,同时，在跳转的时候应该提供唯一的Id标识符
2. 创建新闻详情的组件页面  NewsInfo.vue
3. 在 路由模块中，将 新闻详情的 路由地址 和 组件页面对应起来

## 实现 新闻详情 的 页面布局 和数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个 单独的 comment.vue 组件模板
2. 在需要使用 comment 组件的 页面中，先手动 导入 comment 组件
 + `import comment from './comment.vue'`
3. 在父组件中，使用 `components` 属性，将刚才导入 comment 组件，注册为自己的 子组件
4. 将注册子组件时候的注册名称，以 标签形式，在页面中 引用即可

## 获取所有的评论数据显示到页面中
+ getComments

## 实现点击加载更多评论的功能
1. 为加载更多按钮，绑定点击事件，在事件中，请求 下一页数据
2. 点击加载更多，让 pageIndex++ , 然后重新调用 this.getComments() 方法获取最新一页的数据
3. 为防止 新数据 覆盖老数据的情况，在点击加载更多的时候，每当获取到新数据，让 老数据 调用 数组的 concat 方法，拼接上新数组

## 发表评论
1. 把文本框做双向数据绑定  v-model
2. 为发表按钮绑定一个事件
3. 校验评论内容是否为空，如果为空，则Toast提示用户 评论内容不能为空
4. 通过 vue-resource 发送一个请求，把评论内容提交给 服务器
5. 当发表评论OK后，重新更新列表，以查看最新的评论
 + 此时如果调用 getComments 方法重新刷新评论列表，可能只能得到 最后一页的评论
 + 换一种思路： 当评论成功后，在客户端，手动拼接出一个 最新的评论对象，再 调用 数组的 unshift 方法， 把最新的评论，追加到  data 中 评论列表数据 的开头；这样，就能 完美在页面上实现刷新评论列表的需求；

## 改造图片分析 按钮为 路由的链接并显示对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
 1. 制作 顶部的滑动条
 2. 制作 底部的图片列表
### 制作顶部滑动条的坑：
 1. 需要借助于 MUI 中的 tab-top-webview-main.html 
 2. 需要把 slider 区域的 mui-fullscreen 类去掉
 3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下：
  + 导入 mui.js 调用官方提供的 方式 去初始化;
  + 初始化 滑动条 并正常工作，必须要等 DOM 元素加载完毕，所以，在 mounted 生命周期函数中初始化；
  ```
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  ```
 4. 在初始化 滑动条 的时候，导入的 mui.js ，但是，控制台报错： `Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode`
  + 经过合理的推测，可能是 mui.js 中用到了 'caller', 'callee', and 'arguments' 东西，但是， webpack 打包好的 bundle.js 中，默认是启用严格模式的，所以，这两者冲突了；
  + 解决方案： 1. 把 mui.js 中的 非严格 模式的代码改掉；但是不现实； 2. 把 webpack 打包时候的严格模式禁用掉；
  + 最终，我们选择了  移除严格模式： 下载使用这个插件 babel-plugin-transform-remove-strict-mode 并在.babel 文件中配置 plugins 属性
 5. 当 滑动条 调试OK后, tabbar 无法正常工作，推测 mui 中tabbar的样式名`mui-tab-item` 与滑动条有冲突, 此时，我们需要把 每个 tabbar 按钮的 样式中  `mui-tab-item` 重新改一下名字, 将原样式复制到新的样式名中 再应用到标签中；
 6. 获取所有分类，并在滑动条中渲染 分类列表； 
取消谷歌浏览器中滑动条滑动时的警告 * { touch-action: pan-y; }

### 制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用 Mint-UI 提供的现成的 组件 `lazy-load`, 若是按需引入 懒加载的圆圈图标不显示, 建议完整导入Mint-UI
2. 根据`lazy-load`的使用文档，尝试使用
3. 渲染图片列表数据  

### 实现了 图片列表的 懒加载改造和 样式美化
1. 为分类 绑定 tap 事件
2. 获取分类图片 渲染页面

## 实现了 点击图片 跳转到 图片详情页面
1. 在改造 li 成 router-link 的时候，需要使用 tag 属性指定要渲染为 哪种元素

## 实现 详情页面的布局和美化，同时获取数据渲染页面

## 实现 图片详情中 缩略图的功能
1. 使用 插件 vue-preview 这个缩略图插件 在入口文件中引入
2. 获取到所有的图片列表，然后使用 v-for 指令渲染数据
3. 注意： img标签上的class不能去掉
4. 注意： 每个 图片数据对象中，必须有 w 和 h 属性, 若获取的数据中没有, 需要遍历数据每一项, 添加 w 和 h 属性

## 绘制 商品列表 页面基本结构并美化

