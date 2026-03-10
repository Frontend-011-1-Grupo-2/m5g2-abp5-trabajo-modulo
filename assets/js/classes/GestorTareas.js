import Tarea from './Tarea.js';

// Crear clase GestorTareas que administre tareas
class GestorTareas {
  constructor() {
    this.tareas =
      JSON.parse(localStorage.getItem('tareas'))?.map(
        (tarea) =>
          new Tarea(
            tarea.id,
            tarea.descripcion,
            tarea.estado,
            tarea.fechaCreacion,
            tarea.fechaLimite,
          ),
      ) || [];
  }

  // CRUD -> Create, Read, Update, Delete
  agregarTarea = (tarea) => {
    this.tareas.push(tarea);
    this.#guardarTareas();
  };
  eliminarTarea = (id) => {
    this.tareas = this.tareas.filter((tarea) => tarea.id !== id);
    console.log(`Tarea con id ${id} eliminada exitosamente`);
    this.#guardarTareas();
  };
  listarTareas = () => {
    return this.tareas;
  };
  #buscarTarea = (id) => {
    return this.tareas.find((tarea) => tarea.id === id);
  };
  cambiarEstado = (id) => {
    let tarea = this.#buscarTarea(id);
    if (!tarea) {
      console.error('No se pudo actualizar: Tarea no encontrada');
      return 'No se pudo actualizar: Tarea no encontrada';
    }
    tarea.cambiarEstado();
    console.log(`Tarea con id ${id} actualizada exitosamente`);
    this.#guardarTareas();
  };

  #guardarTareas = () => {
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  };
}
export default GestorTareas;
