# 启迪-罗湖双创赛比分公示系统前端文档

## 简介
项目基于`HTML`、`CSS`、`JavaScript`、`Bootstrap`等技术栈，完成甲方所需的系统前端展示需求。

## 项目架构
1. 根据甲方需求，前端包括四个页面，且存放于根路径：

   - `/index.html` - 报名/成绩查询页
   - `/login.html` - 登录页
   - `/management.html` - 成绩管理页
   - `/result.html` - 成绩公示页

2. 样式基于`Bootstrap 5`，详细内容请参考[官网](https://v5.bootcss.com/docs/getting-started/introduction/)

3. `JavaScript`文件存放在`/js`目录下。除开四个页面均有对应的`js`脚本，另有`/js/common.js`和`/js/form.js`，作用分别是前端页面通用函数和表单相关通用函数。

## 几个重要的代码逻辑
1. 为了便于通用函数的使用，表单节点需要一个当前页面唯一的`id`: `id="form"`。
2. 所有用户输入的表单项，均需要添加`[data-key=xxx]`自定义属性，以便表单通用函数取值。自定义属性的值建议与后端接口中的字段相同，以便前端对接接口。
3. `/js/common`中的`config`字段，用于在不同环境下的全局配置。
