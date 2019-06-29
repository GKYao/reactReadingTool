const handleImage=(req,res,db)=>{
    const { id } = req.body;
    db.select('*').from('users').where({id:id})
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        if(entries.length) {
        res.json(entries[0])
    }
    else{res.status(400).json('unable to get entries')}
})
}

module.exports={
    handleImage:handleImage
}