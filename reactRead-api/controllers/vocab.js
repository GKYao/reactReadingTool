const readVocab=(req,res,db)=>{
    db.select('vocab').from('users')
    .where('id','=',req.body.id)
    .then(data=>{
                res.json(data);})
    .catch(err=>res.status(400).json('error finding vocab'))
}
const addVocab=(req,res,db)=>{
    db('users')                            
        .where('id', req.body.id)
        .update({
            vocab: db.raw('array_append(vocab, ?)', [req.body.word])
        })
        .then(data=>res.json(data)
        );
}

module.exports={
    readVocab:readVocab,
    addVocab:addVocab
}