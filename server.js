const express=require('express')
const {all}=require('./scaper')

const app=express()
app.use(express.json())

app.get('/all',async(req,res)=>{
    const data=await all('')
    res.send(data)
})

app.get('/:job',async(req,res)=>{
    const data=await all(req.params.job)
    res.send(data)
})

app.listen(process.env.PORT || 8000,()=>{
    console.log('listening server');
})