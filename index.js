import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Sample blog posts data
const blogPosts = [];

app.get("/", (req, res) => {
    res.render("about.ejs");
});

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

app.get("/work", (req, res) => {
    res.render("index.ejs", { blogPosts });
})

// Handle the new post route
app.get("/new-post", (req, res) =>{
    res.render("new-post.ejs");
})

app.post('/submit', (req, res) => {
    const { author, title, content, genre } = req.body;
    const newPost = {
      id: blogPosts.length, // Assuming unique IDs for posts
      author,
      title,
      content,
      genre,
      date: new Date().toDateString(), // Assuming a date field
    };
  
    blogPosts.push(newPost);
    res.redirect('/work');
});

// Handle individual blog post route
app.get('/blog/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id == postId);
  
    if (!post) {
      // Handle case where the post doesn't exist
      res.status(404).send('Ops! Post not found');
      return;
    }

    res.render('blog.ejs', { post });
});

// Handle the edit route
app.get('/edit/:id', (req, res) => {
    const postId = req.params.id;
    const post = blogPosts.find(post => post.id == postId);

    if (!post) {
        // Handle case where the post doesn't exist
        res.status(404).send('Ops! Post not found');
        return;
    }

    res.render('edit.ejs', { post });
});

// Handle the update route
app.post('/update/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10); // Convert the ID to an integer
    const { author, title, content, genre } = req.body;

    // Assuming you have a blogPosts array
    const updatedPost = {
        id: postId,
        author,
        title,
        content,
        genre,
        date: new Date().toDateString(), // Update with the current date
    };

    updatePostById(postId, updatedPost);

    res.redirect(`/blog/${postId}`);
});

function updatePostById(postId, updatedPost) {
    const index = blogPosts.findIndex(post => post.id === postId);

    if (index !== -1) {
        blogPosts[index] = updatedPost;
        console.log(blogPosts[index]);
    }
}

// Handle the delete route
app.post('/delete/:id', (req, res) => {
    const postId = req.params.id;
    // Implement logic to delete the post from the blogPosts array
    // (e.g., using filter())
    // ...
    const postNo =  blogPosts.find(post => post.id === postId);
    blogPosts.splice(postNo, 1);

    res.redirect('/work');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

