
let mainDiv = document.querySelector("body");
let exitButton = document.getElementById("Exit");
let navDiv = document.getElementById("nav_div")
let hamburgerButton = document.getElementById("hamburger")

let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str);
}

let mobile = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test")
textMobile.innerHTML = mobile ? 'You are on Mobile' : 'You are on Desktop' ;

let checkLandscapeOrient = () => {
  let orient = screen.orientation.type;
  return orient === 'landscape-primary' || orient === 'landscape-secondary'
};

let hamburgMode = false;
let toggleHamburger = () => {
  if (!hamburgMode) {
    navDiv.style.position = 'absolute'
    navDiv.style.open = "false"
    hamburgerButton.style.display = "inline"
    hamburgMode = true
  } else {
    navDiv.style.position = 'relative'
    navDiv.style.open = "true"
    hamburgerButton.style.display = "none"
    hamburgMode = false
  }
}
toggleHamburger()
setTimeout(()=>toggleHamburger(), 5000);

if (checkLandscapeOrient() && mobile) {
  toggleHamburger()
}

screen.orientation.addEventListener('change', function(e) {
  if (mobile) {
    toggleHamburger()
  }
})

let fullScreenEnabled = document.getElementById("full_screen_enabled_test")
fullScreenEnabled.innerHTML = document.fullscreenEnabled ? 'fullscreen enabled' : 'fullscreen disabled';

let programmaticallyEnteredFullScreen = false;
let programmaticallyLocked = false;

let buttonLogin = document.getElementById("login");

buttonLogin.addEventListener('click', ()=>{
  buttonLogin.style.display = "none";
  if (mobile) {
    if (document.fullscreenElement) {
      programmaticallyEnteredFullScreen = false;
      handleFullScreen()

    } else {
      mainDiv.requestFullscreen({ navigationUI: "show" })
      .then(()=>{
        programmaticallyEnteredFullScreen = true;
        handleFullScreen();
      })
      .catch(()=> {
        alert('Please rotate screen 90 degrees for the best experience');
        programmaticallyEnteredFullScreen = false;
      })
    }
  }

})

let handleFullScreen = () => {
  screen.orientation.lock("landscape")
  .then(
    ()=>{programmaticallyLocked=true}
  )
  .catch(()=>{programmaticallyLocked=false})
}

exitButton.addEventListener('click', ()=> {

  buttonLogin.style.display = "inline-block";
  if (programmaticallyLocked) {
    screen.orientation.unlock();
    programmaticallyLocked = false;
  }

  if (programmaticallyEnteredFullScreen) {
    document.exitFullscreen();
    programmaticallyEnteredFullScreen = false;
  }
});

