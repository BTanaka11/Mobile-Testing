

let checkIfMobile = (str) => {
  let regexd = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
  return regexd.test(str) ? 'Mobile' : 'Desktop'
}

let mobileTestResult = checkIfMobile(navigator.userAgent);

let textMobile = document.getElementById("mobile_Test");
textMobile.innerHTML = checkIfMobile(navigator.userAgent)

if (mobileTestResult === 'Mobile') {
  screen.orientation.lock("landscape");
}

// console.log(screen.orientation)
let orientationText = document.getElementById("orientionChange");

screen.addEventListener("orientationchange", () => {
  orientationText.innerHTML = `Screen orientation changed: ${screen.orientation}`
});