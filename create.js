let inputFile = document.getElementById("set-post")


// function selectPost() {
//     inputFile.click()
// }

let imgSrc=""
let caption="";
let newFilter;
let newTransform;

localStorage.removeItem("visitinguser")
const imageRegex = /\.(jpg|jpeg|png|gif|webp|svg)$/i;

// inputFile.addEventListener("change", () => {
//    let file = inputFile.files[0];
//     console.log(file);
//     if (file) {
//         let reader = new FileReader();
//         reader.onload = (e) => {
//             document.querySelector(".post-head").innerHTML = "Crop";
//             document.getElementById("photo-swap").style.backgroundImage = `url(${e.target.result})`;
//             imgSrc=e.target.result;
//             document.getElementById("photo-swap").style.backgroundSize = "cover";
//             document.getElementById("photo-swap").innerHTML = ""; // Clear previous content;
//             document.querySelector(".before-post").style.display="block";
//             document.querySelector(".after-post").style.display="block";
//              document.querySelector(".close").style.display="none"
//     document.querySelector(".close-step").style.display="none"
//         };
//         reader.readAsDataURL(file);
      
//     }
// });


let imagesDirectoryHandle="new_js/sources";

async function selectPost() {
    try {
        // If the directory handle is not set, prompt the user to select the directory
        if (!imagesDirectoryHandle) {
            imagesDirectoryHandle = await window.showDirectoryPicker();
            console.log('Directory selected:', imagesDirectoryHandle);
        }

        // Open the file picker for image and video files
        const [fileHandle] = await window.showOpenFilePicker({
            types: [{
                description: 'Images and Videos',
                accept: {
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif','.svg'],
                    'video/*': ['.mp4', '.webm', '.ogg']
                },
            }],
        });

         imgSrc = `sources/${fileHandle.name}`;
         console.log(imgSrc);
         const file = await fileHandle.getFile();
        console.log(`File Name: ${file.name}, Size: ${file.size}, Type: ${file.type}`);

        const blob = new Blob([file], { type: file.type });
        const newFileHandle = await imagesDirectoryHandle.getFileHandle(file.name, { create: true });
        
        // Check if the file is being created correctly
        console.log(`Attempting to save file as: ${newFileHandle.name}`);
        
        const writable = await newFileHandle.createWritable();
        await writable.write(blob);
        await writable.close();

        console.log('File saved successfully in:', imagesDirectoryHandle.name);
    } catch (error) {
        console.error('Error:', error.message);
    }
    
    if (imgSrc){
        if(imageRegex.test(imgSrc))
    window.location.href=`index.html?src=${imgSrc}`;
else
afterPost()
    }
}



function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    if(params.get("filter"))
    afterPost(params.get("filter"),params.get("transform"),params.get("src")); 
}

let filters=getQueryParams()



function afterPost(filter,transform,src) {
    console.log("na vanthutan");
    console.log(imgSrc.length);
   if(imgSrc.length<1)
   imgSrc=src
let img;
    if (imageRegex.test(imgSrc)) {
         img = document.createElement("img");
        img.setAttribute("class", "just-show");
        img.src = `${imgSrc}`;
        img.style.filter=filter;
        img.style.transform=transform;
        newFilter=filter;
        newTransform=transform;
    } else {
         img = document.createElement("video");
        img.setAttribute("class", "just-show");
        img.src = `${imgSrc}`;
        img.autoplay="true";
        img.loop="true"
        img.onclick=()=>{
            if(img.paused){
                img.play()
            }
            else{
                img.pause()
            } 
        }
    }

    document.querySelector(".post-head").innerHTML = "Crop";
    document.getElementById("photo-swap").innerHTML = ""; // Clear previous content
    document.getElementById("photo-swap").appendChild(img);
    document.querySelector(".before-post").style.display = "block";
    document.querySelector(".after-post").style.display = "block";
    document.querySelector(".close").style.display = "none";
    document.querySelector(".close-step").style.display = "none";
}







function appendPost() {
    let div1 = document.createElement("div");

}

console.log(window.location);


function back() {
  window.location.href="createpost.html"
}

function next(){
    console.log(imgSrc);
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id === currentUserId);
    document.querySelector("#create-post").id="create-post1"
    document.getElementById("photo-swap").style.width="60%"
    let div=document.createElement("div");
    div.setAttribute("class","caption")
    let img=document.createElement("img");
    let para=document.createElement("p");
    para.textContent=`${currentuser.username}`
    let newdiv=document.createElement("div");
    let newdiv1=document.createElement("div");
    newdiv1.setAttribute("class","newdiv1")
    newdiv.setAttribute("class","newdiv");
    para.style.fontWeight="900";
    img.src=`${currentuser.profile}`
    console.log(currentuser);
    img.setAttribute("class","caption-img")
    newdiv.append(img,para);
    newdiv1.textContent="caption for the image"
    newdiv1.contentEditable="true";
    div.append(newdiv,newdiv1);
    document.querySelector(".after-post").style.display="none";
    document.querySelector(".share-post").style.display="block"
    document.querySelector("#create-post1").appendChild(div)
    document.querySelector(".share-post").style.display="block"
    document.querySelector(".post-head").innerHTML = "Create new post";
    document.querySelector(".close").style.display="none"
    document.querySelector(".close-step").style.display="none"
}


function share() {
    caption = document.querySelector(".newdiv1").textContent;
    document.querySelector("#create-post1").id = "create-post"
    document.getElementById("photo-swap").style.width = "100%"
    document.querySelector(".caption").remove()
    inputFile.value = "";
    document.getElementById("photo-swap").style.backgroundImage = "none";
    document.querySelector(".share-post").style.display = "none"
    document.querySelector(".before-post").style.display="none"
    document.querySelector(".post-head").innerHTML = "share";
    document.getElementById("photo-swap").innerHTML=`<p style="font-weight:900">Shared Successfully</p>`
    document.querySelector(".close").style.display="block";
    document.querySelector(".close-step").style.display="block"
    let currentpost=[imgSrc,caption,Date.now(),newFilter,newTransform]
    localStorage.setItem("currentpost",JSON.stringify(currentpost));
    console.log([imgSrc,caption]);
}

document.querySelector(".close").addEventListener("click",()=>{
    console.log("hi");
    window.location.href="instagram.html"
})



  

document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})




