const app = require('express')();
const http = require('http');


const port = process.env.PORT || 8080;
app.listen(
    port,
    () => console.log(`it's alive on http://localhost:${port}`)
)

app.get('/', (req, res) => {
    res.send("bonk");
});

app.get('/api/posts/:id', (req, res) => {
    res.send();
})

all_posts = [BlogPost];

class BlogPost {
    title = String
    description = String
    author = String
    reading_time = Number
    body = String
    date = Date
    comments = [String]

    constructor(){
        title = this.title;
        description = this.description;
        author = this.author;
        reading_time = this.reading_time;
        body = this.body;
        date = this.date;
        comments = this.comments;
    }
}


/* GET = retrieve data, POST = write new data, DELETE = delete junk, PUT = write update data

CRUD = POST /drinks, PUT /drinks/605 (put doesn't risk repeat records)




*/
