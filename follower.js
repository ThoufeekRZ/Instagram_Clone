function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id'); // Get the 'video' parameter
}

function getQueryParamsF() {
    const params = new URLSearchParams(window.location.search);
    return params.get('Fid'); // Get the 'video' parameter
}

const currentuser= getQueryParams();
const currentuserid=getQueryParamsF()


if(currentuserid){
    
    let users=JSON.parse(localStorage.getItem("users")) || [];

    let currentUser = users.find(user => user.id == Number(currentuserid));
     document.querySelector(".f-header").textContent="Followings"
    let followerList=currentUser.following;
    if(followerList.length>0){
    for(let userids of followerList ){
    let currentuserin=users.find(user=>user.id===userids)
    let div=document.createElement("div");
    div.setAttribute("class","f-user")
    let separate=document.createElement("div");
    separate.setAttribute("class","separate");
    let img=document.createElement("img");
    img.setAttribute("class","f-pro");
    img.src=currentuserin.profile || "sources/Default_pfp.svg.png";
    let finfo=document.createElement("div");
    finfo.setAttribute("class","f-info");
    let fusername=document.createElement("div");
    fusername.setAttribute("class","f-username");
    fusername.textContent=currentuserin.username;
    let newdiv=document.createElement("div");
    newdiv.textContent=currentuserin.fullname;
    let remove=document.createElement("div")
    remove.setAttribute("class","remove");
    remove.textContent="Remove";
    remove.onclick = () => {
        console.log(currentUser);
        console.log(userids);
    
        // Assuming currentUser.followers is an array of IDs
        currentUser.following = currentUser.following.filter(id => id !== userids);
        console.log(currentUser);
    
        let userIndex = users.findIndex(user => user.id === currentUser.id);
        let removeduser=users.find(user=>user.id===userids);
        removeduser.followers=removeduser.followers.filter(id=>id !== currentUser.id);
        let removedUserIndex= users.findIndex(user=>user.id===removeduser.id)
       if(removedUserIndex !== -1){
            users[removedUserIndex]=removeduser;
            localStorage.setItem("users",JSON.stringify(users));
            console.log("removed follower");
       }

        if (userIndex !== -1) {
            users[userIndex] = currentUser; 
            localStorage.setItem("users", JSON.stringify(users)); 
            console.log("removed successfully");
        } else {
            console.log("User not found in users array");
        }
        div.style.display="none"
    };
    
    finfo.append(fusername,newdiv);
    separate.append(img,finfo);
    separate.onclick=()=>{
        window.location.href=`profileuser2.html?id=${currentuserin.id}`;
    }
    let currentUserId=JSON.parse(localStorage.getItem("currentUserId"));
    if(currentUserId===currentUser.id)
    div.append(separate,remove);
else
div.append(separate);

    document.querySelector(".followers-append").appendChild(div)
    }
}
}







if(currentuser){
    console.log(currentuser);
    let users=JSON.parse(localStorage.getItem("users")) || [];
    document.querySelector(".f-header").textContent="Followers"
    let currentUser = users.find(user => user.id == Number(currentuser));
  
    let followerList=currentUser.followers;
    if(followerList.length>0){
    for(let userids of followerList ){
    let currentuserin=users.find(user=>user.id===userids)
    let div=document.createElement("div");
    div.setAttribute("class","f-user")
    let separate=document.createElement("div");
    separate.setAttribute("class","separate");
    let img=document.createElement("img");
    img.setAttribute("class","f-pro");
    img.src=currentuserin.profile || "sources/Default_pfp.svg.png";
    let finfo=document.createElement("div");
    finfo.setAttribute("class","f-info");
    let fusername=document.createElement("div");
    fusername.setAttribute("class","f-username");
    fusername.textContent=currentuserin.username;
    let newdiv=document.createElement("div");
    newdiv.textContent=currentuserin.fullname;
    let remove=document.createElement("div")
    remove.setAttribute("class","remove");
    remove.textContent="Remove";
    remove.onclick = () => {
        console.log(currentUser);
        console.log(userids);
    
        // Assuming currentUser.followers is an array of IDs
        currentUser.followers = currentUser.followers.filter(id => id !== userids);
        console.log(currentUser);
    
        let userIndex = users.findIndex(user => user.id === currentUser.id);
        let removeduser=users.find(user=>user.id===userids);
        removeduser.following=removeduser.following.filter(id=>id !== currentUser.id);
        let removedUserIndex= users.findIndex(user=>user.id===removeduser.id)
       if(removedUserIndex !== -1){
            users[removedUserIndex]=removeduser;
            localStorage.setItem("users",JSON.stringify(users));
            console.log("removed following");
       }

        if (userIndex !== -1) {
            users[userIndex] = currentUser; 
            localStorage.setItem("users", JSON.stringify(users)); 
            console.log("removed successfully");
        } else {
            console.log("User not found in users array");
        }
        div.style.display="none"
    };
    
    finfo.append(fusername,newdiv);
    separate.append(img,finfo);
    separate.onclick=()=>{
        window.location.href=`profileuser2.html?id=${currentuserin.id}`;
    }
    let currentUserId=JSON.parse(localStorage.getItem("currentUserId"));
    if(currentUserId===currentUser.id)
    div.append(separate,remove);
else
div.append(separate);
    document.querySelector(".followers-append").appendChild(div)
    }
}
}

window.addEventListener("load",()=>{
    if(document.querySelector("#profile-holder")){
        let currentuser=JSON.parse(localStorage.getItem("currentUserId"));
        let users= JSON.parse(localStorage.getItem("users"));
        let currentUser=users.find(user=>user.id===currentuser);
        document.querySelector("#profile-holder").src=currentUser.profile;
    }
})

if(document.querySelector("#go-home")){
    document.querySelector("#go-home").addEventListener("click",()=>{
        window.location.href="instagram.html"
    })
}

if(document.querySelector("#go-search")){
    document.querySelector("#go-search").addEventListener("click",()=>{
        window.location.href="search.html"
    })
}

if(document.querySelector("#navProfile")){
    document.querySelector("#navProfile").addEventListener("click",()=>{
        window.location.href="profile.html"
    })   
}

if(document.querySelector("#go-notification")){
    document.querySelector("#go-notification").addEventListener("click",()=>{
        window.location.href="notification.html"
    })
}


document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})



