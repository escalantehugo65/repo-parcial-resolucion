// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { Op } from "sequelize";
import { ProjectModel, TechnologyModel, UserModel } from "../../models/index.js";

  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  // TODO: 2. Validar name y description como obligatorios.
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
const projectRules = (editing) => {
  const field = (name) => editing ? body(name).optional() : body(name);
  return [
    field("code").isString().bail().trim().notEmpty().bail().isLength({ max: 100 }).bail()
      .custom(async (code, { req }) => {
        const where = { code };
        if (editing) where.id = { [Op.ne]: req.params.id };
        if (await ProjectModel.findOne({ where })) throw new Error("El code ya está registrado");
        return true;
      }),
    field("name").isString().bail().trim().isLength({ min: 3, max: 100 })
      .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
    field("description").isString().bail().trim().isLength({ min: 10, max: 500 })
      .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
    body("status").optional().isIn(["planning", "in_progress", "paused", "finished"])
      .withMessage("El estado no es válido"),
    field("start_date").isString().bail().matches(/^\d{4}-\d{2}-\d{2}$/).bail()
      .isISO8601({ strict: true }).withMessage("La fecha debe ser válida y tener formato YYYY-MM-DD"),
    field("budget").isFloat({ gt: 0 }).withMessage("El presupuesto debe ser positivo"),
    field("leader_id").isInt({ min: 1 }).bail().toInt().custom(async (id) => {
      if (!(await UserModel.findByPk(id))) throw new Error("El líder debe ser un usuario activo");
      return true;
    }),
    field("technologies").isArray().withMessage("Technologies debe ser un array").bail()
      .custom(async (ids) => {
        for (const id of ids) {
          if (!Number.isInteger(id) || id <= 0 || !(await TechnologyModel.findByPk(id))) {
            throw new Error("Todas las tecnologías deben tener un ID válido y existir");
          }
        }
        return true;
      }),
  ];
};

export const createProjectValidation = projectRules(false);
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
export const updateProjectValidation = projectRules(true);
