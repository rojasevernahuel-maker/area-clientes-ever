const params = new URLSearchParams(window.location.search);
const codigo = params.get("codigo");

if (!clientes || !clientes[codigo]) {
  document.body.innerHTML = "<h2 style='padding:20px'>Código inválido</h2>";
} else {

  const cliente = clientes[codigo];

  /* ================= PORTADA DINÁMICA ================= */

  const portada = document.getElementById("portadaEvento");
  if (portada) {
    portada.style.backgroundImage = "url('img/maria-2026.jpg')";
  }

  document.getElementById("nombreEvento").textContent = cliente.nombre;

  /* ================= COUNTDOWN ================= */

  const fechaEvento = new Date(cliente.fecha).getTime();

  const diasEl = document.getElementById("dias");
  const horasEl = document.getElementById("horas");
  const minutosEl = document.getElementById("minutos");
  const segundosEl = document.getElementById("segundos");

  const contador = document.getElementById("contador");
  const mensajeFinal = document.getElementById("mensajeFinal");

  function actualizarContador() {

    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    if (diferencia <= 0) {
      contador.style.display = "none";
      mensajeFinal.style.display = "block";
      return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    diasEl.textContent = dias;
    horasEl.textContent = horas;
    minutosEl.textContent = minutos;
    segundosEl.textContent = segundos;
  }

  actualizarContador();
  setInterval(actualizarContador, 1000);

  /* ================= DATOS GENERALES ================= */

  document.getElementById("comboNombre").textContent = cliente.combo;
  document.getElementById("ubicacion").textContent = cliente.ubicacion;
  document.getElementById("mapaBtn").href = cliente.mapa;

  /* ================= LISTA SERVICIO ================= */

  const lista = document.getElementById("listaIncluye");
  lista.innerHTML = "";

  cliente.incluye.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  /* ================= PAGOS ================= */

  const totalServicio = cliente.total;
  const pagado = cliente.pagado;
  const viaticos = 50000;

  const totalReal = totalServicio + viaticos;
  const saldoServicio = totalServicio - pagado;
  const saldoViatico = viaticos;

  const porcentaje = Math.round((pagado / totalReal) * 100);

  document.getElementById("total").textContent = totalServicio.toLocaleString();
  document.getElementById("pagado").textContent = pagado.toLocaleString();
  document.getElementById("saldoServicio").textContent = saldoServicio.toLocaleString();
  document.getElementById("saldoViatico").textContent = saldoViatico.toLocaleString();
  document.getElementById("porcentajePago").textContent = porcentaje + "%";

  const circle = document.getElementById("progressCircle");
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset =
    circumference - (porcentaje / 100) * circumference;

  const estado = document.getElementById("estadoPago");

  if (porcentaje === 100) {
    estado.textContent = "Pago completo";
    estado.classList.add("estado-ok");
  } else {
    estado.textContent = "Pago pendiente";
    estado.classList.add("estado-pendiente");
    circle.classList.add("pendiente");
  }

  /* ================= EXTRAS ================= */

  const extrasContainer = document.getElementById("extrasContainer");
  extrasContainer.innerHTML = "";

  cliente.extras.forEach(extra => {

    const div = document.createElement("div");
    div.classList.add("extra-item");

    const mensaje = encodeURIComponent(
      `Hola Ever! Quiero agregar el servicio extra: ${extra.nombre} para el evento ${cliente.nombre}`
    );

    div.innerHTML = `
      <div class="extra-info">
        <h3>${extra.nombre}</h3>
        <p>${extra.descripcion}</p>
      </div>
      <div class="extra-precio">$${extra.precio.toLocaleString()}</div>
      <a class="whatsapp-btn"
         href="https://wa.me/5493813920039?text=${mensaje}"
         target="_blank">
         Solicitar
      </a>
    `;

    extrasContainer.appendChild(div);
  });

}
