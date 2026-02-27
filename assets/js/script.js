// Crear clase Tarea con propiedades ID, descripcion, estado y fechaCreacion
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion){
    this.id = id
    this. descripcion = descripcion
    this. estado = estado
    this.fechaCreacion = fechaCreacion
  }

  cambiarEstado = () =>{
    this.estado = !this.estado
  }
}

// Crear clase GestorTareas que administre tareas
class GestorTareas {
  constructor(){
    this.tareas = []
  }

  // CRUD -> Create, Read, Update, Delete
  agregarTarea = (tarea) =>{
    this.tareas.push(tarea)
  }
  eliminarTarea = (id) =>{
    this.tareas = this.tareas.filter(tarea => tarea.id !== id)
    console.log(`Tarea con id ${id} eliminada exitosamente`)
  }
  listarTareas = () =>{
    return this.tareas
  }
  #buscarTarea = (id) =>{
    return this.tareas.find(tarea => tarea.id === id)
  }
  cambiarEstado = (id) =>{
    let tarea = this.#buscarTarea(id)
    if(!tarea){
      console.error('No se pudo actualizar: Tarea no encontrada')
      return 'No se pudo actualizar: Tarea no encontrada'
    }
    tarea.cambiarEstado()
    console.log(`Tarea con id ${id} actualizada exitosamente`)
  }
}

// Crear instancia de GestorTareas y Tareas
const gestorTareas = new GestorTareas()
// Agregar tareas
gestorTareas.agregarTarea(new Tarea(1, 'Tarea 1', true, new Date()))
gestorTareas.agregarTarea(new Tarea(2, 'Tarea 2', true, new Date()))
gestorTareas.agregarTarea(new Tarea(3, 'Tarea 3', false, new Date()))

// Mostrar todas las tareas
console.log(gestorTareas.listarTareas())

// Cambiar estado de una tarea
gestorTareas.cambiarEstado(1)
console.log(gestorTareas.listarTareas())

// Eliminar una tarea
gestorTareas.eliminarTarea(1)
console.log(gestorTareas.listarTareas())

// Probar error de búsqueda de tarea
gestorTareas.cambiarEstado(56)