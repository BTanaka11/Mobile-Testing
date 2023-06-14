
let mainDiv = document.querySelector("#main_div");

let exitButton = document.getElementById("Exit");

let hamburgerMenu = document.querySelector("#hamburger");

let navDiv = document.getElementById("nav_div")


let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str);
}

let mobile = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test")
textMobile.innerHTML = mobile ? 'Mobile' : 'Desktop' ;

let programmaticallyEnteredFullScreen = false;

let buttonLogin = document.getElementById("login");
buttonLogin.addEventListener('click', ()=>{
  buttonLogin.style.display = "none";
  if (mobile) {
    if (!document.fullscreenElement) {
      mainDiv.requestFullscreen()
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
  screen.orientation.lock("landscape");
  navDiv.style.position = "fixed";
  navDiv.style.display = "none";
  hamburgerMenu.style.fillOpacity = ".5";

  hamburgerMenu.addEventListener('click', ()=> {
    hamburgerMenu.style.fillOpacity = "0";
    hamburgerMenu.style.pointerEvents = "none";
    navDiv.style.display = "flex";
    mainDiv.addEventListener('click', ()=> {
      handleFullScreen();
    })
  });
}



exitButton.addEventListener('click', ()=> {
  console.log('exited!')
  buttonLogin.style.display = "inline-block";
  screen.orientation.unlock();
  if (programmaticallyEnteredFullScreen) {
    document.exitFullscreen();
    programmaticallyEnteredFullScreen = false;
  }
});

// document.addEventListener("DOMContentLoaded", ()=>{
//   document.addEventListener("fullscreenchange", (event) => {console.log('changed!')});

// });
