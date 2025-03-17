function submitEdit() {
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id === currentUserId);

    if (!currentuser) {
        console.error('User not found');
        return;
    }
    let userChange = document.querySelector("#user-area")
    currentuser.username = userChange.value
    let bio = document.querySelector("#bio-area");
    let gender = document.getElementsByName("gender");
    let usergender;
    for (let values of gender) {
    if(values.checked){
    usergender=values.value;
    }
    }
    currentuser.bio = bio.value;
    currentuser.gender = usergender;
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "profile.html";
}

let fileForProfile = document.getElementById("profile-choose")


document.querySelector(".choose-photo").addEventListener("click", () => {
    console.log("hello");
    selectPost()
})


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


let imgSrc;

let imagesDirectoryHandle = "new_js/sources";

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
                    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.svg'],
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

    if (imgSrc) afterPost();
}


function afterPost() {
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"))
    let users = JSON.parse(localStorage.getItem("users"))
    let currentuser = users.find(user => user.id === currentUserId)
    currentuser.profile = imgSrc;
    document.getElementById("ed-profile").src = currentuser.profile;
    localStorage.setItem("users", JSON.stringify(users))
}





window.addEventListener("load", () => {
    let currentUserId = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id === currentUserId);
    document.querySelector("#ed-user").textContent = currentuser.username;
    document.querySelector("#ed-fullname").textContent = currentuser.fullname;
    document.querySelector("#ed-profile").src = currentuser.profile || "sources/Default_pfp.svg.png";
    document.querySelector("#bio-area").value = currentuser.bio || "";
    if(currentuser.gender)
   document.querySelector(`input[value=${currentuser.gender}]`).checked = true;

//    .value = currentuser.gender || "";
    document.querySelector("#user-area").value = currentuser.username || "";
})



if (document.querySelector(".first-area")) {
    document.querySelector("#insta-go").addEventListener("click", () => {
        window.location.href = "instagram.html"
    })

    document.querySelector("#nav-post").addEventListener("click", () => {
        window.location.href = "createpost.html"
    });

    document.querySelector("#go-search").addEventListener("click", () => {
        window.location.href = "search.html"
    })


    document.querySelector("#go-profile").addEventListener("click", () => {
        window.location.href = "profile.html"
    })

    let currentuserid = JSON.parse(localStorage.getItem("currentUserId"));
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentuser = users.find(user => user.id == currentuserid)
    document.querySelector("#profile-holder").src = currentuser.profile || "sources/Default_pfp.svg.png";
}

localStorage.removeItem("visitinguser")

document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("currentUserId")) {
        window.location.href = "loginpage.html"
    }
})