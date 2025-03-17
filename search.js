window.addEventListener("load",()=>{

    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users;
  try {
      users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
      console.error('Error parsing users from localStorage:', error);
      users = []; // Fallback to an empty array
  }
  let currentuser = users.find(user => user.id === currentUserId);
  console.log(currentuser);
document.querySelector("#profile-holder").src=currentuser.profile || "sources/Default_pfp.svg.png"
})


if(document.querySelector("#go-home")){
    document.querySelector("#go-home").addEventListener("click",()=>{
        window.location.href="instagram.html"
    })
}

if(document.querySelector("#go-notification")){
    document.querySelector("#go-notification").addEventListener("click",()=>{
        window.location.href="notification.html"
    })
}

if(document.querySelector("#go-create")){
    document.querySelector("#go-create").addEventListener("click",()=>{
        window.location.href="createpost.html"
    })
}

if(document.querySelector("#navProfile")){
    document.querySelector("#navProfile").addEventListener("click",()=>{
        window.location.href="profile.html"
    })
}

// window.addEventListener("load",()=>{
//     updateSearch()
// })


// function updateSearch(){
//     let appendingElement=document.querySelector(".suggest-box")
//     let users=JSON.parse(localStorage.getItem("users"))
//     for(let obj of users){
//        let div=document.createElement("div")
//        div.setAttribute("class","s-user");
//        let img=document.createElement("img");
//        img.setAttribute("class","s-pro");
//        img.src=obj.profile ||"sources/Default_pfp.svg.png";
//        let newdiv=document.createElement("div");
//        newdiv.setAttribute("class","s-info");
//        let para=document.createElement("para");
//        let para1=document.createElement("para");
//        para.setAttribute("class","s-username");
//        para.textContent=obj.username;
//        para1.textContent=obj.fullname;
//        newdiv.append(para,para1);
//        div.append(img,newdiv)
//        appendingElement.append(div)
//     }
// }

let searchInput=document.querySelector("#search-box");

searchInput.addEventListener("input",()=>{
    console.log("changin");
    let inputValue=searchInput.value;
    let appendingElement=document.querySelector(".suggest-box")
    let users=JSON.parse(localStorage.getItem("users"));
    let displayusers=users.filter(user=>user.username.includes(inputValue));
    appendingElement.innerHTML="";
    for(let obj of displayusers){
        let div=document.createElement("div")
        div.setAttribute("class","s-user");
        let img=document.createElement("img");
        img.setAttribute("class","s-pro");
        img.src=obj.profile ||"sources/Default_pfp.svg.png";
        let newdiv=document.createElement("div");
        newdiv.setAttribute("class","s-info");
        let para=document.createElement("para");
        let para1=document.createElement("para");
        para.setAttribute("class","s-username");
        para.textContent=obj.username;
        para1.textContent=obj.fullname;
        newdiv.append(para,para1);
        div.append(img,newdiv)
        div.onclick = () => {
            localStorage.setItem("visitinguser", JSON.stringify(obj));
            window.location.href = "profileuser.html";
        };
        appendingElement.append(div)
        if(searchInput.value.length<1){
            appendingElement.innerHTML=""
        }
     }
})

document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})