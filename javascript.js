let xx = document.querySelector("body");
let mainDiv = document.getElementById('main_div');
let exitButton = document.getElementById("Exit");
let navDiv = document.querySelector(".nav_div");
let redDiv = document.getElementById('redDiv');
let buttonLogin = document.getElementById("login");

let hamburgerButton = document.getElementById("hamburger")
let testbutton = document.getElementById('testbutton');
testbutton.addEventListener('click', ()=>alert('clicked!'))

let checkIfMobile = () => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(navigator.userAgent);
}

let checkLandscapeOrient = () => {
  let orient = screen.orientation.type;
  return orient === 'landscape-primary' || orient === 'landscape-secondary'
};

let turnOnHamburger = () => {
  mainDiv.append(navDiv)
  navDiv.setAttribute('mobile', 'true');
  // navDiv.style.display = 'none';
  navDiv.style.visibility = 'hidden';
  hamburgerButton.style.visibility = 'visible';
  redDiv.innerHTML = ""
}

let turnOffHamburger = () => {
  xx.prepend(navDiv)
  navDiv.setAttribute('mobile', 'false');
  navDiv.style.visibility = 'visible';
  hamburgerButton.style.visibility = "hidden"
  redDiv.innerHTML = "Please rotate screen 90 degrees for the best experience";
}

let handleChange = () => {
  if (checkIfMobile()) {
    if (checkLandscapeOrient() && navDiv.getAttribute('mobile') === 'false') {
      turnOnHamburger()
    } else if (!checkLandscapeOrient() && navDiv.getAttribute('mobile') === 'true') {
      turnOffHamburger()
    } else if (!checkLandscapeOrient() && navDiv.getAttribute('mobile') === 'false') {
      redDiv.innerHTML = "Please rotate screen 90 degrees for the best experience";
    }
  }
}

screen.orientation.addEventListener('change', function() {
  handleChange();
})

navDiv.addEventListener('click', (e)=> {
  let rect = e.target.getBoundingClientRect();
  if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) {
    hamburgerButton.style.visibility = "visible";
    navDiv.style.visibility = 'hidden';
  }
})

hamburgerButton.addEventListener('click', ()=> {
  hamburgerButton.style.visibility = 'hidden';
  navDiv.style.visibility = 'visible';
})

let programmaticallyEnteredFullScreen = false;
let programmaticallyLocked = false;

buttonLogin.addEventListener('click', ()=>{
  buttonLogin.style.visibility = "hidden";
  if (checkIfMobile()) {
    if (document.fullscreenElement) {
      programmaticallyEnteredFullScreen = false;
      handleFullScreen()
    } else {
      xx.requestFullscreen({ navigationUI: "show" })
      .then(()=>{
        programmaticallyEnteredFullScreen = true;
        handleFullScreen();
      })
      .catch(()=> {
        programmaticallyEnteredFullScreen = false;
      })
    }
    handleChange()
  }
})

let handleFullScreen = () => {
  screen.orientation.lock("landscape")
  .then(
    ()=>{
      programmaticallyLocked = true
    }
  )
  .catch(()=>{
    programmaticallyLocked=false
  })
}

exitButton.addEventListener('click', ()=> {
  buttonLogin.style.visibility = "visible";

  if (programmaticallyEnteredFullScreen) {
    document.exitFullscreen()
    .then(()=> {programmaticallyEnteredFullScreen = false;})
    .catch(()=>{document.getElementById('full_screen_enabled_test').innerHTML="108"})
  }

  if (programmaticallyLocked) {
    screen.orientation.unlock()
    .then(()=>{programmaticallyLocked = false;})
    .catch(()=>{document.getElementById('full_screen_enabled_test').innerHTML="114"});
  }

  if (navDiv.getAttribute('mobile') === 'true') {
    turnOffHamburger();
  }
});