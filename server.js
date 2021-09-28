import express from "express"
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors'

const URL = 'mongodb://localhost:27017/'
const port = process.env.port||3000;

// App config
const app = express()


// DB config
mongoose.connect(URL,{
    useNewURLParser: true,
}).then(() => console.log('Backend server started') )


// Middlewares
app.use(express.json());
app.use(Cors());
// Api Endpoints

app.get('/',(req, res) => {
   res.send("Commitment, Dedication, persistence, resilience is key ")
})      

app.get('/tinda/card',(req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})


app.post('/tinda/cards', (req, res) => {
    const dbCard = req.body;
    Cards.create(dbCard, (err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// Listener
app.listen(port, () => console.log(`Server started on port: ${port}`))