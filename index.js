let palavras = [];
fetch("./words.json")
    .then((res) => res.json())
    .then((res) => (palavras = res));

const start = document.getElementById("start");
const acertou = document.getElementById("acertou");
const errou = document.getElementById("errou");
const proximo = document.getElementById("proximo");
const mudar = document.getElementById("mudar");

const pontos = document.querySelector(".pontos");
const rodada = document.querySelector(".rodada");
const palavra = document.querySelector(".palavra");
const premio = document.querySelector(".premio");

const timer = document.querySelector(".timer");

const bolinhas = document.querySelectorAll(".bolinhasVideo");

const somAcertou = document.getElementById("somAcertou");
const somErrou = document.getElementById("somErrou");
const somStart = document.getElementById("somStart");
const somtempo = document.getElementById("somTempo");
const somAplausos = document.getElementById("somAplausos");
const somPerdeu = document.getElementById("somPerdeu");

let bolinhaCasas = 0;

acertou.onclick = () => {
    somAcertou.pause();
    somAcertou.currentTime = 0;
    somAcertou.play();
    eventoAcertou();
};

errou.onclick = () => {
    somErrou.pause();
    somErrou.currentTime = 0;
    somErrou.play();
    eventoErrou();
};

proximo.onclick = () => eventoProximaRodada();


start.onclick = () => {
    somStart.pause();
    somStart.currentTime = 0;
    somStart.play();
    somtempo.pause();
    somtempo.currentTime = 0;
    somtempo.volume = 0.2;
    somtempo.play();
    tempo = 120;
    eventoStart();
    sorteiaPalavra();
    numErros = 0;
};

mudar.onclick = () => sorteiaPalavra();

function sorteiaPalavra() {
    sorteDaLista = Math.floor(Math.random() * palavras.length);
    let senha = palavras[sorteDaLista];
    palavra.innerHTML = senha;
}

let tempo = 120;
function eventoStart() {
    // Se o tempo não for zerado
    if (tempo - 1 >= -1) {
        // Pega a parte inteira dos minutos
        var min = parseInt(tempo / 60);
        // Calcula os segundos restantes
        var seg = tempo % 60;

        // Formata o número menor que dez, ex: 08, 07, ...
        if (min < 10) {
            min = "0" + min;
            min = min.substr(0, 2);
        }
        if (seg <= 9) {
            seg = "0" + seg;
        }

        // Cria a variável para formatar no estilo hora/cronômetro
        horaImprimivel = min + ":" + seg;
        timer.innerHTML = horaImprimivel;

        // Define que a função será executada novamente em 1000ms = 1 segundo
        setTimeout(eventoStart, 1000);

        // diminui o tempo
        tempo--;

        // Quando o contador chegar a zero faz esta ação
    } else {
        console.log("fim");
    }
}

function eventoAcertou() {
    pontos.innerHTML = Number(pontos.innerHTML) + 1;
    if(pontos.innerHTML === "5"){
        tempo = -1;
        somtempo.pause();
        somAplausos.pause();
        somAplausos.currentTime = 0;
        somAplausos.volume = 1;
        somAplausos.play();
        timer.innerHTML = `Rodada ${rodada.textContent} completa`
    }
    bolaVerde();
    sorteiaPalavra();
}

let numErros = 0;
function eventoErrou() {
    bolaVermelha();
    sorteiaPalavra();
    if(numErros == 5){
        tempo = -1;
        somtempo.pause();
        somPerdeu.pause();
        somPerdeu.currentTime = 0;
        somPerdeu.volume = 0.3;
        somPerdeu.play();
        timer.innerHTML = "PERDEU!"
    }
    numErros++;
}

function eventoProximaRodada() {
    rodada.innerHTML = Number(rodada.innerHTML) + 1;
    premio.innerHTML = Number(premio.innerHTML) * 2;
    bolinhaCasas = 0;
    pontos.innerHTML = 0;
    timer.innerHTML = "2:00"
    for (var i = 0; i < bolinhas.length; i++) {
        bolinhas[i].src = "./midias/BolaNeutra.webm";
    }
    tempo = 0;
    somAplausos.pause();
    palavra.innerHTML = "#######";
    numErros = 0;
}

function bolaVerde() {
    bolinhas[bolinhaCasas].src = "./midias/BolaVerde.webm";
    bolinhaCasas += 1;
}

function bolaVermelha() {
    bolinhas[bolinhaCasas].src = "./midias/BolaVermelha.webm";
    bolinhaCasas += 1;
}
