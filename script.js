const clientes = {
  "MARIA2026": {
    nombre: "XV - María",
    fecha: "2026-02-14T22:00:00-03:00",
    ubicacion: "La Florida",
    combo: "Álbum grande - 100 fotos",
    incluye: [
      "📸 Todas las fotos digitales",
      "📘 1 álbum grande con 100 fotos",
      "📷 1 sesión fotográfica",
      "🖼️ 1 portarretrato",
      "🚁 Dron en evento",
      "🧧 Tarjeta virtual",
      "🖨️ 10 fotos polaroid"
    ],
    total: 750000,
    pagado: 750000,
    extras: [
      {
        nombre: "Sesión pre entrada",
        descripcion: "30 minutos antes de ingresar al salón para sesión especial",
        precio: 50000
      },
      {
        nombre: "Filmación con dron en la sesión",
        descripcion: "Tomas aéreas antes del ingreso al salón",
        precio: 50000
      }
    ]
  }
};

function verificarCodigo() {
  const codigo = document.getElementById("codigo").value.toUpperCase().trim();

  if (clientes[codigo]) {
    window.location.href = `evento.html?codigo=${codigo}`;
  } else {
    document.getElementById("error").textContent = "Código inválido";
  }
}
