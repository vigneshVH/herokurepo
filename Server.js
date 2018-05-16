const express=require('express');
const hbs=require('hbs');
const fs=require('fs');


var app=express();
 const port=process.env.PORT || 3000;



hbs.registerPartials(__dirname+'/views/Partials')
app.set('view engine','hbs');

/*app.get('/vickyDetails',(req,res)=>
{
  res.send({name:'vicky',age:21});
});
*/
app.use((req,res,next)=>
{
  console.log("inside");
  var time = new Date().toString();
  var loginTime=`${time}:${req.method},${req.url}`;
  console.log(loginTime);
  fs.appendFile('LoginDetails.log',loginTime+'\n',(err)=>
{
  if(err)
  {
    console.log('something problem');
  }
});
     next();
});

// app.use((req,res,next)=>
// {
//   res.render('HomeDu.hbs');
//   next();
// });

// hbs.registerHelper('getYear',()=>
// {
//   return 'test'
// });
hbs.registerHelper('upper',(text)=>
{
  return text.toUpperCase();
});

app.get('/projects',(req,res)=>
{
  res.render('Projects.hbs');
});


app.get('/',(req,res)=>
{
  res.render('HomePage.hbs',{
    name:"vicky",
    headline:'This is headline for homepage',
    msg:"Welcome to HomePage hai hai hai",

  });//:new Date().getFullyear()
  });

  app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    pagetittle:'home page',
    welcome:'welcome to website'
  });
});

app.get('/',(req,res)=>{
  res.send({errormsg:'unable to connect'});


});

app.get('/About',(req,res)=>
{
  res.render('About.hbs',{
    name:"vicky",
      headline:'This is headline for AboutYou',
    msg:"Welcome to AboutPage hai hai hai"
    //:new Date().getFullyear()
  });
});
// app.get('/',(req,res)=> {
//   res.send("Hello");
// });
app.use(express.static(__dirname +'/HTMLFile'));
app.listen(port,()=>{console.log(`server working on ${port}`)});
