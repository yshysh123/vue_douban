# vue_douban
# vue2.0 豆瓣电影WebApp #

使用vue2.0仿豆瓣电影app，根据豆瓣电影api对功能作了适当修改

api来源自豆瓣官方api，详情请戳豆瓣电影api

如果对您有帮助，可以点右上角 "Star" 支持一下 谢谢！

# 项目运行 #
clone项目源码
```
git clone https://github.com/yshysh123/vue_douban.git
```
安装依赖

```
cd vue-douban
npm install
```

运行
```
npm run dev
```

打开浏览器进入localhost:8000，在开发者工具的移动端模式下查看效果
# 项目描述 #

**技术栈**
vue2.0 + vue-router + vuex：vue全家桶

axios：用于ajax请求

vue-lazyload：用于图片懒加载

vue-scroller：移动端滚动库，优化移动端滚动效果

webpack： 构建工具

es6: 使用es6语法

使用localStorage存储收藏的电影信息,个人中心信息

**功能实现**

**上映电影部分**

 获取正在上映的电影信息和即将上映电影的信息
 电影信息滚动(底部)加载提高响应速度

**排行部分**

 获取所有可以从豆瓣api得到的排行榜
 查看排行榜详细，在排行榜中查看具体电影详细

**搜索部分(还没实现)**

 支持用户根据关键字搜索
 支持用户根据给出标签进行标签搜索(与输入与标签相同的关键字进行搜索不同)
 根据搜索结果查看电影详情
 查看搜索历史

**电影详情部分**

 获取电影所有的基础信息和评分信息
 获取电影的短评和长评，可查看该电影所有短评长评
 将电影标记为想看/看过

**用户中心部分**

 查看想看的电影
 查看看过的电影

# 项目布局 #

```
├─build                       // webpack配置文件
├─config                      // 项目开发环境配置相关代码   
├─src                         // 源码目录    
│  ├─assets                   // 公共资源 
│  │  ├─fonts                 // 图标字体
│  │  ├─img                   // 图片资源
│  │  └─css                   // css样式
│  ├─components               // 业务组件 
│  │  ├─login                 // 登陆组件
│  │  ├─main                  // 主页面组件
│  │  ├─movecommingsoon       // 电影即将上映组件
│  │  ├─movecon               // 电影详细内容组件
│  │  ├─moveshow              // 电影正在上映组件
│  │  ├─paihang               // 电影排行组件
│  │  ├─search                // 电影搜索组件
│  │  ├─tab                   // 电影底部切换组件
│  │  ├─topchange             // 电影定不切换组件
│  │  ├─user                  // 电影用户中心组件
│  │  ├─zhuce                 // 电影用户注册组件
│  ├─router                   // vue-router路由管理
│  └─store                    // vuex状态管理 
└─static 
```
