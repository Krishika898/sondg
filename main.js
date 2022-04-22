leftwristx = 0;
leftwristy = 0;
rightwristx = 0;
rightwristy = 0;
scoreleftwrist = 0;
scorerightwrist =0;

function setup() {
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO)
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on ('pose', gotPoses);
}

function draw() {
    image(video, 0,0,600,500);

    fill("red");
    stroke("red");

if(scoreleftwrist > 0.2) {
circle(leftwristx,leftwristy,20);
InNumberleftwristy = Number(leftwristy);
remove_decimals = floor(InNumberleftwristy);
volume = remove_decimals/500;
document.getElementById("volume").innerHTML="Volume =" +volume;
song.setVolume(volume);
}

if (scorerightwrist > 0.2) {

    circle(rightwristx,rightwristy,20);

    if (rightwristy > 0 && rightwristy <= 100) {
        document.getElementById("status").innerHTML="speed = 0.5x";
        song.rate(0.5);
    }

    else if (rightwristy > 100 && rightwristy <= 200) {
        document.getElementById("status").innerHTML="speed = 1x";
        song.rate(1);
    }

    else if (rightwristy > 200 && rightwristy <= 300) {
        document.getElementById("status").innerHTML="speed = 1.5x";
        song.rate(1.5);
    }

    else if (rightwristy > 300 && rightwristy <= 400) {
        document.getElementById("status").innerHTML="speed = 2x";
        song.rate(2);
    }

    else if (rightwristy > 400) {
        document.getElementById("status").innerHTML="speed = 2.5x";
        song.rate(2.5);
    }
}
}
    
song="";

function preload() {
    song = loadSound ("music.mp3");
}

function play() {
    song.play();
    song.setVolume(0.6);
    song.rate(1);
}

function modelLoaded() {
    console.log ("Posenet is Initialised");
}

function gotPoses(results) {
if(results.length > 0)
{
console.log (results);
leftwristy = results[0].pose.leftWrist.y;
leftwristx = results[0].pose.leftWrist.x;
rightwristx = results[0].pose.rightWrist.x;
rightwristy = results[0].pose.rightWrist.y;
scoreleftwrist = results[0].pose.keypoints[9].score;
scorerightwrist = results[0].pose.keypoints[10].score;
console.log("rightWristX = " + rightwristx +" rightWristY = "+ rightwristy);
console.log("scoreleftwrist = " + scoreleftwrist +" scorerightwrist = "+ scorerightwrist);
console.log("leftWristX = " + leftwristx +" leftWristY = "+ leftwristy);
}



}