import Tarea from './classes/Tarea.js';
import GestorTareas from './classes/GestorTareas.js';

// Crear instancia de GestorTareas y Tareas
const gestorTareas = new GestorTareas();
// Agregar tareas
gestorTareas.agregarTarea(new Tarea(1, 'Tarea 1', true, new Date()));
gestorTareas.agregarTarea(new Tarea(2, 'Tarea 2', true, new Date()));
gestorTareas.agregarTarea(new Tarea(3, 'Tarea 3', false, new Date()));
