 const musicas = [
    {
        src:"SRC/CelebrateWithMe.mp3",
        name:"Celebrate With Me"
    },
    {
        src:"SRC/Neeeed_U.mp3",
        name:"Need U"
    },
    {
        src:"SRC/NoiseInParis.mp3",
        name:"Noise In Paris"
    },
    {
        src:"SRC/Savior_Blues.mp3",
        name:"Savior Blues"
    }
]

const audio = document.getElementById("audio")
const nome = document.getElementById('name')
const buttonplay = document.getElementById('btplay')
const buttonback = document.getElementById('btprevious')
const buttonnext = document.getElementById('btnext')

const tempoagora = document.getElementById('currentime')
const tempototal = document.getElementById('tempototal')
const progressBar = document.getElementById('progressBar')
const progresso = document.getElementById('progresso')

var index = 0
var n = 0
var viewprogress = 0
progresso.style.width = viewprogress + '%'

audio.src = musicas[index].src

function start(){
    if(n == 0){
        audio.play();
        nome.innerHTML = musicas[index].name
        buttonplay.className = "fa-solid fa-pause"
        fulltime()
        n = 1
    } else{
        audio.pause();
        buttonplay.className = "fa-solid fa-play"
        n = 0
    }
}
function mudaetoca(){
    audio.src = musicas[index].src
    audio.play()
    nome.innerHTML = musicas[index].name
    buttonplay.className = 'fa-solid fa-pause'
    n = 1

    setTimeout(function() {
        fulltime()
    }, 500);
    
}
function voltar(){
    buttonback.setAttribute("style", "scale:0.7;")
    setTimeout(function(){
        buttonback.setAttribute("style", "scale:1;")
    }, 100)
    if(index == 0){
        index = musicas.length - 1
        mudaetoca()
    } else{
        index = index - 1
        mudaetoca()
    }
}

function proxima(){
    buttonnext.setAttribute("style", "scale:0.7;")
    setTimeout(function(){
        buttonnext.setAttribute("style", "scale:1;")
    }, 100)
    if(index < musicas.length - 1){
       index = index + 1
       mudaetoca()
       
    } else{
        index = 0
        mudaetoca()
    }
}

function fulltime(){
    const duracao = audio.duration
    if(isNaN(duracao)){
        duracao = 0
    }
    var minutos = Math.floor(duracao / 60)
    var segundos = Math.floor(duracao % 60)
    if(segundos < 10){
        segundos = '0'+segundos
    }
    tempototal.innerHTML = minutos +':'+ segundos
}
function parseTime(){
    const durationformated = audio.duration
    if(isNaN(durationformated)){
        durationformated = 0
    }

    var currentminutis = Math.floor(audio.currentTime / 60)
    var currentseconds = Math.floor(audio.currentTime % 60)
    if(currentseconds < 10){
        currentseconds = '0'+currentseconds
    }
    tempoagora.innerHTML = currentminutis + ':'+ currentseconds

    viewprogress = (audio.currentTime / durationformated) * 100
    progresso.style.width = viewprogress + '%'

}

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * audio.duration;
    audio.currentTime = newTime
}
