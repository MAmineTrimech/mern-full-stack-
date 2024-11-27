const express=require('express');
const formApi=require('./routes/form');
const routerApi=require('./routes/router');
const cors=require('cors');
require('./config/connect');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/getimage',express.static('./upload'));
app.use( formApi);
app.use(routerApi);
app.listen(process.env.PORT,()=>{
    console.log('server working !'+process.env.PORT)
})