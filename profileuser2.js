



function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Get the 'video' parameter
}


const displayuser = getQueryParams();



if (displayuser) {
    console.log(displayuser);
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(user => user.id === Number(displayuser));
    if (user) {
        console.log("hello");
        loadUserData(user);
    } else {
        console.error('User not found for ID:', displayuser);
    }
}


function loadUserData(user) {
    console.log(user);
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    if (user.id === currentuserid)
        window.location.href = "profile.html"


    let users = JSON.parse(localStorage.getItem("users"));
    let currentuser = users.find(user => user.id == currentuserid)


    console.log(currentuser);


    let followbutton = document.querySelector(".follow-button")
    let currentuserfollower = currentuser.followers
    if (currentuser.following.includes(user.id))
        followbutton.textContent = "Unfollow";
    else
        followbutton.textContent = "Follow";
    let fullname = document.querySelector(".full-user-name");
    let profile = document.querySelector("#pro-pic")
    let username = document.querySelector(".para-user");


    let postcount = document.querySelector("#p-count");
    let followerscount = document.querySelector("#followers-count");
    let followingcount = document.querySelector("#following-count");
    let bio=document.querySelector("#bio");

    let posts=JSON.parse(localStorage.getItem("posts"));
    let mypost=posts.filter(post=>post.id===user.id);

    username.textContent = user.username;
    profile.src = user.profile || "sources/Default_pfp.svg.png"
    fullname.textContent = user.fullname;
    postcount.textContent = mypost.length || 0;
    followerscount.textContent = user.followers ? user.followers.length : 0;
    followingcount.textContent = user.following ? user.following.length : 0;
    bio.textContent=user.bio;


    // follow.......................................


    followbutton.addEventListener("click", () => {
        if (!currentuser.following.includes(user.id)) {
            currentuser.following.push(user.id);
            user.followers.push(currentuser.id);

            // Update localStorage after following
            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userIndex = users.findIndex(u => u.id === user.id);
            const currentUserIndex = users.findIndex(u => u.id === currentuser.id)
            if (currentUserIndex !== -1) {
                users[currentUserIndex] = currentuser; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            if (userIndex !== -1) {
                users[userIndex] = user; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            followerscount.textContent = user.followers ? user.followers.length : 0 + 1;
            console.log(`Now following ${user.username}`);
            let notification=JSON.parse(localStorage.getItem("notification")) || [];
            notification.push({id:user.id,follower:currentuser.id,content:"Started following you"})
            localStorage.setItem("notification",JSON.stringify(notification))
        } else {
            currentuser.following = currentuser.following.filter(id => id !== user.id);
            user.followers = user.followers.filter(id => id !== currentuser.id);
            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userIndex = users.findIndex(u => u.id === user.id);
            const currentUserIndex = users.findIndex(u => u.id === currentuser.id)
            if (currentUserIndex !== -1) {
                users[currentUserIndex] = currentuser; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            if (userIndex !== -1) {
                users[userIndex] = user; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            followerscount.textContent = user.followers ? user.followers.length : 0 - 1;
            console.log(`unfollowed ${user.username}`);
        }
    });
    if (document.querySelector("#p-followers")) {
        document.querySelector("#p-followers").addEventListener("click", () => {
            window.location.href = `follower.html?id=${user.id}`
        })
    }

}


document.querySelector(".follow-button").addEventListener("click", () => {
    if (document.querySelector(".follow-button").textContent == "Follow")
        document.querySelector(".follow-button").textContent = "Unfollow"
    else
        document.querySelector(".follow-button").textContent = "Follow"
})


// if(  document.querySelector("#p-followers")){
//     let currentuser=JSON.parse(localStorage.getItem("currentUserId"))
//     document.querySelector("#p-followers").addEventListener("click",()=>{
//         window.location.href=`follower.html?id=${currentuser}`
//     })
// }

if (document.querySelector("#p-following")) {
    let currentuser =  Number(getQueryParams());
    document.querySelector("#p-following").addEventListener("click", () => {
        window.location.href = `follower.html?Fid=${currentuser}`;
    })

}


if (document.querySelector(".first-area")) {
    document.querySelector("#insta-go").addEventListener("click", () => {
        window.location.href = "instagram.html"
    })

    if(document.querySelector("#go-notification")){
        document.querySelector("#go-notification").addEventListener("click",()=>{
            window.location.href="notification.html"
        })
    }

    document.querySelector("#nav-post").addEventListener("click", () => {
        window.location.href = "createpost.html"
    });

    document.querySelector("#go-search").addEventListener("click", () => {
        window.location.href = "search.html"
    })


    document.querySelector("#go-profile").addEventListener("click",()=>{
        window.location.href="profile.html"
    })

    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id == currentuserid)
    document.querySelector("#profile-holder").src=currentuser.profile;
}




if(document.querySelector(".contain-post")){
    let postStorage=document.querySelector("#post-storage");
    postStorage.addEventListener("click",()=>{
        displaypost()
    })
    displaypost()
}


function displaypost(){
    let postcontainer=document.querySelector(".contain-post");
    let posts=JSON.parse(localStorage.getItem("posts")) || [];
    let currentuserid = displayuser;
    let mypost=posts.filter(post=>post.id===Number(currentuserid));
    const videoRegex = /\.(mp4|webm|ogg)$/i;
    mypost=mypost.filter(post=>!videoRegex.test(post.mediaurl))
    postcontainer.innerHTML="";
    for(let values of mypost){
        let div=document.createElement("div");
        let img=document.createElement("img");
        div.setAttribute("class","img-post");
        div.addEventListener("click",()=>{
            let currentUser=JSON.parse(localStorage.getItem("currentUserId"));
            console.log(values.postid);
            window.location.href=`post.html?id=${currentuserid}&postid=${values.postid}`;
        })
        img.setAttribute("class","i-am-post");
        img.src=`${values.mediaurl}`;
        img.style.filter=values.filter;
        img.style.transform=values.transform;
        div.appendChild(img);
        postcontainer.appendChild(div);
        console.log(values);
    }
    console.log("display post successful");
}




let selector=document.querySelectorAll(".storage-style");

if(selector){
    selector.forEach(element=>{
        element.addEventListener("click",()=>{
            selector.forEach(element1=>element1.classList.remove("hover"))
            element.classList.add("hover")
        })
    })

    selector[2].addEventListener("click",()=>{
         showSavedPost()
    })

    selector[1].addEventListener("click",()=>{
        showReels()
    })
}



function showReels(){
    let postcontainer=document.querySelector(".contain-post");
    let posts=JSON.parse(localStorage.getItem("reels")) || [];
    let currentuserid = displayuser;
    let mypost=posts.filter(post=>post.id===currentuserid);
    postcontainer.innerHTML="";
    for(let values of mypost){
        let div=document.createElement("div");
        let img=document.createElement("video");
        div.setAttribute("class","img-post");
        img.setAttribute("class","i-am-post");
        img.src=`${values.mediaurl}`;
        div.appendChild(img);
        postcontainer.appendChild(div);
    }
    console.log("display post successful"); 
}


function showSavedPost(){
    let currentuserid = displayuser;
    let users=JSON.parse(localStorage.getItem("users"))|| [];
    let currentuser=users.find(user=>user.id===currentuserid);
    let savedpostid=currentuser.savedPost;
    let postcontainer=document.querySelector(".contain-post");
    postcontainer.innerHTML=""
    let posts=JSON.parse(localStorage.getItem("posts")) || [];
    for(let id of savedpostid){
        let currentpost=posts.find(post=>post.postid===id);
        let div=document.createElement("div");
        let img;
        if(regex.test(currentpost.mediaurl))
        img=document.createElement("img");
       
   else
   img=document.createElement("video");
        div.setAttribute("class","img-post");
        img.setAttribute("class","i-am-post");
        img.src=`${currentpost.mediaurl}`;
        div.appendChild(img);
        postcontainer.appendChild(div);
    }
}


document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})