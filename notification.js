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

window.addEventListener("load",()=>{
    let display=document.querySelector(".suggest-box")
let notification=JSON.parse(localStorage.getItem("notification")) || [];
let currentuserid=JSON.parse(localStorage.getItem("currentUserId"));
let currentnotify=notification.filter(obj=>obj.id===currentuserid);
let users=JSON.parse(localStorage.getItem("users")) || [];
let currentuser=users.find(user=>user.id===currentuserid);
myFollowings=currentuser.following;
console.log(myFollowings);
for(let values of currentnotify){
   
    let followeduser=users.find(user=>user.id=== values.follower);
    let likedUser=users.find(user=>user.id===values.from);
    let notifyBox=document.createElement("div");
    notifyBox.setAttribute("class","notify-box");
    let img=document.createElement("img");
    img.setAttribute("class","notify-img");
    if(followeduser)
    img.src=`${followeduser.profile}`;
else
img.src=`${likedUser.profile}`
    let notifyInfo=document.createElement("div");
    notifyInfo.setAttribute("class","notify-info");
    let para=document.createElement("P");
    para.setAttribute("class","notify-message");
    let span=document.createElement("span");
    span.setAttribute("class","notify-user");
    if(values.content==="Liked your post"){
        let rightBox=document.createElement("div");
        rightBox.setAttribute("class","right-box");
        let notifyPost=document.createElement("img");
        notifyPost.setAttribute("class","notify-post");
        notifyPost.src=`${values.post}`
       rightBox.appendChild(notifyPost);
       para.textContent=` ${values.content}`
       span.textContent=`${likedUser.username}`;
       span.onclick=()=>{
        window.location.href=`profileuser2.html?id=${likedUser.id}`;
       }
       para.prepend(span);
       notifyInfo.append(para,rightBox);
       notifyBox.append(img,notifyInfo);
       display.appendChild(notifyBox);
    }
    else if(values.content==="Commented on your post"){
        let rightBox=document.createElement("div");
        rightBox.setAttribute("class","right-box");
        let notifyPost=document.createElement("img");
        notifyPost.setAttribute("class","notify-post");
        notifyPost.src=`${values.post}`
       rightBox.appendChild(notifyPost);
       para.textContent=` ${values.content}`
       span.textContent=`${likedUser.username}`;
       span.onclick=()=>{
        window.location.href=`profileuser2.html?id=${likedUser.id}`;
       }
       let newspan=document.createElement("span");
       newspan.textContent=`: ${values.comments}`;
       newspan.style.fontWeight="600";
       para.prepend(span);
       para.append(newspan)
       notifyInfo.append(para,rightBox);
       notifyBox.append(img,notifyInfo);
       display.appendChild(notifyBox);
    }
    else{
        let notifyFollowing=document.createElement("div");
        notifyFollowing.setAttribute("class","notify-following");
        if(myFollowings.includes(followeduser.id))
       notifyFollowing.textContent="Following";
    else
    notifyFollowing.textContent="Follow";


    notifyFollowing.addEventListener("click", () => {
        let user=followeduser;
       location.reload()
        if (!currentuser.following.includes(user.id)) {
            currentuser.following.push(user.id);
            user.followers.push(currentuser.id);
            
            // Update localStorage after following
            let users = JSON.parse(localStorage.getItem("users")) || [];

            const userIndex = users.findIndex(u => u.id === user.id);
            const currentUserIndex=users.findIndex(u=>u.id===currentuser.id)
            if(currentUserIndex !== -1){
                users[currentUserIndex] = currentuser; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            if (userIndex !== -1) {
                users[userIndex] = user; // Update the user data with new followers
                localStorage.setItem("users", JSON.stringify(users));
            }
            followerscount.textContent=user.followers ? user.followers.length:0 +1;
            console.log(`Now following ${user.username}`);
            let notification=JSON.parse(localStorage.getItem("notification")) || [];
            notification.push({id:user.id,follower:currentuser.id,content:"Started following you"})
            localStorage.setItem("notification",JSON.stringify(notification));
        } else {
           currentuser.following=currentuser.following.filter(id=>id !== user.id);
           user.followers=user.followers.filter(id=>id !== currentuser.id);
           let users = JSON.parse(localStorage.getItem("users")) || [];
          
           const userIndex = users.findIndex(u => u.id === user.id);
           const currentUserIndex=users.findIndex(u=>u.id===currentuser.id)
           if(currentUserIndex !== -1){
               users[currentUserIndex] = currentuser; // Update the user data with new followers
               localStorage.setItem("users", JSON.stringify(users));
           }
           if (userIndex !== -1) {
               users[userIndex] = user; // Update the user data with new followers
               localStorage.setItem("users", JSON.stringify(users));
           }
           followerscount.textContent=user.followers ? user.followers.length:0 -1;
           console.log(`unfollowed ${user.username}`);
          
        }
     
    });



       para.textContent=` ${values.content}`
       span.textContent=`${followeduser.username}`
       span.onclick=()=>{
        window.location.href=`profileuser2.html?id=${followeduser.id}`;
       }
       para.prepend(span)
       notifyInfo.append(para,notifyFollowing);
       notifyBox.append(img,notifyInfo);
       display.appendChild(notifyBox);
    }
}
})


document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})