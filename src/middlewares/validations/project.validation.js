// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import {
  ProjectModel,
  TechnologyModel,
  UserModel,
} from "../../models/index.js";

export const createProjectValidation = [
  // TODO: 1. Validar code: obligatorio y único (ProjectModel).
  body("code")
    .isString()
    .withMessage("El código debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El código es obligatorio")
    .bail()
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage("El código debe contener letras, números o guiones")
    .bail()
    .custom(async (code) => {
      const project = await ProjectModel.findOne({ where: { code } });
      if (project) throw new Error("El código ya existe");
      return true;
    }),
  // TODO: 2. Validar name y description como obligatorios.
  body("name")
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  body("description")
    .isString()
    .withMessage("La descripción debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 3. Validar status: opcional y limitado a los estados permitidos.
  body("status")
    .optional()
    .isIn(["planning", "in_progress", "paused", "finished"])
    .withMessage("El estado no es válido"),
  // TODO: 4. Validar start_date como fecha válida y budget como número positivo, ambos obligatorios.
  body("start_date")
    .isString()
    .withMessage("La fecha debe ser texto")
    .bail()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("La fecha debe ser válida y tener formato YYYY-MM-DD"),
  body("budget")
    .notEmpty()
    .withMessage("El presupuesto es obligatorio")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("El presupuesto debe ser positivo"),
  // TODO: 5. Validar leader_id: debe existir y pertenecer a un usuario activo (UserModel).
  body("leader_id")
    .isInt({ min: 1 })
    .withMessage("El id del líder debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El líder no existe o está eliminado");
      return true;
    }),
  // TODO: 6. Validar technologies: lista de ids que existan (TechnologyModel).
  body("technologies")
    .isArray()
    .withMessage("Las tecnologías deben ser un arreglo"),
  body("technologies.*")
    .isInt({ min: 1 })
    .withMessage("Cada id de tecnología debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const technology = await TechnologyModel.findByPk(id);
      if (!technology) throw new Error("La tecnología no existe");
      return true;
    }),
  // ? Un usuario eliminado lógicamente no puede ser líder: comprobar que la búsqueda lo deje afuera.
];

export const updateProjectValidation = [
  // TODO: 7. Validar code como opcional y único, excluyendo el propio proyecto que se edita.
  body("code")
    .optional()
    .isString()
    .withMessage("El código debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El código no puede estar vacío")
    .bail()
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage("El código debe contener letras, números o guiones")
    .bail()
    .custom(async (code, { req }) => {
      const project = await ProjectModel.findOne({ where: { code } });
      if (project && project.id !== Number(req.params.id)) {
        throw new Error("El código ya existe");
      }
      return true;
    }),
  // TODO: 8. Validar name y description como opcionales y no vacíos.
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("El nombre debe tener entre 3 y 100 caracteres"),
  body("description")
    .optional()
    .isString()
    .withMessage("La descripción debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("La descripción debe tener entre 10 y 500 caracteres"),
  // TODO: 9. Validar status, start_date y budget como opcionales, con las mismas reglas que al crear.
  body("status")
    .optional()
    .isIn(["planning", "in_progress", "paused", "finished"])
    .withMessage("El estado no es válido"),
  body("start_date")
    .optional()
    .isString()
    .withMessage("La fecha debe ser texto")
    .bail()
    .isDate({ format: "YYYY-MM-DD", strictMode: true })
    .withMessage("La fecha debe ser válida y tener formato YYYY-MM-DD"),
  body("budget")
    .optional()
    .notEmpty()
    .withMessage("El presupuesto no puede estar vacío")
    .bail()
    .isFloat({ gt: 0 })
    .withMessage("El presupuesto debe ser positivo"),
  // TODO: 10. Validar leader_id como opcional, existente y de un usuario activo.
  body("leader_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El id del líder debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) throw new Error("El líder no existe o está eliminado");
      return true;
    }),
  // TODO: 11. Validar technologies como opcional, con ids que existan.
  body("technologies")
    .optional()
    .isArray()
    .withMessage("Las tecnologías deben ser un arreglo"),
  body("technologies.*")
    .isInt({ min: 1 })
    .withMessage("Cada id de tecnología debe ser un entero positivo")
    .bail()
    .custom(async (id) => {
      const technology = await TechnologyModel.findByPk(id);
      if (!technology) throw new Error("La tecnología no existe");
      return true;
    }),
  // ? Para saber qué proyecto se edita, el id se obtiene de los parámetros de la ruta (req.params).
];
