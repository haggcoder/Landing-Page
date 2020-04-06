/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let sections = document.getElementsByTagName("section");
let navBar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
function getActiveElement(){
    // Function will return the section which is closest to the viewport top.
    let activeElement = sections[0];
    let activeElementDistance = Math.abs(activeElement.getBoundingClientRect().top);
    // Loop through all sections to find section with minimum top, ie. distance from viewport top.
    for(section of sections){
        let d = Math.abs(section.getBoundingClientRect().top);
        if(d < activeElementDistance){
            activeElement = section;
            activeElementDistance = d;
        }
    }
    return activeElement;
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for(section of sections){
        // Creating new <li> element for each section.
        let item = document.createElement("li");
        item.textContent = section.getAttribute("data-nav");
        item.dataset.nav = section.id;
        navBar.appendChild(item);
        item.setAttribute("class","menu__link");
    }
};

// Add class 'active' to section when near top of viewport
function setActive(){
    document.addEventListener('scroll', function(){
        // Out of all sections, the section in active state is styled.
        let activeElement = getActiveElement();
        for(section of sections){
            if(section.id === activeElement.id){
                activeElement.classList.add("your-active-class");
            }else{
                section.classList.remove("your-active-class");
            }
        }
        // Style navigation link, associated with currently active section.
        let childrens = navBar.children;
        for(children of childrens){
            if(children.dataset.nav === activeElement.id){
                children.classList.add("active__link");
            }else{
                children.classList.remove("active__link");
            }
        }
    });
}

// Scroll to anchor ID using scrollTO event
function navigationScroll(){
    navBar.addEventListener('click', function(event){
        // Clicked <li> has "data-nav" attribute which is id of section to scroll to.
        let id = event.target.getAttribute("data-nav");
        let e = document.getElementById(id);
        e.scrollIntoView({block: 'end', behavior: 'smooth'});
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
navigationScroll();

// Set sections as active
setActive();

