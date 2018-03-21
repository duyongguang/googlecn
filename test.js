var translate = require('./index.js');
translate('this is China.', {from: 'en', to: 'zh-CN'}).then(result => {
        console.log(result);
}).catch(error => {
        console.log(error);
}); 