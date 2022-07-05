const express = require('express')
const { all } = require('./scraper')
const mongoose = require('mongoose')
require('dotenv').config()
const jobmodel = require('./models/jobs')

mongoose.connect(process.env.mongodburi).then(() => {
    console.log("connected");
}).catch(err => {
    console.log(err);
})

const app = express()
app.use(express.json())

app.get('/all', async (req, res) => {
    const datatimestamp = await jobmodel.findOne({})
    const nowtime = Date.now()
    const diff = (nowtime - datatimestamp?.timestamp) / (1000 * 60 * 60);
    if (!diff) {
        const data = await all('')
        await jobmodel.insertMany(data)
        return res.send(await jobmodel.find({},{timestamp:0}))
    }
    if (diff > 0.55) {
        const data = await all('')
        await jobmodel.deleteMany({})
        await jobmodel.insertMany(data)
       return res.send(await jobmodel.find({},{timestamp:0}))
    }
    const oldjobs = await jobmodel.find({},{timestamp:0})
    res.send(oldjobs)
})

app.listen(process.env.PORT || 8000, () => {
    console.log('listening server');
})