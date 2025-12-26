
/* ==========================
   FADE-IN GERAL
========================== */
const fades = document.querySelectorAll(".fade-in");

const observerFade = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observerFade.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

fades.forEach(el => observerFade.observe(el));

/* ==========================
   CONTADORES
========================== */
const numeros = document.querySelectorAll(".numero");

function animarContadores() {
  numeros.forEach(el => {
    const final = +el.dataset.valor;
    let atual = 0;
    const incremento = final / 80;

    function atualizar() {
      atual += incremento;
      if (atual < final) {
        el.textContent = Math.floor(atual);
        requestAnimationFrame(atualizar);
      } else {
        el.textContent = final;
      }
    }
    atualizar();
  });
}

const resultados = document.querySelector("#resultados");

if (resultados) {
  const observerNumeros = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animarContadores();
      observerNumeros.disconnect();
    }
  }, { threshold: 0.4 });

  observerNumeros.observe(resultados);
}

/* ==========================
   SKILLS EM CASCATA
========================== */
const skillCards = document.querySelectorAll(".skill-card");

if (skillCards.length) {
  const observerSkills = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      skillCards.forEach((card, i) => {
        setTimeout(() => card.classList.add("show"), i * 120);
      });
      observerSkills.disconnect();
    }
  }, { threshold: 0.3 });

  observerSkills.observe(skillCards[0]);
}

/* ==========================
   SKILLS EM ANDAMENTO - NÍVEL
========================== */
const skillsNivel = document.querySelectorAll('.skill-level');
const skillsAndamento = document.querySelector('#skills-andamento');

if (skillsNivel.length && skillsAndamento) {
  const observerNivel = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      skillsNivel.forEach((skill, i) => {
        setTimeout(() => {
          skill.classList.add('show');
        }, i * 120);
      });
      observerNivel.disconnect();
    }
  }, { threshold: 0.3 });

  observerNivel.observe(skillsAndamento);
}

function filtrarPorRamo() {
  const select = document.getElementById("ramo");
  const valor = select.value;

  const cards = document.querySelectorAll(".interest-card");
  const cta = document.getElementById("interestCTA");

  // Esconde tudo inicialmente
  cards.forEach(card => {
    card.classList.add("hidden");
  });

  // Se nada selecionado
  if (valor === "") {
    cta.classList.add("hidden");
    return;
  }

  // PERSONALIZADO → redireciona
  if (valor === "personalizado") {
    window.location.href = "personalizado.html";
    return;
  }

  // MOSTRAR TODOS
  if (valor === "todos") {
    cards.forEach(card => {
      card.classList.remove("hidden");
    });
    cta.classList.remove("hidden");
    return;
  }

  // FILTRAR POR RAMO
  cards.forEach(card => {
    if (card.dataset.ramo === valor) {
      card.classList.remove("hidden");
    }
  });

  // Mostrar CTA depois da escolha
  cta.classList.remove("hidden");
}


/* =========================
   ANIMAÇÃO ON SCROLL
========================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.portfolio-card').forEach(card => {
  observer.observe(card);
});

function filtrarPorRamo() {
  const select = document.getElementById("ramo");
  const valor = select.value;
  const cards = document.querySelectorAll(".interest-card");
  const container = document.getElementById("interestProjects");

  // esconde tudo inicialmente
  cards.forEach(card => {
    card.style.display = "none";
  });

  // se não selecionou nada, esconde a seção inteira
  if (valor === "") {
    container.style.display = "none";
    return;
  }

  // se for personalizado → redireciona
  if (valor === "personalizado") {
    window.location.href = "personalizado.html";
    return;
  }

  // mostra a seção
  container.style.display = "grid";

  // todos
  if (valor === "todos") {
    cards.forEach(card => {
      card.style.display = "flex";
    });
    return;
  }

  // filtra por ramo
  cards.forEach(card => {
    if (card.dataset.ramo === valor) {
      card.style.display = "flex";
    }
  });
}
