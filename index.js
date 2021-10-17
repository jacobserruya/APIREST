const express = require("express");
const app = new express();
const PORT = 3000  || process.env.PORT;


const courses =[
     {id:1,name:"course1"}, 
     {id:2,name:"course2"}, 
     {id:3,name:"course3"},
     {id:4,name:"course4"},  
    ]


app.use(express.json());    
app.get("/",(req,res)=>{

res.send("hello");


});



app.get("/api/courses",(req,res)=>{

    res.send(courses);
    
    
    });

    app.get("/api/courses/:id",(req,res)=>{
     let course = courses.find(c=> c.id === parseInt(req.params.id)  ) 
      // res.send(course)
       if(!course)  {    res.status(404).send("course id not found ")}
       else res.send(course);      
        
        });


        app.get("/api/courses/:year/:month",(req,res)=>{
            // req.params.id
             res.send(req.params);
             //pode po
             
             });
     

      app.post("/api/courses/",(req,res)=> {

        if(!req.body.name || req.body.name.length<3){
            return    res.status(400).send("name required and should be at least 3 caracters")
        }


         const course ={
               id:courses.length + 1 ,
               name :req.body.name

         }  


           courses.push(course);
           res.send(course) ;


      } )


      app.put("/api/courses/:id",(req,res)=>{
         let course = courses.find(c=> c.id === parseInt(req.params.id) )
            if(!course){ return res.status(404).send("course id not founded")}
            
            if(!req.body.name || req.body.name.length<3){
           return       res.status(400).send("name required and should be at least 3 caracters")
        }
          course.name =req.body.name;
            res.send(course);



      })


      app.delete("/api/courses/:id",(req,res)=>{
        let course = courses.find(c=> c.id === parseInt(req.params.id) )
           if(!course) return res.status(404).send("course id not founded")
           
           if(!req.body.name || req.body.name.length<3){
             return  res.status(400).send("name required and should be at least 3 caracters")
       }
         let index =courses.indexOf(course)
           res.send(course);
           courses.splice(index,1) //remove one objct on this index.
           res.send(course)



     })





app.listen(PORT,()=>{

console.log(`Server is running on port ${PORT}`)


})