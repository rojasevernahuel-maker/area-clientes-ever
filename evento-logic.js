const params = new URLSearchParams(window.location.search);
const codigo = params.get("codigo");

if (!clientes[codigo]) {
  document.body.innerHTML = "<h2 style='padding:20px'>Código inválido</h2>";
} else {

  const cliente = clientes[codigo];

  // ================= DATOS GENERALES =================

  document.getElementById("nombreEvento").textContent = cliente.nombre;
  document.getElementById("comboNombre").textContent = cliente.combo;
  document.getElementById("ubicacion").textContent = cliente.ubicacion;
  document.getElementById("mapaBtn").href = cliente.mapa;

  document.getElementById("portadaEvento").style.backgroundImage =
    "url('https://images.unsplash.com/photo-1529634898651-9f31a9b5b0c5')";

  // ================= LISTA SERVICIO =================

  const lista = document.getElementById("listaIncluye");
  lista.innerHTML = "";

  cliente.incluye.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  // ================= PAGOS CON VIÁTICOS =================

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
    circle.classList.remove("pendiente");
  } else {
    estado.textContent = "Pago pendiente";
    estado.classList.add("estado-pendiente");
    circle.classList.add("pendiente");
  }

  // ================= EXTRAS =================

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

/* ================= CAROUSEL DOTS ================= */

const track = document.querySelector(".servicio-track");
const dots = document.querySelectorAll(".carousel-dots span");

if(track){

  track.addEventListener("scroll", () => {

    const scrollPosition = track.scrollLeft;
    const cardWidth = track.offsetWidth;
    const index = Math.round(scrollPosition / cardWidth);

    dots.forEach(dot => {
      dot.style.background = "#444";
      dot.style.opacity = "0.5";
    });

    if(dots[index]){
      dots[index].style.background = "#c8a95c";
      dots[index].style.opacity = "1";
    }

  });

}
