const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});

app.use((req, res, next)=>{
  let now = new Date().toString();

  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n',(err)=>{
    if(err){
      console.log('Unable to append to server log');
    }
  });
  next();
});

app.get('/',(req,res)=>{
  res.send('Hế lô');
});

app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    content: `Perspiciatis error repudiandae molestiae neque maxime delectus non consequatur amet. Ut ullam aut inventore ut sit quod. Non quae nesciunt et laboriosam accusamus. Sint sit nihil enim quia reprehenderit cum. Quae quibusdam odio facilis. Iusto totam aut fugit quod blanditiis aut vel delectus nesciunt.
 
Sit omnis quos est alias nobis eveniet. Deleniti tempora omnis ea occaecati sequi. Et culpa quo alias.
 
Natus maiores ut. Molestias qui eveniet eum est minima aut occaecati. Suscipit molestiae aut doloremque. Ad repudiandae impedit omnis facere maxime sint iste quia quis. Quibusdam illum consequatur incidunt blanditiis adipisci vero qui.`
  });
});


app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page',
    content: `Vel est sit omnis autem illo est sint. Fuga ducimus praesentium blanditiis ut. Dolor nihil non quasi. Quis recusandae quia eligendi cumque dolor eos.
 
Ipsum a consequuntur esse voluptas minus quia distinctio. Ut qui suscipit harum vitae officia aut. Quia illum ipsa.
 
Quia quo tenetur vel alias esse non reiciendis ratione. Sint et perspiciatis perspiciatis necessitatibus. Commodi veritatis est soluta maxime laboriosam iure odit reprehenderit odio.`
  });
});
app.listen(port, ()=>{
  console.log(`server is up on port ${port}`);
});