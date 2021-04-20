const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const port =  process.env.PORT || 5000 ;
require('dotenv').config();

//  const pass = uyNwgq.yZ7zEvH
app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.n2xq8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const serviceCollection = client.db("carService").collection("service");
  console.log('database connect successfully');

  app.post('/addService', (req, res) => {
    const newService = req.body;
    serviceCollection.insertOne(newService)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  const ObjectID = require('mongodb').ObjectID
 app.delete('/deleteProduct/:id',(req,res)=>{
  const id=ObjectID(req.params.id);
  serviceCollection.deleteOne({_id: id})
  .then((err,documents)=>res.send(documents))
})

  app.get('/service' , (req, res ) => {
    serviceCollection.find()
    .toArray((err, items) => {
       res.send(items)
    })
  })
});
client.connect(err => {const serviceCollection = client.db("carService").collection("order");
  app.post('/addOrder', (req, res) => {
    const newOrder = req.body;
    serviceCollection.insertOne(newOrder)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  app.get('/order',(req,res) => {
    serviceCollection.find({email: req.query.email})
    .toArray((err,adminData)=> {
      const filter = {email: req.query.email}
      if (adminData.length === 0){
        filter
      }
      serviceCollection.find(filter)
    .toArray((err,data)=> {
      res.send(data)
    })
    })
  })

})
client.connect(err => {const serviceCollection = client.db("carService").collection("admin");
  app.post('/addAdmin', (req, res) => {
    const newAdmin = req.body;
    serviceCollection.insertOne(newAdmin)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  app.get('/isAdmin',(req,res) => {
    serviceCollection.find({email: req.query.email})
    .toArray((err,adminData)=> {
     res.send(adminData)
    })
  })
})
client.connect(err => {const serviceCollection = client.db("carService").collection("review");
  app.post('/addReview', (req, res) => {
    const newReview = req.body;
    serviceCollection.insertOne(newReview)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })
  app.get('/review' , (req, res ) => {
    serviceCollection.find()
    .toArray((err, items) => {
       res.send(items)
    })
  })
})

app.listen(port)