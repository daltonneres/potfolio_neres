function toggleOutroDominio() {
  const dominio = document.getElementById("dominio").value;
  document.getElementById("outro-dominio").style.display =
    dominio === "outro" ? "block" : "none";
}

function toggleSistema() {
  const ramo = document.getElementById("ramo").value;
  document.getElementById("sistema-box").style.display =
    ramo === "Sistema Web" ? "block" : "none";
}

document.getElementById("briefingForm").addEventListener("submit", function(e){
  e.preventDefault();

  const dominio =
    document.getElementById("dominio").value === "outro"
      ? document.getElementById("dominioOutro").value
      : document.getElementById("dominio").value;

  const dados = {
    nome: nome.value,
    email: email.value,
    whatsapp: whatsapp.value,
    ramo: ramo.value,
    tipoSistema: tipoSistema?.value || "Não se aplica",
    objetivo: objetivo.value,
    objetivoNegocio: objetivoNegocio.value,
    referencia: referencia.value || "Nenhuma",
    prioridade: prioridade.value,
    impacto: impacto.value || "Não informado",
    prazo: prazo.value,
    orcamento: orcamento.value,
    dominio: dominio
  };

  const mensagem = `
📌 NOVO BRIEFING

👤 ${dados.nome}
📱 ${dados.whatsapp}
📧 ${dados.email}

🏢 Projeto: ${dados.ramo}
🖥 Sistema: ${dados.tipoSistema}

🎯 Objetivo: ${dados.objetivo}
📈 Meta: ${dados.objetivoNegocio}

⭐ Referência: ${dados.referencia}
🔥 Prioridade: ${dados.prioridade}

🚀 Impacto esperado:
${dados.impacto}

🌐 Domínio: ${dados.dominio}
⏳ Prazo: ${dados.prazo}
💰 Orçamento: ${dados.orcamento}
`;

  window.open(
    `https://wa.me/5546999711937?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );

  alert("Briefing enviado com sucesso!");
});
