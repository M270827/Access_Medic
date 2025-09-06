function abrirVentana(id) {
  document.querySelectorAll('.ventana').forEach(v => v.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');
}

function login() {
  const nombre = document.getElementById("loginNombre").value;
  const pass = document.getElementById("loginPass").value;
  if (nombre && pass) {
    abrirVentana('menu');
  } else {
    alert("Por favor complete los campos.");
  }
}

function mostrarDoctor() {
  // Aquí podrías hacer validación de selección
  abrirVentana('doctorDetalle');
}

function confirmarCita() {
  abrirVentana('confirmacion');
}

document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("login.php", {
    method: "POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    if (data === "success") {
      abrirVentana("menu");
    } else {
      document.getElementById("errorLogin").textContent = "❌ Nombre o contraseña incorrectos.";
    }
  })
  .catch(error => {
    document.getElementById("errorLogin").textContent = "❌ Error al conectarse con el servidor.";
  });
});

