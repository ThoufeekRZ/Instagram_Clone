let comment = document.querySelector(".type");
let submit = document.querySelector(".send");

const postid = getQueryParams();

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); 
}

function renderComments() {
    let posts = JSON.parse(localStorage.getItem("posts"));
    let currentpost = posts.find(post => post.postid === Number(postid));
    let comments = currentpost.Comments || [];
    let display = document.querySelector(".display");
    

    display.innerHTML = "";

    let users = JSON.parse(localStorage.getItem("users"));
    for (let value of comments) {
        let currentuser = users.find(user => user.id === value.id);


        if (currentuser) {
            let div = document.createElement("div");
            div.setAttribute("class", "single");

            let img = document.createElement("img");
            img.setAttribute("class", "img-com");
            img.src = currentuser.profile || "path/to/default/image.png"; // Use a default image if not found

            let para = document.createElement("p");
            para.setAttribute("class", "user");
            para.textContent = `${currentuser.username}`;

            let wrapper=document.createElement("div");
            wrapper.setAttribute("class","wrapper");
            wrapper.append(img,para);

            wrapper.onclick=()=>{
                window.location.href=`profileuser2.html?id=${currentuser.id}`
            }

            let commentbox = document.createElement("div");
            commentbox.setAttribute("class", "type-text");
            commentbox.textContent = `${value.text}`;

            div.append(wrapper, commentbox);
            display.appendChild(div);
        }
    }
}

submit.addEventListener("click", () => {
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users"));
    let currentuser = users.find(user => user.id === currentuserid);
    let posts = JSON.parse(localStorage.getItem("posts"));
    let currentpost = posts.find(post => post.postid === Number(postid));

    // Create and display the new comment
    let div = document.createElement("div");
    div.setAttribute("class", "single");
    let img = document.createElement("img");
    img.setAttribute("class", "img-com");
    img.src = currentuser.profile;
    let para = document.createElement("p");
    para.setAttribute("class", "user");
    para.textContent = `${currentuser.username}`;

    let wrapper=document.createElement("div");
    wrapper.setAttribute("class","wrapper");
    wrapper.append(img,para);
    let commentbox = document.createElement("div");
    commentbox.setAttribute("class", "type-text");
    commentbox.textContent = `${comment.textContent}`; 
    div.append(wrapper, commentbox);

    let commentlist = currentpost.Comments || [];
    commentlist.push({ id: currentuser.id, text: comment.textContent}); // Use comment.value
    currentpost.Comments = commentlist;
    
   
    localStorage.setItem("posts", JSON.stringify(posts));

    let notification=JSON.parse(localStorage.getItem("notification")) || [];
    notification.push({from:currentuser.id,id:currentpost.id,content:"Commented on your post",post:currentpost.mediaurl,comments:comment.textContent})
    localStorage.setItem("notification",JSON.stringify(notification));
    renderComments();
});


renderComments();


document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})

