import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ProjectModel } from "./project.model.js";
import { TechnologyModel } from "./technology.model.js";
import { ProjectTechnologyModel } from "./project_technology.model.js";

UserModel.hasOne(ProfileModel, { foreignKey: "user_id", as: "profile" });
ProfileModel.belongsTo(UserModel, { foreignKey: "user_id", as: "user" });
UserModel.hasMany(ProjectModel, { foreignKey: "leader_id", as: "projects" });
ProjectModel.belongsTo(UserModel, { foreignKey: "leader_id", as: "leader" });
ProjectModel.belongsToMany(TechnologyModel, {
  through: ProjectTechnologyModel,
  foreignKey: "project_id",
  otherKey: "technology_id",
  as: "technologies",
  onDelete: "CASCADE",
});
TechnologyModel.belongsToMany(ProjectModel, {
  through: ProjectTechnologyModel,
  foreignKey: "technology_id",
  otherKey: "project_id",
  as: "projects",
  onDelete: "CASCADE",
});

export { UserModel, ProfileModel, ProjectModel, TechnologyModel, ProjectTechnologyModel };
