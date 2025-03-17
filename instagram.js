let storyArea=document.getElementById("story-area") //story falling area
let storyPics = [
    { name: "Ajith", image: "sources/ajith.jpg",story:"sources/ajithey.mp4"},
    { name: "Vijay", image: "sources/vijay.jpg",story: "sources/tvk.mp4"},
    { name: "Krithi", image: "sources/krithi.jpg", story:"sources/suriya.mp4" },
    { name: "Suriya", image: "sources/suriya.jpg",story:"sources/suriya.mp4" },
    { name: "Mahi", image: "sources/MSD.jpg" },
    { name: "VijayTv", image: "sources/vijayTv.jpg" }
];

localStorage.setItem("storyData",JSON.stringify(storyPics))
localStorage.removeItem("visitinguser")

  //story-object

//iteration happening to add all the story in the div(storyArea)
//for displaying in the ui

if(document.querySelector("#go-create")){
document.querySelector("#go-create").addEventListener("click",()=>{
    window.location.href="createpost.html"
})
}

if(document.querySelector("#go-search")){
    document.querySelector("#go-search").addEventListener("click",()=>{
        window.location.href="search.html"
    })
}




for(let values of JSON.parse(localStorage.getItem("storyData"))){
    let div=document.createElement("div")
    div.setAttribute("class","add-story")
    let img=document.createElement("img")
    img.src=values.image
    img.setAttribute("class","stories");
    let wrap=document.createElement("div");
    wrap.setAttribute("class",`background`);
    let para=document.createElement("p")
    para.textContent=values.name
    div.append(wrap,img,para)
    div.addEventListener("click", () => {
        wrap.classList.toggle("animation");
        setTimeout(() => {
            const videoSrc = encodeURIComponent(values.story); // Encode the URL
            window.location.href = `story.html?video=${videoSrc}`; // Pass video source as a query parameter
        }, 1100);
    });
    
    storyArea.appendChild(div)
}

document.getElementById("navProfile").addEventListener("click",()=>{
    console.log("clicked")
    window.location.href="profile.html"
})


window.addEventListener("load",()=>{
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id === currentUserId);
    document.querySelector("#my-story").src=currentuser.profile || "sources/Default_pfp.svg.png";
    document.querySelector("#profile-holder").src=currentuser.profile || "sources/Default_pfp.svg.png";
})


window.addEventListener("load",()=>{

})



let postCondition=0

window.addEventListener("load",()=>{
    if((localStorage.getItem("currentpost"))){
        postCondition=1
    let postinfo=JSON.parse(localStorage.getItem("currentpost")) ||[]
    let currentuserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users=JSON.parse(localStorage.getItem("users"));
    let currentuser=users.find(user=>user.id==currentuserId)
  let  posts={postid:postinfo[2],id:currentuser.id,date:postinfo[2],likes:0,Comments:[],caption:postinfo[1],mediaurl:postinfo[0],filter:postinfo[3],transform:postinfo[4]};
const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;

let postStorage=JSON.parse(localStorage.getItem("posts"))||[];
postStorage.push(posts);

if(!imageRegex.test(postinfo[0])){
    let reelsstorage=JSON.parse(localStorage.getItem("reels")) || [];
    reelsstorage.push(posts)
    localStorage.setItem("reels",JSON.stringify(reelsstorage));
}
localStorage.setItem("posts",JSON.stringify(postStorage))
localStorage.removeItem("currentpost")
console.log(localStorage);
window.location.href="instagram.html"
    }
}
)

window.addEventListener("load", () => {
    if(postCondition===0){
    let postcount;
    try {
        postcount = JSON.parse(localStorage.getItem("posts")) || [];
        reelscount = JSON.parse(localStorage.getItem("reels")) || [];
    } catch (error) {
        // console.error('Error parsing posts from localStorage:', error);
        postcount = []; // Fallback
        reelscount=[]
    }

    let currentuserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
        console.error('Error parsing users from localStorage:', error);
    }

    let currentuser = users.find(user => user.id == currentuserId);

    if (!currentuser) {
        console.error('Current user not found');
        return; // Exit if user is not found
    }


    for (let values of postcount) {
       
        let postuser=users.find(user=>user.id===values.id)
        let postElement = createPostElement(values,postuser);
        document.querySelector("#import").prepend(postElement);
    }
    // for(let values of reelscount){
        
    //     let postuser=users.find(user=>user.id===values.id)
    //     let postElement = createPostElement(values,postuser);
    //     document.querySelector("#import").prepend(postElement);
    
    // }
}
});


function createPostElement(values,currentuser){
let div1=document.createElement("div");
div1.setAttribute("class","post-area")
let div2=document.createElement("div")
div2.setAttribute("class","post-header");
let div21=document.createElement("div");
div21.onclick=()=>{
    window.location.href=`profileuser2.html?id=${currentuser.id}`
}
div21.style.cursor="pointer";
let div211=document.createElement("div");
let div212=document.createElement("div");
let img=document.createElement("img")
img.setAttribute("class","post-img")
img.src=currentuser.profile || "sources/Default_pfp.svg.png";
div211.appendChild(img);
div212.innerText=`${currentuser.username}`;
div21.append(div211,div212);
let div22=document.createElement("div");


let deleted=document.createElement("div");
deleted.setAttribute("class","delete");
deleted.textContent="Delete"

let img2=document.createElement("img");
img2.src="sources/pngegg (10).png";
img2.setAttribute("class","post-img-icon")
div22.appendChild(img2);
div22.addEventListener("click",()=>{
    let currentuserId = JSON.parse(localStorage.getItem("currentUserId"));
   if(values.id===currentuserId){
    deleted.style.display="block";
    div22.style.display="none"
    setTimeout(() => {
        deleted.style.display="none";
        div22.style.display="block"
    }, 1500);
}
})

deleted.addEventListener("click",()=>{
    let posts=JSON.parse(localStorage.getItem("posts")) || [];
    posts=posts.filter(post=>post.postid !== values.postid);
    localStorage.setItem("posts",JSON.stringify(posts));
    console.log("deleted");
    location.reload()
})


div2.append(div21,div22,deleted);
let div3=document.createElement("div");
let post="";
const imageRegex = /\.(jpg|jpeg|png|gif|webp)$/i;
if(imageRegex.test(values.mediaurl)){
 post=document.createElement("img");
 post.setAttribute("class","fit-video")
 post.style.filter=values.filter;
 post.style.transform=values.transform;
 post.src=values.mediaurl;
}
else{
    post=document.createElement("video");
    post.setAttribute("class","fit-video")
    post.src=values.mediaurl;
    post.autoplay="true";
    post.loop="true";
    post.controls="true";
}

// else{
//     post=document.createElement("video");
//     post.setAttribute("class","fit-video")
//     post.autoplay="true"
//     post.controls="true"
//     post.src=postinfo[0]
// }

let users=JSON.parse(localStorage.getItem("users"));
let currentuserid=JSON.parse(localStorage.getItem("currentUserId"));
let currentUser=users.find(user=>user.id===currentuserid);
currentUser.likes=currentUser.likes || [];


div3.setAttribute("class","run-video");
div3.appendChild(post)

let div4=document.createElement("div");
div4.setAttribute("class","post-info");
let div41=document.createElement("div")
div41.setAttribute("class",`postAllInfo${values.postid}`)
let div42=document.createElement("div");
div41.innerHTML=`
<svg aria-label="Comment" onclick="comment(${values.postid})" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29"
role="img" viewBox="0 0 24 24" width="29">
<title>Comment</title>
<path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none"
    stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
</svg>
<svg aria-label="Share"  class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="29"
role="img" viewBox="0 0 24 24" width="29">
<title>Share</title>
<line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22"
    x2="9.218" y1="3" y2="10.083"></line>
<polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
    stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
</svg>`;
div41.style.cursor="pointer"
currentUser.savedPost=currentUser.savedPost || [];

if(!currentUser.savedPost.includes(values.postid)){
div42.innerHTML=` <svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29"
role="img" viewBox="0 0 24 24" width="29">
<title>Save</title>
<polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor"
    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon>
</svg>`;
}
else{
    div42.innerHTML=`<svg aria-label="Remove" class="x1lliihq x1n2onr6 x5n08af" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>`
}


div42.setAttribute("class",`s${values.postid}`);
div42.style.cursor="pointer";
div42.onclick=()=>{
    savePost(values.postid)
}


if(currentUser.likes.includes(values.postid)){
    div41.innerHTML=`<svg aria-label="Unlike" onclick="like(${values.postid})" fill="red" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`+ div41.innerHTML;
}
else{
    div41.innerHTML=`<svg aria-label="Like" onclick="like(${values.postid})" class="unlike"  fill="currentColor" height="29" role="img" viewBox="0 0 24 24"
    width="29">
    <title>Like</title>
    <path
        d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
    </path>
    </svg>`+div41.innerHTML;
}

div4.append(div41,div42);
let div5=document.createElement("div");
div5.setAttribute("class","likes-count");
div5.setAttribute("id",`l${values.postid}`)
let para=document.createElement("p");
para.innerText=`${values.likes} Likes`
div5.appendChild(para);
let div6=document.createElement("div");
let para1=document.createElement("p");
para1.setAttribute("class","user-dark")
para1.textContent=values.caption;
div6.append(para1);
div1.append(div2,div3,div4,div5,div6)
document.querySelector("#import").prepend(div1);
    }


function comment(id){
    window.location.href=`comment.html?id=${id}`
}


 /////////////////////////////////////////////
function getLocalStorageSize() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const value = localStorage[key];
            total += (key.length + value.length) * 2; // Estimate size in bytes
        }
    }
    return total;
}

const localStorageSize = getLocalStorageSize();
console.log(`Local Storage Size: ${localStorageSize} bytes`);
//////////////////////////////////////////////////////////////


window.addEventListener("load",()=>{
    const element = document.querySelector('#import'); // Replace with your selector

// Get all child nodes
const childNodes = element.childNodes;

// Convert NodeList to an array to safely modify while iterating
const nodesArray = Array.from(childNodes);

// Iterate through the array of nodes
nodesArray.forEach(node => {
    // Check if the node is a text node
    if (node.nodeType === Node.TEXT_NODE) {
        element.removeChild(node);
    }
});

})



function like(postid){

    let users=JSON.parse(localStorage.getItem("users"));
    let currentuserid=JSON.parse(localStorage.getItem("currentUserId"));
    let currentuser=users.find(user=>user.id===currentuserid);
    let likesArray=currentuser.likes || []
    if(!likesArray.includes(postid)){
    likesArray.push(postid);
    currentuser.likes=likesArray;
    localStorage.setItem("users",JSON.stringify(users))
let posts=JSON.parse(localStorage.getItem("posts"));
let currentpost=posts.find(p=>p.postid===postid);
currentpost.likes=currentpost.likes+1;
localStorage.setItem("posts",JSON.stringify(posts));
let changing=document.querySelector(`#l${postid}`);
changing.innerHTML=`<p>${currentpost.likes} Likes</p>`
 let like=document.querySelector(`.postAllInfo${currentpost.postid}`);
const firstChild = like.firstElementChild; // Gets the first element child

if (firstChild) {
    like.removeChild(firstChild); // Remove it
}

 like.innerHTML=`<svg aria-label="Unlike" onclick="like(${postid})" fill="red" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>`+ like.innerHTML;
 console.log("changed1");

 let notification=JSON.parse(localStorage.getItem("notification")) || [];
 notification.push({from:currentuserid,id:currentpost.id,content:"Liked your post",post:currentpost.mediaurl})
 localStorage.setItem("notification",JSON.stringify(notification));
    }
    else{
       currentuser.likes=currentuser.likes.filter(id=>id !== postid);
let posts=JSON.parse(localStorage.getItem("posts"));
let currentpost=posts.find(p=>p.postid===postid);
currentpost.likes=currentpost.likes-1;
let changing=document.querySelector(`#l${postid}`);
changing.innerHTML=`<p>${currentpost.likes} Likes</p>`
localStorage.setItem("users",JSON.stringify(users));
localStorage.setItem("posts",JSON.stringify(posts));
let like=document.querySelector(`.postAllInfo${currentpost.postid}`);
const firstChild = like.firstElementChild; // Gets the first element child

if (firstChild) {
    like.removeChild(firstChild); // Remove it
}

like.innerHTML=`<svg aria-label="Like" onclick="like(${postid})" class="unlike"  fill="currentColor" height="29" role="img" viewBox="0 0 24 24"
width="29">
<title>Like</title>
<path
    d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z">
</path>
</svg>`+like.innerHTML;
console.log("changed");
    }

}



function savePost(postid) {
    let users = JSON.parse(localStorage.getItem("users"));
    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let currentuser = users.find(user => user.id === currentuserid);
    let savedpost = currentuser.savedPost || [];

    // Retrieve posts to update currentpost if needed
    let posts = JSON.parse(localStorage.getItem("posts"));
    let currentpost = posts.find(post => post.postid === postid);

    if (savedpost.includes(postid)) {
        // Remove the post from saved
        currentuser.savedPost = currentuser.savedPost.filter(id => id !== postid);
        currentpost.saved = (currentpost.saved || 0) - 1; // Assuming you want to decrement a saved count
        
        console.log("unsaved");
    } else {
        // Add the post to saved
        savedpost.push(postid);
        currentuser.savedPost = savedpost;
        currentpost.saved = (currentpost.saved || 0) + 1; // Increment saved count
        
        console.log("saved");
    }

    // Update users and posts in localStorage
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("posts", JSON.stringify(posts));

    // Update the display
    let div42 = document.querySelector(`.s${postid}`);
    if (currentuser.savedPost.includes(postid)) {
        div42.innerHTML = `<svg aria-label="Remove" class="x1lliihq x1n2onr6 x5n08af" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Remove</title><path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path></svg>`;
    } else {
        div42.innerHTML = `<svg aria-label="Save" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="29" role="img" viewBox="0 0 24 24" width="29"><title>Save</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>`;
    }
}


if(document.getElementById("go-notification")){
    document.getElementById("go-notification").addEventListener("click",()=>{
        window.location.href="notification.html"
    })
}



//for story..................

if(document.querySelector(".mine")){
 let inputfile=document.querySelector("#story-import");
console.log(inputfile);
    document.querySelector(".mine").addEventListener("click",()=>{
        inputfile.click()
    })
}

document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})