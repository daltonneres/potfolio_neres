import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 1. Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD-7iM7QKN8bKYY8CLm4df8wbyA1qvUZxw",
  authDomain: "leadsportfolio-c4815.firebaseapp.com",
  projectId: "leadsportfolio-c4815",
  storageBucket: "leadsportfolio-c4815.firebasestorage.app",
  messagingSenderId: "293134787082",
  appId: "1:293134787082:web:73d7343134325733f2b5f3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let dadosLead = { nome: "", telefone: "", tipo: "" };

// --- LÓGICA DO POP-UP ---

document.addEventListener("DOMContentLoaded", function() {
  const statusUsuario = localStorage.getItem("statusLead");

  if (statusUsuario === "Interesse") {
    exibirMensagemCupomJaGanho();
  } else {
    setTimeout(() => {
      const popup = document.getElementById("popupLead");
      if(popup) popup.classList.add("ativo");
    }, 2000);
  }
});

window.proximaEtapa = function(n) {
  if (n === 2) {
    const nomeCompleto = document.getElementById("leadNome").value;
    if (!nomeCompleto) return alert("Por favor, nos diga seu nome para continuar! 😊");
    
    // Pega apenas o primeiro nome para ser mais carinhoso
    dadosLead.nome = nomeCompleto.split(' ')[0]; 
    
    document.getElementById("etapa1").style.display = "none";
    document.getElementById("etapa2").style.display = "block";
    document.getElementById("msgObrigado").innerText = dadosLead.nome;
  } else if (n === 3) {
    document.getElementById("etapa2").style.display = "none";
    document.getElementById("etapa3").style.display = "block";
  }
};

window.exibirMensagemCupomJaGanho = function() {
  setTimeout(() => {
    const popup = document.getElementById("popupLead");
    if(!popup) return;
    
    document.getElementById("etapa1").style.display = "none";
    document.getElementById("etapaFinal").style.display = "block";
    document.getElementById("tituloFinal").innerText = "Olá novamente! 👋";
    document.getElementById("textoFinal").innerText = "Lembramos que seu cupom de 8% OFF está ativo. Entraremos em contato em breve!";
    
    popup.classList.add("ativo");
    setTimeout(window.fecharPopup, 5000);
  }, 2000);
}

window.registrarLead = async function(tipo) {
  dadosLead.tipo = tipo;
  
  if (tipo === 'Interesse') {
    dadosLead.telefone = document.getElementById("leadTel").value;
    if (!dadosLead.telefone) return alert("Informe seu número para o cupom.");
    
    document.getElementById("etapa3").style.display = "none";
    document.getElementById("tituloFinal").innerText = "Parabéns! 🎉";
    document.getElementById("textoFinal").innerText = "Você ganhou 8% OFF em nossos serviços! Entraremos em contato em breve.";
    localStorage.setItem("statusLead", "Interesse");
  } else {
    document.getElementById("etapa2").style.display = "none";
    document.getElementById("textoFinal").innerText = "Agradecemos a sua visita!";
    localStorage.setItem("statusLead", "Visita");
  }

  document.getElementById("etapaFinal").style.display = "block";
  
  try {
    await addDoc(collection(db, "leads"), {
      ...dadosLead,
      dataCriacao: serverTimestamp()
    });
  } catch (e) {
    console.error("Erro ao salvar no Firebase:", e);
  }

  setTimeout(window.fecharPopup, 2000);
};

window.fecharPopup = function() {
  document.getElementById("popupLead").classList.remove("ativo");
};

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