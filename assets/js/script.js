import Tarea from './classes/Tarea.js';
import GestorTareas from './classes/GestorTareas.js';

const formularioTarea = document.getElementById('formTareas');
const listarTareas = document.getElementById('listaTareas');
const alertContainer = document.getElementById('alertContainer');

// Crear instancia de GestorTareas y Tareas
const gestorTareas = new GestorTareas();

const contadorRegresivo = (fechaLimite) => {
  if (!fechaLimite) return 'No hay una fecha límite';

  const fechaActual = new Date().getTime();
  const diferencia = fechaLimite - fechaActual;

  const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  return `${dias} días y ${horas}:${minutos}:${segundos}`;
};

const renderizarTareas = () => {
  listarTareas.innerHTML = '';
  gestorTareas.listarTareas().forEach((tarea) => {
    // Crear elemento <li> para rellenarlo con los datos de cada tarea
    const li = document.createElement('li');
    // Asignarle clases al <li> creado
    li.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center',
    );

    // <span> con cuenta regresiva (cuánto falta para el vencimiento de la tarea)
    const span = document.createElement('span');
    span.dataset.id = tarea.id;
    span.classList.add('small', 'text-muted', 'date-countdown');
    span.textContent = contadorRegresivo(tarea.fechaLimite);

    // Obtener detalles de la tarea
    const { descripcion, estado } = tarea;
    li.textContent = `${descripcion} - ${estado ? 'Completada' : 'Pendiente'}`;

    // agregar al elemento de lista la cuenta regresiva
    li.appendChild(span);

    // Botones de eliminar y cambiar estado de tarea
    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn', 'btn-danger', 'btn-sm');
    buttonDelete.textContent = 'Eliminar';
    buttonDelete.dataset.id = tarea.id;

    const buttonEstado = document.createElement('button');
    buttonEstado.classList.add('btn', 'btn-success', 'btn-sm');
    buttonEstado.textContent = 'Cambiar estado';
    buttonEstado.dataset.id = tarea.id;

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('btn-group');

    // Agregar botones al contenedor de botones
    buttonContainer.appendChild(buttonDelete);
    buttonContainer.appendChild(buttonEstado);

    // Agregar contenedor de botones al li
    li.appendChild(buttonContainer);

    // Agregar <li> a la lista de tareas <ul>
    listarTareas.appendChild(li);
  });
};

// Renderizar tareas para la primera carga de la página
renderizarTareas();

// Actualizar el contador regresivo 1 vez por segundo
setInterval(() => {
  const countdown = document.querySelectorAll('.date-countdown');

  countdown.forEach((span) => {
    const id = Number(span.dataset.id);
    const tarea = gestorTareas.listarTareas().find((tarea) => tarea.id === id);
    span.textContent = contadorRegresivo(tarea.fechaLimite);
  });
}, 1000);

formularioTarea.addEventListener('submit', (event) => {
  event.preventDefault();

  // Deshabilitar boton submit
  document.querySelector('button[type="submit"]').disabled = true;
  // Insertar alert informativa para el usuario (porque hay un tiempo de espera)
  insertAlert('warning', 'Agregando tarea, por favor espere...');

  // Simular retardo al agregar tarea
  setTimeout(() => {
    const descripcion = document.getElementById('descripcion').value;
    const fechaLimite = document.getElementById('fechaLimite').value;

    // Si es que se selecciona una fecha límite en el input, la convertimos a milisegundos, sino devolvemos undefined
    const tiempoLimite = fechaLimite
      ? new Date(fechaLimite).getTime()
      : undefined;

    gestorTareas.agregarTarea(
      new Tarea(Date.now(), descripcion, false, new Date(), tiempoLimite),
    );

    // Renderizar tareas, para actualizar la lista
    renderizarTareas();
    // Limpiar formulario
    event.target.reset();
    insertAlert('success', 'Tarea agregada correctamente');
    document.querySelector('button[type="submit"]').disabled = false;
  }, 2000);
});

// Manejar Clicks de botones dentro de cada <li>
listarTareas.addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-danger')) {
    const id = Number(event.target.dataset.id);
    gestorTareas.eliminarTarea(id);
    insertAlert('success', 'Tarea eliminada exitosamente.');
    renderizarTareas();
  } else if (event.target.classList.contains('btn-success')) {
    const id = Number(event.target.dataset.id);
    gestorTareas.cambiarEstado(id);
    renderizarTareas();
  }
});

const insertAlert = (className, message) => {
  alertContainer.innerHTML = '';
  const alert = `
    <div class="alert alert-${className} alert-dismissible fade show" role="alert">
      ${message}.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;

  alertContainer.innerHTML = alert;
};

// Geolocation API (del navegador) para obtener latitud y longitud
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const success = (pos) => {
  const crd = pos.coords;

  console.log(crd);
  console.log(`Tu latitud es: ${crd.latitude}`);
  console.log(`Tu longitud es: ${crd.longitude}`);

  // Pasarle a funcion del clima las coordenadas
  getWeather(crd.latitude, crd.longitude);
};

const error = (error) => {
  console.warn(`Error ${error.code}: ${error.message}`);
};

navigator.geolocation.getCurrentPosition(success, error, options);

// OpenWeather API - Api de terceros para el clima
const API_KEY = '5041d54fd8a673370a396b5ccf24748a';
const getWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`;

  try {
    const response = await fetch(url);

    if (!response.ok)
      throw new Error('La petición a la API no funcionó', response.statusText);

    const data = await response.json();
    console.log('Datos del clima obtenidos', data);
    const nombreLocalidad = data.name.split(', ');

    // Barra que irá sobre el navbar
    const topBar = document.getElementById('topBar');
    topBar.innerHTML = `
      <div class="container-fluid">
        <p class="small my-0 mx-auto">Clima actual en ${nombreLocalidad[0]}, ${nombreLocalidad[1]}: <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" width="40" > ${data.weather[0].description} - Temperatura: ${data.main.temp}°C - Humedad ambiental: ${data.main.humidity}%</p>
      </div>
    `;
  } catch (error) {
    console.error(error);
  }
};
