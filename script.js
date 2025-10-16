const frases = [
  "Desenvolvedor Full-Stack focado em soluções escaláveis",
  "Criando experiências digitais modernas e acessíveis",
  "Transformando ideias em soluções reais"
];

let i = 0;
let j = 0;
let txt = '';
let fraseAtual = 0;

function digitar() {
  if (j < frases[fraseAtual].length) {
    txt += frases[fraseAtual][j];
    document.getElementById('text-dinamico').innerHTML = txt;
    j++;
    setTimeout(digitar, 70);
  } else {
    setTimeout(apagar, 2000);
  }
}

function apagar() {
  if (j > 0) {
    txt = txt.slice(0, -1);
    document.getElementById('text-dinamico').innerHTML = txt;
    j--;
    setTimeout(apagar, 50);
  } else {
    fraseAtual = (fraseAtual + 1) % frases.length;
    setTimeout(digitar, 500);
  }
}

digitar();

// Ativar fade-in ao carregar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("visible");
  });
});