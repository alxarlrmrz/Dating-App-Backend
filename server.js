import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './model/dbCards.js'

//App Config
const app = express()
const mongoURI = process.env.MONGO_URI
const port = process.env.PORT || 8001
// const connection_url = 'mongodb+srv://alx:4Xfx2XhFNGyNAcM@cluster0.0kpu3zc.mongodb.net/?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
// mongoose.connect(connection_url, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
  )

//API Endpoints
app.get("/", (req, res) => res.status(200).send("Ohaaaaay"))

app.post('/dating/cards', (req, res) => {
    const dbCard = req.body
    Cards.create(dbCard, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})
app.get('/dating/cards', (req, res) => {
    Cards.find((err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})


//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`))