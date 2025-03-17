console.log(localStorage);
function signUp(){
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value
    let fullname=document.getElementById("full-name").value
    let username=document.getElementById("user-name").value

password=encode(password)

    let users=JSON.parse(localStorage.getItem("users")) || []
    if(users.find(user=>user.email===email)){
        alert("Email already exist")
        return 
    }
    if(users.find(user=>user.password===password)){
        alert("password already exist")
        return 
    }
    if(!regex.test(password)){
        alert("password must contain 8 character and also have atleast one special character and a number and do have uppercase letter");
        return;
    }
    else if(pattern.test(email) && fullname && username && password){
    let newUser={id:Date.now(),username,fullname,email,password,followers:[],following:[]}
    users.push(newUser)
    localStorage.setItem("users",JSON.stringify(users))
    window.location.href="log.html"
    }
}





function logIn(){
    let email=document.getElementById("email-log").value
    let password=document.getElementById("password-log").value
    let users=JSON.parse(localStorage.getItem("users")) || []
    let userCondition= users.find(user=>user.email===email && user.password=== encode(password))
    if(userCondition){
        localStorage.setItem("currentUserId",JSON.stringify(userCondition.id))
        window.location.href="instagram.html"
        
    }
    else{
        alert("invalid credentials")
    }
}

if(document.querySelector("#insta-go")){
document.querySelector("#insta-go").addEventListener("click",()=>{
    window.location.href="instagram.html"
})
}

window.addEventListener("load", profileUpdate);

document.querySelectorAll(".edit-pro")[0].addEventListener("click",()=>{
    window.location.href="edit.html"
})

function profileUpdate() {
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
      let users;
    try {
        users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
        console.error('Error parsing users from localStorage:', error);
        users = []; // Fallback to an empty array
    }
    let currentuser = users.find(user => user.id === currentUserId);
    let username = document.querySelector(".para-user");
    let postcount = document.querySelector("#p-count");
    let followerscount = document.querySelector("#followers-count");
    let followingcount = document.querySelector("#following-count");

    username.textContent = currentuser.username;

       let posts;
    try {
        posts = JSON.parse(localStorage.getItem("posts")) || [];
    } catch (error) {
        console.error('Error parsing posts from localStorage:', error);
        posts = []; // Fallback to an empty array
    }
    let mypost = posts.filter(post => post.id === currentUserId);
    postcount.textContent = mypost.length;
    followerscount.textContent = currentuser.followers.length;
    followingcount.textContent = currentuser.following.length;

    let fullname = document.querySelector(".full-user-name");
    fullname.textContent = currentuser.fullname;
    const bioDisplay = document.getElementById("bio");
    bioDisplay.textContent=currentuser.bio
    const profilepicture=document.querySelector("#pro-pic")
    profilepicture.src=currentuser.profile || "sources/Default_pfp.svg.png"
    document.querySelector("#profile-holder").src = currentuser.profile || "sources/Default_pfp.svg.png";
    console.log('Profile updated:', currentuser);
}

if(document.querySelector("#nav-post")){
document.querySelector("#nav-post").addEventListener("click",()=>{
    window.location.href="createpost.html"
})
}

if(  document.querySelector("#p-followers")){
    let currentuser=JSON.parse(localStorage.getItem("currentUserId"))
    document.querySelector("#p-followers").addEventListener("click",()=>{
        window.location.href=`follower.html?id=${currentuser}`
    })
}

if(document.querySelector("#p-following")){
    let currentuser=JSON.parse(localStorage.getItem("currentUserId"));
    document.querySelector("#p-following").addEventListener("click",()=>{
        window.location.href=`follower.html?Fid=${currentuser}`;
    })

}


if(document.querySelector("#go-notification")){
    document.querySelector("#go-notification").addEventListener("click",()=>{
        window.location.href="notification.html"
    })
}

if(document.querySelector("#go-search")){
    document.querySelector("#go-search").addEventListener("click",()=>{
        window.location.href="search.html"
    }) 
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
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let mypost=posts.filter(post=>post.id===currentuserid);
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
            window.location.href=`post.html?id=${currentUser}&postid=${values.postid}`;
        })
        div.style.cursor="pointer"
        img.setAttribute("class","i-am-post");
        img.src=`${values.mediaurl}`;
        img.style.filter=values.filter;
        img.style.transform=values.transform;
        div.appendChild(img);
        postcontainer.appendChild(div);
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
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
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
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let regex=/\.(jpg|jpeg|png|gif|bmp|svg|webp|tiff|tif)$/i;
    let users=JSON.parse(localStorage.getItem("users"))|| [];
    let currentuser=users.find(user=>user.id===currentuserid);
    let savedpostid=currentuser.savedPost;
    let postcontainer=document.querySelector(".contain-post");
    postcontainer.innerHTML=""
    let posts=JSON.parse(localStorage.getItem("posts")) || [];
    for(let id of savedpostid){
        let currentpost=posts.find(post=>post.postid===id);
        console.log(currentpost);
        let div=document.createElement("div");
        let img;
        if(currentpost===undefined)
        continue
        if(regex.test(currentpost.mediaurl))
         img=document.createElement("img");
        
    else
    img=document.createElement("video");
        div.setAttribute("class","img-post");
        div.onclick=()=>{
          window.location.href=`post.html?postid=${currentuserid}`  
        }
        img.setAttribute("class","i-am-post");
        img.src=`${currentpost.mediaurl}`;
        img.style.filter=currentpost.filter;
        img.style.transform=currentpost.transform;
        div.appendChild(img);
        postcontainer.appendChild(div);
    }
}




if(document.querySelector(".edit-pro")){
    document.querySelectorAll(".edit-pro")[1].addEventListener("click",()=>{
        console.log("edit-pro");
        localStorage.removeItem("currentUserId")
        location.reload()
    })
}


window.addEventListener("load",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})


function encode(str, shift=3) {
    return str.split('').map(char => {
        if (/[a-zA-Z]/.test(char)) {
            const start = char === char.toUpperCase() ? 65 : 97; // ASCII 'A' or 'a'
            return String.fromCharCode(((char.charCodeAt(0) - start + shift) % 26) + start);
        }
        return char; 
    }).join('');
}

function decode(str, shift=3) {
    return encode(str, 26 - (shift % 26)); // Reverse the shift
}

if(document.querySelector("#fixedNavBar")){
document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})
}




// console.log(decode("Urew.uRew.urEw.ureW...","cipher"));








// document.querySelector(".choose-photo").addEventListener("click",()=>{
//     console.log("hello");
//     fileForProfile.click()
// })

// fileForProfile.addEventListener("change",()=>{
//     let currentUserId=JSON.parse(localStorage.getItem("currentUserId"))
//     let users=JSON.parse(localStorage.getItem("users"))
//     let currentuser=users.find(user=>user.id===currentUserId)
//     const file=fileForProfile.files[0];
//     const reader=new FileReader();
//     reader.onload=(e)=>{
//         currentuser.profile=e.target.result
//     document.getElementById("ed-profile").src=currentuser.profile;
//     localStorage.setItem("users",JSON.stringify(users))
//     }
//     if(file)
//     reader.readAsDataURL(file)
// })
