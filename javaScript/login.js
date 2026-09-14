// Validar que el usuario sea mayor de edad
function validarEdad() {
  const edadInput = document.getElementById("edad").value;
  if (Number(edadInput) < 18) {
    alert("ERROR: Debe ser mayor de 18 años para registrarse.");
    return false;
  }
  return true;
}

// Registro de usuario
document.getElementById("formRegistro").addEventListener("submit", function(event) {
  // Evitar que la página se recargue al enviar el formulario
  event.preventDefault();

  // Validar edad primero
  if (!validarEdad()) {
    return;
  }

  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const pass1 = document.getElementById("contraseña").value;
  const pass2 = document.getElementById("contraseña2").value;

  // Validar coincidencia de contraseñas
  if (pass1 !== pass2) {
    alert("ERROR: Las contraseñas no coinciden.");
    return;
  }

  // Guardar datos en el localStorage
  localStorage.setItem("usuario_nombre", JSON.stringify(nombre));
  localStorage.setItem("usuario_correo", JSON.stringify(correo));
  localStorage.setItem("usuario_password", JSON.stringify(pass1));

  alert("¡Usuario registrado exitosamente!");
  this.reset(); // Limpia los campos del formulario
});


// Iniciar sesión
document.getElementById("formLogin").addEventListener("submit", function(event) {
  event.preventDefault();

  const correoInput = document.getElementById("loginCorreo").value;
  const passInput = document.getElementById("loginContraseña").value;

  // Obtener los datos guardados previamente en localStorage
  const correoGuardado = JSON.parse(localStorage.getItem("usuario_correo"));
  const passGuardada = JSON.parse(localStorage.getItem("usuario_password"));

  if (!correoGuardado || !passGuardada) {
    alert("No existe ningún usuario registrado.");
    return;
  }

  // Verificar si las credenciales coinciden
  if (correoInput === correoGuardado && passInput === passGuardada) {
    const nombreGuardado = JSON.parse(localStorage.getItem("usuario_nombre"));
    alert("¡Login exitoso! Bienvenido/a, " + nombreGuardado);
    console.log("Inicio de sesión exitoso");
     this.reset();
  } else {
    alert("ERROR: Correo o contraseña incorrectos.");
  }
});