//check if there's local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null){

    document.documentElement.style.setProperty('--main-color' , localStorage.getItem("color_option"));

    //remove active class from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        //add active class on element with data-color === local storage item
        if (element.dataset.color === mainColors) {

            //add active class 
            element.classList.add("active");

        }

    });

};

//random background option 
let backgroundOption = true;

//variable to control the interval background
let backgroundInterval;

//toggle spin class on icon
document.querySelector(".toggle-settings #gear").onclick = function (){

    //toggle class fa-spin for rotation on self
    this.classList.toggle("fa-spin");

    //toggle class open on main settings box
    document.querySelector(".settings-box").classList.toggle("open");

}

//Switch Colors
const colorLi = document.querySelectorAll(".colors-list li");

//loop on all list items
colorLi.forEach(li => {

    //click om every list items
    li .addEventListener("click" , (e) => {

        //set color on root
        document.documentElement.style.setProperty('--main-color' , e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color_option" , e.target.dataset.color);

        // //remove active class from all children
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {

        //     element.classList.remove("active");

        // });

        // //add active class on self
        // e.target.classList.add("active");
        handleActive(e);


    });

});


//Switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

//loop on all spans
randomBackEl.forEach(span => {

    //click om every span
    span .addEventListener("click" , (e) => {

        // //remove active class from all children
        // e.target.parentElement.querySelectorAll(".active").forEach(element => {

        //     element.classList.remove("active");

        // });

        // //add active class on self
        // e.target.classList.add("active");
        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            
            randomizeImgs();
        } else{
            backgroundOption = false;

            clearInterval(backgroundInterval);
        }

    });

});


//Select landing page Element
let landingPage = document.querySelector(".landing-page");

//Get Array of Images
let imgsArray =["back1.jpg","back2.jpg","back3.jpg","back4.jpg","back5.jpg"];

//function to randomize imgs
function randomizeImgs() {

    if (backgroundOption === true) {


        backgroundInterval = setInterval(() => {

            //Get Random Number 
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            //change Background image url
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")'
        },10000)

    }

}
randomizeImgs()


//Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {

    //Skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;

    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height
    let windowHeight = this.innerHeight;

    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight -windowHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    }
}


//create Popup with the image
let outGallery = document.querySelectorAll(".gallery img");

outGallery.forEach(img => {

    img.addEventListener('click' , (e) => {

        //Create Overlay Element 
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = 'popup-overlay';
        
        //append Overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");

        //add class to the popup box
        popupBox.className = 'popup-box';

        //check img alt
        if (img.alt !== null) {

            //create heading
            let imgHeading = document.createElement("h3");

            //create text for heading 
            let imgText = document.createTextNode(img.alt);

            //append the text to the heading
            imgHeading.appendChild(imgText);

            //append the heading to the popup box
            popupBox.appendChild(imgHeading)

        }

        //create the image
        let popupImage = document.createElement("img");

        //set image source
        popupImage.src = img.src;
        
        //add image to popup box 
        popupBox.appendChild(popupImage);

        //append the popup box to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //create the close button text 
        let closeButtonText = document.createTextNode("X");

        //append text to close button
        closeButton.appendChild(closeButtonText);

        //add class to close button
        closeButton.className = 'close-button';

        //add close button to the popup box
        popupBox.appendChild(closeButton);

    });
});

//close popup
document.addEventListener("click" , (e) => {

    if (e.target.className == 'close-button') {
        //remove the current popup
        e.target.parentNode.remove();

        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");



//select all links
const allLinks = document.querySelectorAll(".links a")

function scrollToAllThings (elements) {

    elements.forEach(ele => {

        ele.addEventListener("click" , (e) => {

            e.preventDefault();
        
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior :"smooth"
    
            });
    
        });
    
    });

};
scrollToAllThings(allBullets);
scrollToAllThings(allLinks);

//handle active state
function handleActive(ev) {

    //remove active class from all children
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    //add active class on self
    ev.target.classList.add("active");

}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach( span => {

        span.classList.remove("active");
    });

    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block'
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = 'none'
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    
    span.addEventListener("click" , (e) => {

        if (span.dataset.display === 'show'){
            bulletsContainer.style.display ='block';
            localStorage.setItem("bullets_option" , 'block')
        }else{
            bulletsContainer.style.display = 'none'
            localStorage.setItem("bullets_option" , 'none')
        }
        handleActive(e);
    });
});

//Reset button
document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");

    //reload window
    window.location.reload();
}

//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    //stop propagation
    e.stopPropagation();

    //toggle class "menu-active" on button
    this.classList.toggle("menu-active");

    //toggle class "open" on links
    tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button
document.addEventListener("click" , (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

         //check if menu is open
        if (tLinks.classList.contains("open")){

            //toggle class "menu-active" on button
            toggleBtn.classList.toggle("menu-active");

            //toggle class "open" on links
            tLinks.classList.toggle("open");
        }
    }

});

//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}