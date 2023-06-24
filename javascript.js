let xx = document.querySelector("body");
let mainDiv = document.getElementById('main_div');
let exitButton = document.getElementById("Exit");
let navDiv = document.querySelector(".nav_div");

let hamburgerButton = document.getElementById("hamburger")
let testbutton = document.getElementById('testbutton');
testbutton.addEventListener('click', ()=>alert('clicked!'))

navDiv.addEventListener('click', (e)=> {
  let rect = e.target.getBoundingClientRect();
  if (rect.left > e.clientX || rect.right < e.clientX || rect.top > e.clientY || rect.bottom < e.clientY) {
    hamburgerButton.style.display = "inline";
    navDiv.close();
  }
})

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
    navDiv.classList.add("mobile");
    // navDiv.setAttribute('mobilizer', 'true')
    mainDiv.prepend(navDiv)

    navDiv.close()
    hamburgerButton.style.display = "inline"
    hamburgMode = true
  } else {
    navDiv.classList.remove("mobile");
    xx.prepend(navDiv)
    navDiv.show()
    hamburgerButton.style.display = "none"
    hamburgMode = false
  }
}
// toggleHamburger()
// setTimeout(()=>toggleHamburger(), 5000);

hamburgerButton.addEventListener('click', ()=> {
  hamburgerButton.style.display = 'none';
  navDiv.showModal()
})

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
      xx.requestFullscreen({ navigationUI: "show" })
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
  if (hamburgMode) {
    toggleHamburger()
  }
});

