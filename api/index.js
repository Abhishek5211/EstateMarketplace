import express from 'express';
import mongoose from 'mongoose';


const app = express();
 

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected');
});

app.listen(3000, ()=>{

});
