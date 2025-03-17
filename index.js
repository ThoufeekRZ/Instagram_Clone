let buttons = document.querySelectorAll(".option");
let grayScale = document.querySelector("#change-sketch");

let rotateBox = document.querySelectorAll(".rotate-box");
let range = document.querySelector(".range");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate=0,flipHorizontal=1,flipVertical=1;

let targetImage = document.querySelector(".displayed-image"); 

targetImage.src=getQueryParams();

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return params.get('src'); 
}


window.onload = () => {
    buttons[0].click();
}


function applyFilters() {
    targetImage.style.filter = `brightness(${brightness}%) 
                                 saturate(${saturation}%) 
                                 invert(${inversion}%) 
                                 grayscale(${grayscale}%)`;
    targetImage.style.transform=`rotate(${rotate}deg) scale(${flipHorizontal},${flipVertical})`
}

buttons.forEach(element => {
    element.addEventListener("click", (e) => {

        buttons.forEach(newelement => {
            newelement.classList.remove("active");
        });
        element.classList.add("active");
        
  
        grayScale.textContent = `${element.textContent}`;
        

        switch (e.target.id) {
            case "brightness":
                range.value = brightness;
                break;
            case "saturation":
                range.value = saturation;
                break;
            case "inversion":
                range.value = inversion;
                break;
            case "grayscale":
                range.value = grayscale;
                break;
        }
        
        document.querySelector("#scale").textContent = `${range.value}%`;

        applyFilters();
    });
});

range.addEventListener("input", () => {
    document.querySelector("#scale").textContent = `${range.value}%`;


    let activeButton = document.querySelector(".option.active");

    if (activeButton) {
        switch (activeButton.id) {
            case "brightness":
                brightness = parseInt(range.value);
                break;
            case "saturation":
                saturation = parseInt(range.value);
                break;
            case "inversion":
                inversion = parseInt(range.value);
                break;
            case "grayscale":
                grayscale = parseInt(range.value);
                break;
        }

  
        applyFilters();
    }
});


rotateBox.forEach(element => {
    element.addEventListener("click", (e) => {
        rotateBox.forEach(newelement => {
            newelement.classList.remove("activePlus");
        });
        element.classList.add("activePlus");
     if(element.id==="rotate-right")
     rotate-=90;
    else if(element.id==="rotate-left")
    rotate+=90;
else if(element.id==="flip-horizontal")
flipHorizontal= flipHorizontal===1 ? -1 :1;


else if(element.id==="flip-vertical")
flipVertical= flipVertical===1 ? -1 :1;

console.log(element.id);

applyFilters()
  
    });
});


let chooseImage = document.querySelector("#choose-image");
let img = document.querySelector(".img-hidden");

chooseImage.addEventListener("click", () => {
    window.location.href="createpost.html"
});

img.addEventListener("change", () => {
    let file = img.files[0];
    if (file && file.type.startsWith("image")) {
        document.querySelector(".displayed-image").src = URL.createObjectURL(file);
    } else {
        alert("Please select a valid image file.");
    }
});

if(document.querySelector("#resetAll")){
    document.querySelector("#resetAll").addEventListener("click",()=>{
      brightness=100;
      saturation=100;
      grayscale=0;
      inversion=0;
      rotate=0;
      flipHorizontal=1;
      flipVertical=1;
     document.querySelector(".option.active").click()
      applyFilters()
    })
}

document.querySelector("#save-img").addEventListener("click",()=>{
    window.location.href=`createpost.html?filter=${targetImage.style.filter}&transform=${targetImage.style.transform}&src=${getQueryParams()}`
})

document.addEventListener("DOMContentLoaded",()=>{
    if(!localStorage.getItem("currentUserId")){
        window.location.href="loginpage.html"
    }
})