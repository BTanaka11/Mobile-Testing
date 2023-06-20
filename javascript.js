
let mainDiv = document.querySelector("body");
let exitButton = document.getElementById("Exit");
let navDiv = document.getElementById("nav_div")

let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str);
}

let mobile = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test")
// textMobile.innerHTML = mobile ? 'Mobile' : 'Desktop' ;
// console.log(document.fullscreenEnabled);
textMobile.innerHTML = document.fullscreenEnabled ? 'true' : 'false';

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