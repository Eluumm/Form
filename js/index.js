const formulario = document.getElementById("formulario");

const inputs = document.querySelectorAll("#formulario .formulario_input");

const expresiones = {
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
  apellido: /^[a-zA-ZÀ-ÿ\s]{1,30}$/,
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{8,14}$/,
  mensaje: /^[\s\S]{4,150}$/,
};

const campos = {
  nombre: false,
  apellido: false,
  correo: false,
  telefono: false,
  mensaje: false,
};

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (
    campos.nombre &&
    campos.apellido &&
    campos.correo &&
    campos.telefono &&
    campos.mensaje
  ) {
    formulario.reset();
    document
      .getElementById("formulario_mensaje_correcto")
      .classList.add("formulario_mensaje_correcto_activo");
    setTimeout(() => {
      document
        .getElementById("formulario_mensaje_correcto")
        .classList.remove("formulario_mensaje_correcto_activo");
    }, 5000);
  } else {
    document
      .getElementById("formulario_mensaje")
      .classList.add("formulario_input_error_activo");
    setTimeout(() => {
      document
        .getElementById("formulario_mensaje")
        .classList.remove("formulario_input_error_activo");
    }, 5000);
  }
});

const validarFormulario = (evento) => {
  switch (evento.target.name) {
    case "nombre":
      validarCampo(expresiones.nombre, evento.target, "nombre");
      break;

    case "apellido":
      validarCampo(expresiones.apellido, evento.target, "apellido");
      break;

    case "correo":
      validarCampo(expresiones.correo, evento.target, "correo");
      break;

    case "telefono":
      validarCampo(expresiones.telefono, evento.target, "telefono");
      break;

    case "mensaje":
      validarCampo(expresiones.mensaje, evento.target, "mensaje");

      break;
    default:
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo_${campo}`)
      .classList.remove("formulario_mensaje_error_activo");
    document
      .getElementById(`grupo_${campo}`)
      .classList.add("formulario_mensaje_correcto_activo");
    document
      .querySelector(`#grupo_${campo} i`)
      .classList.remove("icono_input_con_error");
    document
      .querySelector(`#${campo}`)
      .classList.remove("formulario_input_con_error");
    document
      .querySelector(`#grupo_${campo} .formulario_input_error`)
      .classList.remove("formulario_input_error_activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo_${campo}`)
      .classList.remove("formulario_mensaje_correcto_activo");
    document
      .getElementById(`grupo_${campo}`)
      .classList.add("formulario_mensaje_error_activo");
    document
      .querySelector(`#${campo}`)
      .classList.add("formulario_input_con_error");
    document
      .querySelector(`#grupo_${campo} i`)
      .classList.add("icono_input_con_error");
    document
      .querySelector(`#grupo_${campo} .formulario_input_error`)
      .classList.add("formulario_input_error_activo");
    campos[campo] = false;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});
