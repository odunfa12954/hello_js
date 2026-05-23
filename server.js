require("dotenv").config();

const express = require('express')
const app = express()
const port = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
    // logs every request
    console.log(`${req.method} ${req.url} . ${new Date()}`);
    next(); 
});

app.use((req,res, next) => {
    console.log('Helllo, I am here👋👋');
    next(); // pass to next handler (required)!
})

// app.post('/echo', (req, res) => {
//     console.log(req.body);
//     res.json({echoed: req.body }); 
// });

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    res.send('Hello👋👋. Welcome to Express!')
})

app.get('/search', (req, res) => {
    const id = req.query.id;
    console.log(id);
    res.send(id);
})

// app.get('/', (req, res) => {
//   res.send('Hello👋👋. Welcome to Express!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})