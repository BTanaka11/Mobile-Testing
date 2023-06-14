
let mainDiv = document.querySelector("body");

let exitButton = document.getElementById("Exit");

// let hamburgerMenu = document.querySelector("#hamburger");

let navDiv = document.getElementById("nav_div")

let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str);
}

let mobile = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test")
textMobile.innerHTML = mobile ? 'Mobile' : 'Desktop' ;

let programmaticallyEnteredFullScreen = false;
let programmaticallyLocked = false;

let buttonLogin = document.getElementById("login");
buttonLogin.addEventListener('click', ()=>{
  buttonLogin.style.display = "none";
  if (mobile) {
    if (!document.fullscreenElement) {
      mainDiv.requestFullscreen({ navigationUI: "show" })
      .then(()=>{
        programmaticallyEnteredFullScreen = true;
        handleFullScreen();
      })
    } else {
      handleFullScreen()
    }
  }

})

let handleFullScreen = () => {
  screen.orientation.lock("landscape").then(()=>{programmaticallyLocked=true});
  // navDiv.style.position = "fixed";
  // navDiv.style.display = "none";
  // hamburgerMenu.style.fillOpacity = ".5";

  // hamburgerMenu.addEventListener('click', ()=> {
  //   console.log('hamb')
  //   hamburgerMenu.style.fillOpacity = "0";
  //   hamburgerMenu.style.pointerEvents = "none";
  //   navDiv.style.display = "flex";
  //   mainDiv.addEventListener('click', ()=> {
  //     handleFullScreen();
  //   })
  // });
}



exitButton.addEventListener('click', ()=> {
  console.log('exited!')
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

// document.addEventListener("DOMContentLoaded", ()=>{
//   document.addEventListener("fullscreenchange", (event) => {console.log('changed!')});

// });
