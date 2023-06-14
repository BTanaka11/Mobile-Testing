let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str);
}

let mobile = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test")
textMobile.innerHTML = mobile ? 'Mobile' : 'Desktop' ;


let buttonLogin = document.getElementById("login");
buttonLogin.addEventListener('click', ()=>{
  buttonLogin.style.display = "none";
  if (mobile) {
    if (!document.fullscreenElement) {
      mainDiv.requestFullscreen()
      .then(()=>handleFullScreen())
    } else {
      handleFullScreen()
    }
  }

})

let handleFullScreen = () => {
  screen.orientation.lock("portrait");
}


let mainDiv = document.querySelector("body");

document.addEventListener("DOMContentLoaded", ()=>{
  document.addEventListener("fullscreenchange", (event) => {console.log('changed!')});

});
// if (mobileTestResult) {
//   if (!document.fullscreenElement) {
//     document.requestFullscreen()
//   }
//   screen.orientation.lock("landscape");
//   document.requestFullscreen
// }

// // console.log(screen.orientation)
// let orientationText = document.getElementById("orientionChange");

// screen.addEventListener("orientationchange", () => {
//   orientationText.innerHTML = `Screen orientation changed: ${screen.orientation}`
// });