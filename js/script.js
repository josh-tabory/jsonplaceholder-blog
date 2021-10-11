'use strict';

// GLOBAL VARIABLES
let postForm = document.querySelector('#postForm');
let postBody = document.querySelector('#postBody');
let postTitle = document.querySelector('#postTitle');
let modal = document.querySelector('.modal');

// LOAD LIST OF BLOG POSTS
window.onload = function() {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
      .then((response) => response.json())
      .then((posts) => {
          let output = '';
          posts.forEach(function(post) {
            var truncBodyText = post.body.substring(0, 15) + '...';
            let slug = post.title.replace(/ /g, '-');
            
            output += `
            <li class="post">
                <h2><a href="${slug}.html" target="_blank">${post.title}</a></h2>
                <p>${truncBodyText}</p>
            </li>
            `
            
        });
        document.querySelector('#posts').innerHTML = output;
        document.body.classList.remove('loading');
    });
}

//POST DATA TO BLOG
postForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const newPost = {
        title: postTitle.value,
        body: postBody.value,
        userId: 1,
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newPost)
    })
    .then((res) => {
        if (res.ok) {
            return res.json() 
        } else {
            return Promise.reject({ status: res.status, statusText: res.statusText });
        }   
        
    })
    .catch(err => console.log('Error message:', err.statusText));
            let posts = document.querySelector('#posts');
            let newLi = document.createElement("li");
            
            newLi.classList.add('post');
            posts.appendChild(newLi);
            newLi.innerHTML = `
                <h2><a href="#">${newPost.title}</a></h2>
                <p>${newPost.body}</p>
            ` 
            //RESET MODAL
            e.target.reset();
            addPost.classList.add('disabled');         
});


// CHECK IF MODAL FORM IS VALID AND ENABLE SUBMIT
modal.addEventListener("keyup", function(e) {
    if(postBody.value && postTitle.value) {
        addPost.classList.remove('disabled');
    }else {
        addPost.classList.add('disabled');
    }
});


// ADD FOCUS TO MODAL INPUT
modal.addEventListener('shown.bs.modal', function () {
    setTimeout(function (){
        postTitle.focus();
    }, 100);

})



