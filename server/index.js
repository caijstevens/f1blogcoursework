const app = require('express')();
const http = require('http');


const port = process.env.PORT || 8080;
app.listen(
    port,
    () => console.log(`it's alive on http://localhost:${port}`)
)

app.get('/', (req, res) => {
    res.send();
});

app.get('/api/posts/:id', (req, res) => {
    res.send();
})



/* GET = retrieve data, POST = write new data, DELETE = delete junk, PUT = write update data

CRUD = POST /drinks, PUT /drinks/605 (put doesn't risk repeat records)




*/
