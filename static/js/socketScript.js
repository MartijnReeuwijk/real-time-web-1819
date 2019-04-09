console.log("iets");
(function(){
			let socket = io();
			document.querySelector('form').addEventListener('submit', function(e){
				e.preventDefault();
        let message = document.querySelector('#m').value
        // let newmessage = split(message);
        // let checkedmessage = checkmessage(newmessage);
        // let zoomerspeech = zoomerfy(newmessage);

				socket.emit('chat message', message);
				document.querySelector('#m').value = "";
				return false;
			});
			socket.on('chat message', function(msg) {
				let newLi = document.createElement("li")
				newLi.textContent = msg

				document.querySelector('#messages').append(newLi);
			});
		})()


function split(text){
let spiltString = text.trim().split(/(\s+)/);
console.log(spiltString);
return spiltString;
}

function checkmessage(text) {


}

function zoomerfy(text) {
  // if (text.length < 1) {
  //   return "Empty sting"
  // } else {

    let zoomerSpeechArray = ["fam","boi","goodest","Slay","Dope","savage","Chill","Gurl","bro","Bruh","Bae","Fave","Yolo","Adorbs","yikes","Chad", "mood", "yeet", "LIT", "kachow", "oof", "like", "dab", "normie" ,"Kobe","Thicc", "Selfie", "sick"];
    let randomZoomerWord = zoomerSpeechArray[Math.floor(Math.random() * zoomerSpeechArray.length)];
        console.log(zoomerSpeechArray.length);
    text.push(randomZoomerWord)
    let zoomerReturn = text.join(' ');
    return zoomerReturn
  }



// document.getElementById('button').addEventListener("click", checkFrom);
