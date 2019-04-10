// const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const request = require("request");
const ejsLint = require("ejs-lint");
const compression = require("compression");
const minifyHTML = require("express-minify-html");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const WordPOS = require("wordpos"),
  wordpos = new WordPOS();

const baseDir = "static/";
// app.use((req, res, next) => {
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append("Access-Control-Allow-Headers", "Content-Type");
//   res.append("Cache-Control", "max-age=" + 365 * 24 * 60 * 60);
//   next();
// });

// app.use(
//   minifyHTML({
//     override: true,
//     exception_url: false,
//     htmlMinifier: {
//       removeComments: true,
//       collapseWhitespace: true,
//       collapseBooleanAttributes: true,
//       removeAttributeQuotes: true,
//       removeEmptyAttributes: true,
//       minifyJS: true
//     }
//   })
// );

app.use(compression());
app.set("view engine", "ejs");
app.use(express.static("static"));
http.listen(port, () => console.log(`Example app listening on port ${port}!`));

const zoomerSpeechArray = [
  "fam",
  "boi",
  "goodest",
  "Slay",
  "Dope",
  "savage",
  "Chill",
  "Gurl",
  "bro",
  "Bruh",
  "Bae",
  "Fave",
  "Yolo",
  "Adorbs",
  "yikes",
  "Chad",
  "mood",
  "yeet",
  "LIT",
  "kachow",
  "oof",
  "like",
  "dab",
  "normie",
  "Kobe",
  "Thicc",
  "Selfie",
  "sick"
];
wordpos.getAdjectives(zoomerSpeechArray, function(result) {
  console.log(result);
});
function zoomAdjectives() {
  const adjectivesArray = ["Dope", "savage", "Chill", "LIT", "Thicc", "sick"];
  const randomZoomerWord =
    adjectivesArray[Math.floor(Math.random() * adjectivesArray.length)];
  return randomZoomerWord;
}

// wordpos.getPOS(zoomerSpeechArray, callback){
//       nouns:[],
//       verbs:[],
//       adjectives:[],
//       adverbs:[],
//       rest:[]
//     }

app.get("/", (req, res) => {
  res.render("index", {
    title: "Web app"
  });
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.broadcast.emit("hi");
  socket.on("chat message", function(msg) {
    // send to client
    wordpos.getAdjectives(msg, function(result) {
      let zoomerSpeak = msg;
      for (let i = 0; i < result.length; i++) {
        let zoomerresult = zoomAdjectives();
        zoomerSpeak = zoomerSpeak.replace(result[i], zoomerresult);
      }
        io.emit("chat message", zoomerSpeak);
    });

  });
  socket.on("disconnect", function() {
    socket.broadcast.emit("Bye");
    console.log("user disconnected");
  });
});

io.on("connection", function(socket) {
  // hier is de backend gedeelte
  // this is the original message to the backend
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});
