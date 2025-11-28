const frases = [
  "Soluções Full Stack eficientes.",
  "Experiências digitais modernas.",
  "Tecnologia que gera resultados.",
  "Código com propósito e desempenho.",
  "Soluções feitas para escalar.",
  "Interfaces rápidas e acessíveis.",
  "Desenvolvimento focado em performance.",
  "Automação para simplificar processos.",
  "Do conceito ao produto final.",
  "Design funcional com engenharia sólida.",
  "Sistemas estáveis e preparados para o futuro.",
  "Acessibilidade como prioridade.",
  "Aplicações robustas e elegantes.",
  "Soluções digitais que fazem diferença.",
  "Inovação guiada por dados."
];

let fraseAtual = 0;
const elemento = document.getElementById("text-dinamico");

function trocarFrase() {
  elemento.style.opacity = 0; 
  setTimeout(() => {
    elemento.innerHTML = frases[fraseAtual];
    elemento.style.opacity = 1;
    fraseAtual = (fraseAtual + 1) % frases.length;
  }, 600); // tempo do fade-out
}

trocarFrase();
setInterval(trocarFrase, 6000); // muda a cada 6 segundos

// Ativar fade-in ao carregar
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".fade-in").forEach(el => {
    el.classList.add("visible");
  });
});

// === POP-UP PROMOCIONAL ===
window.addEventListener("load", () => {
  document.getElementById("popupPromo").classList.add("ativo");
});

function fecharPopup() {
  document.getElementById("popupPromo").classList.remove("ativo");
}
