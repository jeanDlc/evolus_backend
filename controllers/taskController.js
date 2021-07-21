const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const db = require("../config/db");
exports.getTaskById = async (req, res) => {
  const task = await Tarea.findByPk(req.params.id);
  if (!task) {
    return res.status(400).json({ error: "No se encontró la tarea" });
  }
  res.status(200).json(task);
};
exports.deleteTask = async (req, res) => {
  try {
    const task = await Tarea.destroy({ where: { id: req.params.id } });
    if (!task)
      return res.status(400).json({ error: "No se pudo eliminar la tarea" });
    res.status(200).json({ msg: "Tarea eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
};
exports.updateTask = async (req, res, next) => {
  try {
    const { ProyectoId, nombre, descripcion, estado } = req.body;
    //bucar el proyecto de la tarea que se quiere actualizar
    const project = await Proyecto.findByPk(ProyectoId);
    if (!project) {
      return res.status(400).json({
        error: "No se puede actualizar una tarea de un proyecto que no existe",
      });
    }
    const [numUpdatedTask] = await Tarea.update(
      {
        nombre,
        descripcion,
        estado,
      },
      { where: { id: req.params.id } }
    );

    if (numUpdatedTask === 0) {
      return res.status(400).json({ error: "No se pudo actualizar la tarea" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Ocurrió un error" });
  }
};
exports.updateProjectState = async (req, res) => {
  try {
    //después de actualizar una tarea, tenemos que actualizar el estado de un proyecto
    const { ProyectoId } = req.body;
    const project = await Proyecto.findByPk(ProyectoId);
    const projectTasks = await Tarea.findAll({ where: { ProyectoId } });
    const nDoneTasks = projectTasks.filter(
      (task) => task.estado === true
    ).length;
    const nTasks = projectTasks.length;
    project.estado = nTasks === nDoneTasks;
    await project.save();
    res.status(200).json({ msg: "Tarea actualizada con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error" });
  }
};
exports.updateTaskState = async (req, res, next) => {
  try {
    const { estado } = req.body;
    const { id: taskId } = req.params;
    const task = await Tarea.findByPk(taskId);
    task.estado = estado;
    await task.save();
    req.body.ProyectoId = task.ProyectoId;
    next();
  } catch (error) {
    res.status(500).json({ error: "Ocurrió un error" });
  }
};
