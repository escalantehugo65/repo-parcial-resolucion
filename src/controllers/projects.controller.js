import { ProjectModel, TechnologyModel, UserModel } from "../models/index.js";

const projectInclude = [
  { model: UserModel, as: "leader", attributes: { exclude: ["password"] } },
  { model: TechnologyModel, as: "technologies", through: { attributes: [] } },
];

export const createProject = async (req, res) => {
  try {
    const { code, name, description, status, start_date, budget, leader_id, technologies } = req.body;
    const project = await ProjectModel.sequelize.transaction(async (transaction) => {
      const created = await ProjectModel.create({
        code, name, description, status, start_date, budget, leader_id,
      }, { transaction });
      await created.setTechnologies(technologies, { transaction });
      return ProjectModel.findByPk(created.id, { include: projectInclude, transaction });
    });
    return res.status(201).json({ data: project });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getAllProjects = async (_req, res) => {
  try {
    const projects = await ProjectModel.findAll({ include: projectInclude });
    return res.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll({
      where: { leader_id: req.user.id },
      include: [{ model: TechnologyModel, as: "technologies", through: { attributes: [] } }],
    });
    return res.status(200).json({ data: projects });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });
    const fields = ["code", "name", "description", "status", "start_date", "budget", "leader_id"];
    const changes = {};
    for (const field of fields) {
      if (req.body[field] !== undefined) changes[field] = req.body[field];
    }
    const updated = await ProjectModel.sequelize.transaction(async (transaction) => {
      await project.update(changes, { transaction });
      if (req.body.technologies !== undefined) {
        await project.setTechnologies(req.body.technologies, { transaction });
      }
      return ProjectModel.findByPk(project.id, { include: projectInclude, transaction });
    });
    return res.status(200).json({ data: updated });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await ProjectModel.findByPk(req.params.id);
    if (!project) return res.status(404).json({ msg: "Proyecto no encontrado" });
    await project.destroy();
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
