# googlecn
A free and unlimited API for Google Translate in China mainland

git clone https://github.com/duyongguang/googlecn.git

var translate = require('googlecn');
translate('this is China.', {from: 'en', to: 'zh-CN'}).then(result => {
        console.log(result);
}).catch(error => {
        console.log(error);
}); 
