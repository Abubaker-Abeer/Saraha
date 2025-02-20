import express from 'express';
import initApp from './SRC/index.router.js';
const app=express();
initApp(app,express);
app.listen(3000,()=>{
    console.log(`server is running on port:3000`);
    
});