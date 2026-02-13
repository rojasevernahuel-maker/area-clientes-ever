// ===============================
// BASE DE DATOS DE CLIENTES
// ===============================

const clientes = {
  "MARIA2026": {
    nombre: "XV - María",
    fecha: "2026-02-14",
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

// ===============================
// LOGIN
// ===============================

function verificarCodigo() {
  const input = document.getElementById("codigo");
  const error = document.getElementById("error");

  if (!input) return;

  const codigo = input.value.trim().toUpperCase();

  // Limpia mensaje anterior
  error.textContent = "";

  if (!codigo) {
    error.textContent = "Ingresá tu código de evento";
    return;
  }

  if (clientes[codigo]) {

    // Guardamos código en memoria del navegador
    localStorage.setItem("clienteActivo", codigo);

    // Redirige al panel
    window.location.href = `evento.html?codigo=${codigo}`;

  } else {
    error.textContent = "Código inválido";
  }
}

// Permite presionar ENTER para ingresar
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("codigo");

  if (input) {
    input.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        verificarCodigo();
      }
    });
  }
});
