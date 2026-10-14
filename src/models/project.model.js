import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const ProjectModel = sequelize.define("Project", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  code: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  status: {
    type: DataTypes.ENUM("planning", "in_progress", "paused", "finished"),
    allowNull: false,
    defaultValue: "planning",
  },
  start_date: { type: DataTypes.DATEONLY, allowNull: false },
  budget: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  leader_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "Users", key: "id" },
  },
});
