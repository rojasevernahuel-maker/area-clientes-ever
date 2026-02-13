const clientes = {
  "EV1503JULI": {
    nombre: "15 años de Juli"
  }
};

function verificarCodigo() {
  const codigo = document.getElementById("codigo").value.toUpperCase();
  
  if (clientes[codigo]) {
    window.location.href = "evento.html";
  } else {
    document.getElementById("error").textContent = "Código inválido";
  }
}
