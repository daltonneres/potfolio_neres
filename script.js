
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in');
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  sections.forEach(section => {
    appearOnScroll.observe(section);
  });
});
const textos = [
  "Full-Stack Developer com visão de produto",
  "Domino o front, resolvo o back",
  "Estudioso hardcore de IA e dados",
  "faço projetos desde os 16 — e não parei mais",
  "Tecnologia é meu idioma nativo",
  "Transformo ideias em soluções digitais",
  "Apaixonado por criar, otimizar e escalar"
];
let i = 0;
setInterval(() => {
  document.getElementById("text-dinamico").textContent = textos[i];
  i = (i + 1) % textos.length;
}, 2000);

