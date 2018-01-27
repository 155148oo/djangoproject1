
function setup() {
    noCanvas();
    let bot = new RiveScript();
    bot.loadFile("/static/scripts/brain.rive", brainReady, brainError);
    bot.sortReplies;



    let speech = new p5.Speech();

    speech.onLoad = voiceReady;
    speech.onStart = startSpeaking;
    speech.onEnd = endSpeaking;

    function startSpeaking() {
        $('#both1').css({ 'color': 'red' });
        // console.log("startspeaking");
        $('#img1').css({ '-webkit-filter': 'grayscale(0)' })
    }
    function endSpeaking() {
        $('#both1').css({ 'color': 'white' });
        $('#img1').css({ '-webkit-filter': 'grayscale(1)' })
    }


    let voiceRec = new p5.SpeechRec();
    voiceRec.onResult = gotSpeech;

    let continuous = p5.SpeechRec.continuous;
    let interimResult = p5.SpeechRec.interimResult;

    voiceRec.continuous = true;
    voiceRec.interimResult = false;

    voiceRec.start(continuous, interimResult);



    function brainReady() {
        console.log("Bot Ready!");
        bot.sortReplies();
    }
    function brainError() {
        console.log("Bot Error!");
    }

    let button = select('#submit');
    let user_input = select('#user_input');
    let output = select('#output');

    button.mousePressed(chat);

    function chat() {
        let input = user_input.value();
        let reply = bot.reply("local_user", input);
        output.html(reply);
        if (reply.startsWith("function google")) {
            var googlesearch = reply.substring(16);
            window.open("http://google.com/search?q=" + googlesearch);
            speech.speak("Here is the result of " + googlesearch);
        }
        else if (reply.startsWith("function time")) {
            var dt = new Date();
            var localTime = dt.toLocaleTimeString()
            console.log(localTime);
            speech.speak(localTime);
        }
        else if (reply.startsWith("function homepage")) {
            speech.speak("Navigating to home page");
            window.location.href="/";
        }
        else if (reply.startsWith("function about")) {
            speech.speak("Navigating to about page");
            window.location.href="/about/";
        }
        else if (reply.startsWith("function members")) {
            speech.speak("Navigating to members page");
            window.location.href="/accounts/";
        }
        else if (reply.startsWith("function blog")) {
            speech.speak("Navigating to blog page");
            window.location.href= "/blog/";
        }
        else if (reply.startsWith("function open")) {
            var webname = reply.substring(14);
            window.open("https://www." + webname + ".com");
            speech.speak("Openning " + webname + " for you.");
        }
        else if (reply.startsWith("function playmusic")) {
            var musicname = reply.toString();
            var musicname1 = musicname.substring(19);
            var youtubesearch = musicname1.split(' ').join('+');
            console.log(youtubesearch);
            var t = window.open("https://www.youtube.com/results?search_query=" + youtubesearch);
            speech.speak("Here is all the " + musicname1 + " videos.");
        }
        else {
            speech.speak(reply);
        }
    }

    function voiceReady() {
        console.log(speech.voices);
        speech.setVoice("Google UK English Female")
    }


    function gotSpeech() {
        if (voiceRec.resultValue) {
            // createP(voiceRec.resultString);
            let input = voiceRec.resultString;
            user_input.value(input);
            let reply = bot.reply("local-user", input);

            output.html(reply);

            if (reply.startsWith("function google")) {
                var googlesearch = reply.substring(16);
                window.open("http://google.com/search?q=" + googlesearch);
                speech.speak("Here is the result of " + googlesearch);
            }
            else if (reply.startsWith("function time")) {
                var dt = new Date();
                var localTime = dt.toLocaleTimeString()
                console.log(localTime);
                speech.speak(localTime);
            }
            else if (reply.startsWith("function homepage")) {
                speech.speak("Navigating to home page");
                window.location.href="/";
            }
            else if (reply.startsWith("function about")) {
                speech.speak("Navigating to about page");
                window.location.href="/about/";
            }
            else if (reply.startsWith("function blog")) {
                speech.speak("Navigating to blog page");
                window.location.href="/blog/";
            }
            else if (reply.startsWith("function members")) {
                speech.speak("Navigating to members page");
                window.location.href="/accounts/";
            }
            else if (reply.startsWith("function open")) {
                var webname = reply.substring(14);
                window.open("https://www." + webname + ".com");
                speech.speak("Openning " + webname + " for you.");
            }
            else if (reply.startsWith("function playmusic")) {
                var musicname = reply.toString();
                var musicname1 = musicname.substring(19);
                var youtubesearch = musicname1.split(' ').join('+');
                console.log(youtubesearch);
                var t = window.open("https://www.youtube.com/results?search_query=" + youtubesearch);
                speech.speak("Here is all the " + musicname1 + " videos.");
            }
            else {
                speech.speak(reply);
            }

        }
    }
}


var myinput = document.getElementById("user_input");

// Execute a function when the user releases a key on the keyboard
myinput.addEventListener("keyup", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Trigger the button element with a click
    document.getElementById("submit").click();
  }
});