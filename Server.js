const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();




hbs.registerPartials(__dirname+'/views/Partials')
app.set('view engine','hbs');

/*app.get('/vickyDetails',(req,res)=>
{
  res.send({name:'vicky',age:21});
});
*/
app.use((req,res,next)=>
{
  var time = new Date().toString();
  var loginTime=`${time}:${req.method},${req.url}`;
  fs.appendFile('Server.log',loginTime+'\n',(err)=>
{
  if(err)
  {
    console.log('something problem');
  }
});
  next();
});

app.use((req,res,next)=>
{
  res.render('HomeDu.hbs');
  next();
});

hbs.registerHelper('getYear',()=>
{
  return 'test'
});
hbs.registerHelper('upper',(text)=>
{
  return text.toUpperCase();
})
app.get('/home',(req,res)=>
{
  res.render('HomePage.hbs',{
    name:"vicky",
    headline:'This is headline for homepage',
    msg:"Welcome to HomePage hai hai hai",

  });//:new Date().getFullyear()
  });

app.get('/about',(req,res)=>
{
  res.render('About.hbs',{
    name:"vicky",
      headline:'This is headline for AboutYou',
    msg:"Welcome to HomePage hai hai hai"
    //:new Date().getFullyear()
  });
});
app.use(express.static(__dirname +'/HTMLFile'));
app.listen(3000,()=>{console.log("server working on...")});
