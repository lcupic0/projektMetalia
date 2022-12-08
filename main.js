const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const menuIcons = document.querySelector(".item-picture");
const menuItem = document.querySelector(".izbornik-item");

navToggle.addEventListener('click', () => {
    primaryNav.toggleAttribute("data-visible");
    primaryNav.hasAttribute("data-visible") ? navToggle.setAttribute("aria-expanded", true) : navToggle.setAttribute("aria-expanded", false);
    document.body.classList.toggle("lock-scroll");
    navToggle.classList.toggle("change");
})


// IMAGE CAROUSEL - from scratch
const track = document.querySelector(".carousel__track");
console.log(track);
const slides = Array.from(track.children);
console.log(slides);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

// Dohvacamo size samo od jednog slide-a jer ionako svi slideovi moraju biti iste velicine (WIDTH-a).
//The Element.getBoundingClientRect() method returns a DOMRect object providing information about the size of an element and its position relative to the viewport.
const slideSize = slides[0].getBoundingClientRect(); //all info!
const slideWidth = slideSize.width; // just width!
// ili const slideWidth = slides[0].getBoundingClientRect().width;

// arrange the slides next to one another
// slides[0].style.left = slideWidth*0 + "px";
// slides[1].style.left = slideWidth*1 + "px";
// slides[2].style.left = slideWidth*2 + "px";

// ARROW function
//The forEach() method executes a provided function once for each array element.
const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + "px";
}
slides.forEach(setSlidePosition); //Kako ovo gori uspijeva kad nismo poslali "slide" a ni "index"???????????

const moveToSlide = (track, currentSlide, targetSlide) => {  // Dakle pomicemo cijeli ul na lokaciju od nekog slajda pa tako dobijamo drugu sliku?
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; // Ide minus jer idemo na tu lokaciju ulijevo(ulijevo idemo i kad kliknemo left arrow jer idemo na neku "minus" lokaciju)
    //track.style.transform = `translateX(-${targetSlide.style.left})`; // Mozemo i koristeci templateStrings
    currentSlide.classList.remove("current-slide"); //Paziti jer ovdje ne stavljamo .currentList
    targetSlide.classList.add("current-slide");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide"); // u toj klasi samo zatamnimo background točke
    targetDot.classList.add("current-slide");
}

const hideShowArrows = (slides,prevButton,nextButton,targetIndex) => {
    if(targetIndex === 0){
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    }else if(targetIndex === slides.length-1){
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    }else{
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
}

// When i click LEFT, move slides to the left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);


    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);

    hideShowArrows(slides,prevButton,nextButton,prevIndex);
})

// When i click RIGHT, move slides to the right
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector(".current-slide");  
    const nextSlide = currentSlide.nextElementSibling;  
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);

    hideShowArrows(slides,prevButton,nextButton,nextIndex);
})

// When i click nav indicators, move to that slide.
// Koristit cemo jedan eventListener a ne 3 jer bolje je imati sto manje eventListenera ako mozemo radi performansi.
dotsNav.addEventListener("click", e => {
    const targetDot = e.target.closest('button');
    // e is tracking the event itself - and gives me all information about that "click" event in this case.
    
    if(!targetDot) return; //ako kliknemo na botun nastavi, ako ne kliknemo dobijemo NULL i izademo iz funkcije

    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    // findIndex je kao for petlja koja prolazi kroz sve elemente niza "dots" i vraca index onog "dot" koji je zapravo jednak "targetDot" kojeg smo kliknuli.
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides,prevButton,nextButton,targetIndex);
})
// IMAGE CAROUSEL - KRAJ OVE APLIKACIJE