// select all the sections

const sections = document.querySelectorAll('section');

// select the navigation containing ul by id

const navigation = document.getElementById('navbar__list');

// select all the navigation links by class
const links = document.querySelectorAll('.menu__link');

/** 
 * @description function for creating the navigation bar and adding sections dynamically 
*/

function createNav(){
    navigation.innerHTML = "";
    sections.forEach(function(section) {
        // getting the value of data-nav 
        const navName = section.dataset.nav;
        const navLi = `<li><a class="menu__link" data-nav="${section.id}" 
        href="#${section.id}">${navName}</a></li>`;
        navigation.insertAdjacentHTML("beforeend", navLi);
    });
};


// function to activate section if in viewport

function activate () {
    sections.forEach( function(section){
        let activeLink = navigation.querySelector(`[data-nav=${section.id}]`);
        const sectionOffset = offset(section);
        inViewPort = sectionOffset <= 150 && sectionOffset >= -400;
            addActive(inViewPort, section, activeLink);
    });
};

//check the distance of the section  from the top

function offset(section) {
    return section.getBoundingClientRect().top;
};

// function to add active class to active section and link

function addActive(condition, section, activeLink) {
    if (condition) {
        section.classList.add('your-active-class');
        activeLink.classList.add("your-active-link");
    }else{
        section.classList.remove("your-active-class");
        activeLink.classList.remove("your-active-link");
    };
};

function addHighlight(link) {
    link.style.backgroundColor = "black";
    link.style.color = "white";
};


// function controlling smooth scrolling behavior

const scrollBehavior = function(scroll){
    scroll.preventDefault();
    if (scroll.target.dataset.nav) {
      document.getElementById(`${scroll.target.dataset.nav}`).scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        location.hash = `${scroll.target.dataset.nav}`;
      }, 200);
    }
};



//calling the function to create the navigation menu

createNav();

// event listener to check if user is scrolling through page

window.addEventListener('scroll', activate);

navigation.addEventListener("click", scrollBehavior);
