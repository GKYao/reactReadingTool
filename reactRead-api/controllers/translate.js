const translate = require('google-translate-api');

const handleTranslate=(req,res)=>{
    console.log(req.body);
    translate(req.body.word, {to: 'zh-CN'}).then(data => {
        res.json(data.text);
    }).catch(err => {
        res.status(400).json(err)
    });
}

module.exports={
    handleTranslate:handleTranslate
}