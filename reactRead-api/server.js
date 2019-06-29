const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const profile=require('./controllers/profile');
const image=require('./controllers/image');
const vocab=require('./controllers/vocab');
const translate=require('./controllers/translate');
app.use(cors())
app.use(bodyParser.json())
const db=knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });
const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'cookie',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sallu',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date()
        },
    ]
}
app.get('/',(req,res)=>{res.send(database.users);})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleImage(req,res,db)})
app.post('/vocab/read',(req,res)=>{vocab.readVocab(req,res,db)})
app.put('/vocab/insert',(req,res)=>{vocab.addVocab(req,res,db)})
app.post('/translate',(req,res)=>{translate.handleTranslate(req,res)})
app.listen(3000,()=>{
    console.log('app is running on 3000');
});