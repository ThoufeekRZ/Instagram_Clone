if(document.querySelector(".first-area")){
    document.querySelector("#insta-go").addEventListener("click", () => {
        window.location.href = "instagram.html"
    })

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

let postCondition=0;


function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Get the 'video' parameter
}

function getQueryParamsP() {
    const params = new URLSearchParams(window.location.search);
    return params.get('postid'); // Get the 'video' parameter
}

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(()=>{
        let id=getQueryParamsP();
    console.log(id);
    console.log(`postAllInfo${id}`)
    let documents=document.querySelector(`.postAllInfo${id}`) || document.querySelector(`.s${id}`);
    console.log(documents);
    if (documents) {
        documents.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.warn(`Element not found for selector: ${documents}`);
    }
    },10);
    
})


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
  

    let currentuserId = Number(getQueryParams());

    let cureentusernewid=Number(getQueryParamsP())

    let users = [];
    try {
        users = JSON.parse(localStorage.getItem("users")) || [];
    } catch (error) {
        console.error('Error parsing users from localStorage:', error);
    }

    let currentuser = users.find(user => user.id == currentuserId);

    if(currentuserId)
    postcount=postcount.filter(post=>post.id===currentuser.id);
else{
    let currentuser=users.find(user=>user.id===cureentusernewid);
    postcount=postcount.filter(post=>currentuser.savedPost.includes(post.postid));
    console.log(postcount);
}


    for (let values of postcount) {
       
        let postuser=users.find(user=>user.id===values.id)
        let postElement = createPostElement(values,postuser);
       
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
 post.setAttribute("class","fit-video");
 post.style.filter=values.filter;
 post.style.transform=values.transform;
 post.src=values.mediaurl;
}
else{
    post=document.createElement("video");
    post.setAttribute("class","fit-video")
    post.src=values.mediaurl;
    post.controls="true";
    post.autoplay="true";
    post.loop="true";
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
div1.setAttribute("id",`postAllInfo${values.postid}`)
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
div41.style.cursor="pointer";
div41.setAttribute("class",`postAllInfo${values.postid}`)
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
document.querySelector(".displaying").prepend(div1);
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



// let url="https://serpapi.com/search.json?engine=youtube&search_query=Coffee&api_key=ae0dff662394c81360a7c752ebff3262c9573df0a0f5ec95718688c7401f4f53"

// fetch(url)
// .then(Response=>Response.json())
// .then(data=>{
//     console.log(data);
//     showVideo(data)
// })



// function showVideo(data){
//     let shorts=data.shorts_results[0]["shorts"]
//     console.log(shorts);
//     for(let values of shorts){
//         let div=document.createElement("div")
//         div.setAttribute("class","reels")
//         let newDiv=document.createElement("div")
//         newDiv.setAttribute("class","data-holder")
//         let video=document.createElement("video")
//         video.setAttribute("autoplay","")
//         video.setAttribute("class","video-area")
//         video.setAttribute("src",shorts[0].link)
//         div.append(newDiv,video)
//         document.getElementById("import").appendChild(div)
//     }
// }




