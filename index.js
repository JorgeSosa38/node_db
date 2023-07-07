const express = require('express');
const app = express();
const config = require('./config');
const Student = require('./models/student');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

config.authenticate().then(()=>{
    console.log('database is connected');

}).catch((err)=>{
    console.log(err);
});

let count=0;

//retrieving all students - functional
app.get('/students', function(req,res){
    count+=1;
    Student.findAll().then((results)=>{
        res.status(200).send(results);
    //Custom Middleware
    console.log('Request Type: GET | Request Number: '+count);

    }).catch((err)=>{
        res.status(500).send(err);
    });
});

//retrieving particular student(s) - functional
app.get('/filter',function(req,res){
   count+=1;
   //Custom Middleware
   console.log('Request Type: GET | Request Number: '+count);

   let data ={
    where: {}
   };

  if(req.query.department !== undefined){
    data.where.department=req.query.department
   }

   if(req.query.nationality !== undefined){
    data.where.nationality=req.query.nationality;
   }

   if(req.query.id !== undefined){
    data.where.id=req.query.id;
   }
   if(req.query.name !== undefined){
    data.where.name=req.query.name;
   }


    Student.findAll(data).then((output)=>{
        res.status(200).send(output);

    }).catch((err)=>{
        res.status(500).send(err);
    });
});

//adding student  - functional
app.post('/students',function(req,res){
    count+=1;
    //Custom Middleware
    console.log('Request Type: POST | Request Number: '+count);
    let studentData=req.body;

    Student.create(studentData).then((result) =>{
        res.status(200).send(result);
    }).catch((err)=>{
        res.status(500).send(err);
    });
});

//updating student - functional
app.patch('/students/:student_id',function(req,res){
    count+=1;
    //Custom Middleware
    console.log('Request Type: PATCH | Request Number: '+count);

    let studentId=parseInt(req.params.student_id);

    Student.findByPk(studentId).then((result) => {
        if(result){

            result.department=req.body.department;

            result.save().then(()=>{
                res.status(200).send(result);
            }).catch((err)=>{
                res.status(500).send(err);
            });
        }
        else{
            res.status(404).send('Student Not Found');

        }
    }).catch((err)=>{
        res.status(500).send(err);
    });
});

//deleting student - err
app.delete('/students/:student_id', function(req,res){
    count+=1;
    //Custom Middleware
    console.log('Request Type: DELETE | Request Number: '+count);
    //string to int 
    let studentId = parseInt(req.params.student_id);

    //last friday

   
});



//hosting web server
app.listen(3000,function(){
    console.log('Server running on port 3000');
});
