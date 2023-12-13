Note that this is a quick summary and thought process of what every line of code means. 
I pull this out to README_code.txt is to keep the actual code content clean from "comments"

Overview:
#1: In /new-post (new-post.ejs), there is a form that consist of author, title, content, and genre
Upon pressing "Submit Blog Post", it will trigger a "POST" which are tied to /submit (trigger app.post('/submit') in index.js)

#2: It will consolidate all the form filled in "const newPost".
All those data collected are pushed into an array named "blogPosts.push(newPost)". Upon completion, it will redirect us to the mainpage (/)

#3: So, in the main page. We will be seeing your first blog post in a 2 by 2 column setting (flex)
The code below will go through a "forEach" loop which the array consist. So, in this case. There is only 1 data stored in the array of "blogPosts = [0]"

#4: Note that app.get("/") render index.ejs with the parameter of blogPosts means without it. We will not be able to see the post after submit.
So, it will always be searching for "blogPosts". Hence, it will be able to complete this "blogPosts.forEach"

#5: blogPosts.forEach(post =>... "post variable" is use as a representation of "newPost"
So, accessing the data that is saved in newPost previously. It is now "post.genre and etc".
The level view is /submit -> data save in newPost -> newPost saved in blogPosts array -> to use in ejs(html)
-> forEach state a new variable "post" -> post.genre (access into blogPosts.newPost.genre)

#6: How do we access into the full blog after we /submit?
<a href="/blog/<.% post.id %>" is used which is tied to app.get('/blog/:id')
This will check if the postID is the same as what was initially saved in blogPosts array via id: blogPosts.length
Hence, this "const post = blogPosts.find(post => post.id == postId);"
If yes, it will render(blog.ejs, { post }) and distribute the necessary info into blog.ejs for us to view the full blog page

#7: How to delete and edit feature
7.1: Delete
    It is straight-forward that it is basic removal of array of data using splice because we want it to remain the content
    eg: const blogPosts = [a, b, c, d] after splice(1,1) becomes blogPosts = [a, c, d] 
    ---- the challenge is finding the unique ID and comparison because blogPosts[1] could mean = [b] or =[c] in different context ----

7.2: Edit
    It has the similar --challenge-- as Delete feature because of the uniqueID and index to pull from the array
    Similar structure as /submit but this time it updates designated ID and not based on index of array. 

Tech Stack:
EJS (server side rendering template engine of Express.js), 
Bootstrap (CSS Framework - opinionated), **Note can use Tailwind.css to help customized UI (depends on what you look for)
Express.js (BE Server-side web app Framework), 
Node.js (JS runtime env)

Reference:
ChatGPT, StackOverFlow, w3schools, dev.mozilla
