var SpeechRecognition = window.webkitSpeechRecognition;
let arrow = document.getElementById('arrow');
let recognition = new SpeechRecognition();
let txtbx = document.getElementById('textbox');

function start(){
  recognition.start();
  txtbx.innerHTML="";
}

recognition.onresult = function(event) {
  console.log(event);
  var content = event.results[0][0].transcript;
  txtbx.innerHTML = content;

  if (content.includes("up")) {
    arrow.src = "up.png";
  } else if (content.includes("down")) {
    arrow.src = "down.png";
  } else if (content.includes("left")) {
    arrow.src = "left.png";
  } else if (content.includes("right")) {
    arrow.src = "right.png";
  }
};
