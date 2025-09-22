
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
  "Expert em desenvolvimento front-end e back-end integrado",
  "Entusiasta de Inteligência Artificial e análise de dados",
  "Experiência sólida em projetos de software desde a adolescência",
  "Tecnologia como ferramenta para resolver problemas complexos",
  "Transformo ideias em produtos digitais eficientes",
  "Comprometido com inovação, performance e resultados"
];

let i = 0;
setInterval(() => {
  document.getElementById("text-dinamico").textContent = textos[i];
  i = (i + 1) % textos.length;
}, 2000);

