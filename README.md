# googlecn

模拟浏览器访问 https://translate.google.cn ，获取谷歌免费机翻结果

## 安装

npm install googlecn

## 用法

```js
var translate = require('googlecn');
translate('this is China.', {from: 'en', to: 'zh-CN'}).then(result => {
        console.log(result);
}).catch(error => {
        console.log(error);
}); 
```
