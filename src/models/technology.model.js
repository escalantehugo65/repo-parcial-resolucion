import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const TechnologyModel = sequelize.define("Technology", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT, allowNull: true },
});
