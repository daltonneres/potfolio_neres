document.getElementById("briefingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const dados = {
    nome: document.getElementById("nome").value,
    email: document.getElementById("email").value,
    whatsapp: document.getElementById("whatsapp").value,
    ramo: document.getElementById("ramo").value,
    objetivo: document.getElementById("objetivo").value,
    prazo: document.getElementById("prazo").value,
    orcamento: document.getElementById("orcamento").value
  };

  /* ======================
     GERAR PDF
  ====================== */
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFontSize(18);
  pdf.text("Briefing - Projeto Personalizado", 20, 20);

  pdf.setFontSize(11);
  let y = 40;

  Object.entries(dados).forEach(([key, value]) => {
    pdf.text(`${key.toUpperCase()}:`, 20, y);
    pdf.text(value || "-", 70, y);
    y += 10;
  });

  pdf.save(`Briefing-${dados.nome}.pdf`);

  /* ======================
     ENVIAR EMAIL
  ====================== */
  emailjs.send(
    "service_i3xkta2",
    "template_m2fzjyz",
    dados
  ).then(() => {
    console.log("✅ Email enviado com sucesso");
  }).catch((error) => {
    console.error("❌ Erro ao enviar email:", error);
  });

  /* ======================
     WHATSAPP
  ====================== */
  const mensagem = `
📌 NOVO BRIEFING RECEBIDO

👤 Nome: ${dados.nome}
📧 Email: ${dados.email}
📱 WhatsApp: ${dados.whatsapp}
🏢 Ramo: ${dados.ramo}
⏳ Prazo: ${dados.prazo}
💰 Orçamento: ${dados.orcamento}

🎯 Objetivo:
${dados.objetivo}
  `;

  const texto = encodeURIComponent(mensagem);
  window.open(`https://wa.me/5546999711937?text=${texto}`, "_blank");

  alert("🚀 Briefing enviado com sucesso! Em breve entraremos em contato.");
});
