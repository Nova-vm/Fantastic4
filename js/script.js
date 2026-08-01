/* ============================================================
   FANTASTIC 4

   SCRIPT.JS

   PART 1

   Controls:
   - Loader
   - Hero Button
   - Typewriter
   - Basic Page Interaction

============================================================ */


/* ============================================================
   WAIT UNTIL PAGE LOADS
============================================================ */

document.addEventListener(
"DOMContentLoaded",
()=>{

document.body.classList.add("loading");
/* ============================================================
   LOADER

   After loading:
   Hide the loading screen
============================================================ */


const loader =
document.getElementById("loader");


setTimeout(()=>{


    document.body.classList.remove("loading");


    loader.style.opacity="0";


    loader.style.pointerEvents="none";


    setTimeout(()=>{


        loader.style.display="none";


    },800);


},3200);




/* ============================================================
   HERO BUTTON

   Scroll user to intro section

============================================================ */


const beginButton =
document.getElementById("beginJourney");

if(beginButton){


beginButton.addEventListener(
"click",
()=>{


/*
START MUSIC AFTER USER CLICK
*/


if(music){


music.play()
.then(()=>{


console.log(
"Music started"
);


if(musicButton){

musicButton.innerHTML="⏸";

}


})
.catch((error)=>{


console.log(error);


});


}




document
.getElementById("intro")
.scrollIntoView({

behavior:"smooth"

});


});


}





/* ============================================================
   TYPEWRITER EFFECT

============================================================ */


const typingElement =
document.getElementById("typingText");



const words=[


"Some friendships become memories.",


"Some friendships become family.",


"Some friendships last forever ❤️",


"Welcome to Fantastic 4."


];



let wordIndex=0;

let charIndex=0;

let deleting=false;



function typeWriter(){



let current =
words[wordIndex];



if(!deleting){


typingElement.innerHTML =
current.substring(
0,
charIndex++
);



if(charIndex >
current.length){


deleting=true;


setTimeout(
typeWriter,
1500
);


return;

}


}

else{


typingElement.innerHTML =
current.substring(
0,
charIndex--
);



if(charIndex<0){


deleting=false;


wordIndex++;



if(wordIndex>=words.length){

wordIndex=0;

}


}

}


setTimeout(
typeWriter,
deleting ? 50 : 100
);



}



if(typingElement){

typeWriter();

}





/* ============================================================
   REVEAL ANIMATION ON SCROLL

============================================================ */


const sections =
document.querySelectorAll("section");



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(
(entry)=>{


if(entry.isIntersecting){


entry.target.classList.add(
"show"
);


}


});


},

{

threshold:.15

}

);



sections.forEach(
(section)=>{


observer.observe(section);


});





});

/* ============================================================
   
   PART 2 vj

   FRIEND SYSTEM

   Controls:
   - Photo carousel
   - Friend cards
   - Dynamic loading

============================================================ */



/* ============================================================
   WAIT FOR FRIEND DATA
============================================================ */


if(typeof friends !== "undefined"){



/* ============================================================
   VARIABLES
============================================================ */


let currentFriend = 0;


const carousel =
document.querySelector(".carousel-track");


const friendName =
document.getElementById("friendName");


const friendQuote =
document.getElementById("friendQuote");


const friendGrid =
document.getElementById("friendGrid");



/* ============================================================
   RANDOM PHOTO PICKER
============================================================ */

function getRandomPhoto(person){

const totalPhotos = 10;   // Change to however many photos each friend has

const random =
Math.floor(Math.random() * totalPhotos) + 1;

return `images/friends/${person.name}${random}.jpg`;

}

/* ============================================================
   CREATE CAROUSEL
============================================================ */

function getRandomPhoto(person){

    const randomNumber =
    Math.floor(Math.random() * person.photoCount) + 1;


    return `images/friends/${person.photoPrefix}${randomNumber}.jpg`;

}

// added on 01 08 26 vj



function loadCarousel(){


if(!carousel)
return;



carousel.innerHTML="";



const person =
friends[currentFriend];



/*
 CREATE RANDOM IMAGE
*/


const randomNumber =
Math.floor(
Math.random() * person.photoCount
) + 1;



const imagePath =
`images/friends/${person.photoPrefix}${randomNumber}.jpg`;



const image =
document.createElement("img");


image.src =
imagePath;


image.alt =
person.name;



image.onerror = ()=>{

console.log(
"Image not found:",
imagePath
);

};



carousel.appendChild(image);



friendName.innerHTML =
person.name;



friendQuote.innerHTML =
person.quote;



}

/* ============================================================
   NEXT IMAGE
============================================================ */


function nextFriend(){


currentFriend++;



if(currentFriend >= friends.length){

currentFriend=0;

}



loadCarousel();


}





/* ============================================================
   PREVIOUS IMAGE
============================================================ */


function previousFriend(){


currentFriend--;



if(currentFriend < 0){

currentFriend =
friends.length-1;

}



loadCarousel();


}





/* ============================================================
   ARROW BUTTONS
============================================================ */


const nextButton =
document.querySelector(".arrow.right");


const previousButton =
document.querySelector(".arrow.left");



if(nextButton){


nextButton.addEventListener(
"click",
nextFriend
);


}



if(previousButton){


previousButton.addEventListener(
"click",
previousFriend
);


}





/* ============================================================
   AUTO SLIDE

============================================================ */


setInterval(()=>{


nextFriend();


},5000);





/* ============================================================
   CREATE FRIEND CARDS

============================================================ */


function createFriendCards(){



if(!friendGrid)
return;



friendGrid.innerHTML="";



friends.forEach(
(person)=>{



const card =
document.createElement("div");


card.className =
"friend-card";



card.innerHTML = `


<img src="${person.thumb}"
alt="${person.name}">


<h3>

${person.name}

</h3>


<p>

${person.quote}

</p>


<button>

Read My Letter ❤️

</button>


`;





card.addEventListener(
"click",
()=>{


openLetter(person);


}
);



friendGrid.appendChild(card);



});



}





/* ============================================================
   INITIAL LOAD

============================================================ */


loadCarousel();


createFriendCards();



}

/* ============================================================

   PART 3 vj

   LETTER SYSTEM

   Controls:
   - Opening friend's letter
   - Loading personal message
   - Closing letter

============================================================ */



/* ============================================================
   LETTER VARIABLES
============================================================ */


let selectedFriend = null;


const letterSection =
document.getElementById("letterSection");


const letterContent =
document.getElementById("letterContent");

/*
const envelope =
document.getElementById("envelope");
*/


const closeLetter =
document.getElementById("closeLetter");




/* ============================================================
   OPEN LETTER FUNCTION

============================================================ */

/* ============================================================
   OPEN LETTER FUNCTION - FINAL VERSION
============================================================ */

function openLetter(person){


selectedFriend = person;


letterContent.innerHTML = `

<h2>
Dear ${person.name} ❤️
</h2>

<p>
${person.letter.replace(/\n/g,"<br>")}
</p>

`;



const envelopeBox =
document.querySelector(".envelope");


const finalLetter =
document.querySelector(".final-letter");



letterSection.style.display="flex";


document.body.style.overflow="hidden";



/*
 reset animation
*/

envelopeBox.classList.remove("open");

envelopeBox.classList.remove("hide");

finalLetter.classList.remove("show");



/*
 show envelope
*/


setTimeout(()=>{


envelopeBox.classList.add("open");


},500);




/*
 convert to letter view
*/


setTimeout(()=>{


envelopeBox.classList.add("hide");


finalLetter.classList.add("show");


},2200);



if(navigator.vibrate){

navigator.vibrate(
[100,50,100]
);

}





if(window.startConfetti){

startConfetti();

}

/* ============================================================
   FLOATING HEARTS EFFECT
============================================================ */


function createFloatingHeart(){


const heart =
document.createElement("div");


heart.innerHTML="❤️";


heart.className="floating-heart";



heart.style.left =
Math.random()*100+"vw";


heart.style.animationDuration =
(5 + Math.random()*5)+"s";


heart.style.fontSize =
(15 + Math.random()*25)+"px";


document.body.appendChild(heart);



setTimeout(()=>{


heart.remove();


},10000);


}



setInterval(()=>{


createFloatingHeart();


},800);


}



/* ============================================================
   CLOSE LETTER
============================================================ */


const closeButton =
document.getElementById("closeLetter");


if(closeButton){


closeButton.onclick = ()=>{


const envelopeBox =
document.querySelector(".envelope");


if(envelopeBox){

envelopeBox.classList.remove("open");

envelopeBox.classList.remove("hide-envelope");

}



setTimeout(()=>{


letterSection.style.display="none";


document.body.style.overflow="auto";



},900);


};

}

/* adding music stuff vj */

/* ============================================================
   MUSIC SYSTEM
============================================================ */


/*
   ADD YOUR SONGS HERE

   Just add/remove mp3 files from music folder

   Example:

   music/song1.mp3
   music/song2.mp3*/
   
   /* ============================================================
   MUSIC SYSTEM FINAL
============================================================ */
/* ============================================================
   MUSIC SYSTEM FINAL
   Fantastic 4
============================================================ */


/*
   ADD SONGS HERE

   Folder:

   music/

*/


/*
const songs = [

"music/Sooraj Dooba Hain.mp3",

"music/Badtameez Dil Full Song HD Yeh Jawaani Hai Deewani.mp3",

"music/Balam Pichkari.mp3",

"music/Barbaadiyan.mp3",

"music/Ghagra.mp3",

"music/Ilahi.mp3",

"music/KHAIRIYAT.mp3",

"music/Subah Subah.mp3",

"music/Subhanallah.mp3"

];
commented on 01 08 26 vj
*/

const songs = [

"music/Badtameez Dil Full Song HD Yeh Jawaani Hai Deewani.mp3",

"music/Balam Pichkari.mp3",

"music/Barbaadiyan.mp3",

"music/Dil Ka Jo Haal Hai.mp3",

"music/Ghagra.mp3",

"music/I Like Me Better Mashup.mp3",

"music/Ilahi.mp3",

"music/KHAIRIYAT.mp3",

"music/Kudmayi x Apna Bana Le.mp3",

"music/Mana ke hum yaar nahi.mp3",

"music/Marjaani_mix.mp3",

"music/Mashooqa.mp3",

"music/Sapphire x Megamix.mp3",

"music/Sooraj Dooba Hain.mp3",

"music/Subah Subah.mp3",

"music/Subhanallah.mp3",

"music/Suniyan Suniyan x Tere Naina.mp3",

"music/Tera Yaar Hoon Main.mp3",

"music/Tu mera hero.mp3",

"music/Tumse Milke Dil ka Jo Haal Kiya Kare.mp3",

"music/Uff X What Makes You Beautiful Mashup.mp3"

];


const music =
document.getElementById("bgMusic");


const musicButton =
document.getElementById("musicControl");


const nextButton =
document.getElementById("nextSong");


const previousButton =
document.getElementById("previousSong");


const songName =
document.getElementById("songName");



let playlistQueue=[];

let currentSong=0;



/*
 CREATE RANDOM PLAYLIST
*/


function createRandomPlaylist(){


playlistQueue =
[...songs]
.sort(
()=>Math.random()-0.5
);


currentSong=0;


}





/*
 LOAD SONG
*/


function loadSong(){


if(!music)

return;



music.src =
playlistQueue[currentSong];



if(songName){


songName.innerHTML =
playlistQueue[currentSong]
.replace("music/","")
.replace(".mp3","");


}



}



/*
 PLAY SONG
*/


function playMusic(){


if(!music)

return;


music.play()
.then(()=>{


console.log(
"Playing:",
playlistQueue[currentSong]
);


musicButton.innerHTML="⏸";


})
.catch(error=>{


console.log(
"Waiting for user click"
);


});


}




/*
 NEXT SONG
*/


function nextSong(){


currentSong++;


if(currentSong >= playlistQueue.length){


createRandomPlaylist();


}


loadSong();

playMusic();


}





/*
 PREVIOUS SONG
*/


function previousSong(){


currentSong--;


if(currentSong < 0){


currentSong =
playlistQueue.length-1;


}


loadSong();

playMusic();


}





/*
 FIRST LOAD

 Only prepare song.
 Do not autoplay.
 Browser blocks it.

*/


if(music){


createRandomPlaylist();


loadSong();


}





/*
 PLAY PAUSE BUTTON

*/


if(musicButton){


musicButton.onclick=()=>{


if(music.paused){


playMusic();


}


else{


music.pause();


musicButton.innerHTML="▶";


}


};


}





/*
 NEXT BUTTON
*/


if(nextButton){


nextButton.onclick=()=>{


nextSong();


};


}




/*
 PREVIOUS BUTTON
*/


if(previousButton){


previousButton.onclick=()=>{


previousSong();


};


}




/*
 AUTO NEXT

*/


if(music){


music.addEventListener(

"ended",

()=>{


nextSong();


}

);


}





/*
 START MUSIC AFTER USER ENTERS WEBSITE

*/

const beginButtonMusic =
document.getElementById("beginJourney");



if(beginButtonMusic){


beginButtonMusic.addEventListener(

"click",

()=>{


if(music.paused){


playMusic();


}


}

);


}

// for floatiin song icone vj 

/* ============================================================
   FLOATING MUSIC PLAYER UI
============================================================ */

/* ============================================================
   FLOATING PLAYER INTERACTION
============================================================ */


const musicPlayer =
document.getElementById("musicPlayer");


let musicTimer;



if(musicPlayer){


function expandPlayer(){


musicPlayer.classList.add("active");


clearTimeout(musicTimer);


musicTimer=setTimeout(()=>{


musicPlayer.classList.remove("active");


},5000);


}



/*
   clicking empty area expands
*/

musicPlayer.addEventListener(
"click",
(e)=>{


if(
e.target.id==="musicPlayer"
){


expandPlayer();


}


});



/*
   buttons also keep player alive
*/


const playerButtons =
musicPlayer.querySelectorAll("button");



playerButtons.forEach(button=>{


button.addEventListener(
"click",
()=>{


expandPlayer();


});


});



}

//new changes for paper vj 01 08 26

/* ============================================================
   CONFETTI EFFECT
============================================================ */


const confettiCanvas =
document.getElementById("confettiCanvas");


if(confettiCanvas){


const ctx =
confettiCanvas.getContext("2d");


let confettiPieces = [];



function resizeConfetti(){

confettiCanvas.width =
window.innerWidth;

confettiCanvas.height =
window.innerHeight;

}


resizeConfetti();


window.addEventListener(
"resize",
resizeConfetti
);



function createConfetti(){


confettiPieces=[];


const colors=[

"#ff4d8d",
"#6C63FF",
"#42E8E0",
"#FFD166",
"#ffffff"

];



for(let i=0;i<120;i++){


confettiPieces.push({

x:Math.random()*confettiCanvas.width,

y:-20-Math.random()*200,

size:5+Math.random()*8,

speed:2+Math.random()*5,

rotation:Math.random()*360,

color:
colors[
Math.floor(Math.random()*colors.length)
]


});


}


animateConfetti();


}




function animateConfetti(){


ctx.clearRect(
0,
0,
confettiCanvas.width,
confettiCanvas.height
);



confettiPieces.forEach((piece)=>{


ctx.save();


ctx.fillStyle =
piece.color;


ctx.translate(
piece.x,
piece.y
);


ctx.rotate(
piece.rotation
);


ctx.fillRect(
0,
0,
piece.size,
piece.size
);


ctx.restore();



piece.y += piece.speed;

piece.rotation += 0.05;



});



confettiPieces =
confettiPieces.filter(
piece =>
piece.y <
confettiCanvas.height+50
);



if(confettiPieces.length>0){


requestAnimationFrame(
animateConfetti
);


}


}




window.startConfetti =
createConfetti;


}