// Crear clase Tarea con propiedades ID, descripcion, estado y fechaCreacion
class Tarea {
  constructor(id, descripcion, estado, fechaCreacion, fechaLimite) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechaCreacion = fechaCreacion;
    this.fechaLimite = fechaLimite;
  }

  cambiarEstado = () => {
    this.estado = !this.estado;
  };
}
export default Tarea;
