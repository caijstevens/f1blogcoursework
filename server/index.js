const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

all_posts = [];
all_comments = [];

fs.stat('storedposts.json', (err, _) => {
    if (err == null) {
        fs.readFile('storedposts.json', (err, data) => {
            if (err == null) {
                all_posts = JSON.parse(data.toString());
            }
        });
    }
})

fs.stat('storedcomments.json', (err, _) => {
    if (err == null) {
        fs.readFile('storedcomments.json', (err, data) => {
            if (err == null) {
                all_comments = JSON.parse(data.toString());
            }
        });
    }
})

const port = 8080;
app.listen(
    port,
    () => console.log(`it's alive on http://localhost:${port}`)
)

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'homepage.html'));
});

app.get('/css/styles.css', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'styles.css'));
})

app.get('/api/home', (req, res) => {
    console.log(all_posts);
    res.status(200).json(all_posts);
});

app.post('/api/admin/create', (req, res) => {
    req.body.comments = [];
    req.body.date = Date.now();
    req.body.id = all_posts.length;
    all_posts.push(req.body);
    fs.writeFile('storedposts.json', JSON.stringify(all_posts), () => {});
    res.sendStatus(200);
});

app.get('/api/comments/get', (req, res) => {
    let returnComment;
    all_comments.forEach((comment) => {
        if (comment.id.toString() == req.query.commentId) {
            returnComment = comment;
        }
    })
    if (returnComment) {
        res.status(200).json(returnComment)
    } else {
        res.sendStatus(404)
    }
});

/*{
    postId: number
    comment: string
}
*/

app.post('/api/comments/post', (req, res) => {
    if (all_posts.length > req.body.postId) {
        req.body.id = all_comments.length;
        let post;
        all_posts.forEach((testPost) => {
            if (req.body.postId === testPost.id) {
                post = testPost;
            }
        })
        if (post != null) {
            post.comments.push(req.body.id);
            all_comments.push(req.body);
            fs.writeFile('storedposts.json', JSON.stringify(all_posts), () => {});
            fs.writeFile('storedcomments.json', JSON.stringify(all_comments), () => {});
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        res.sendStatus(404);
    }
});




