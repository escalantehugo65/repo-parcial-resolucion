// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  // ? Las unicidades requieren una validación personalizada asíncrona.
  body("username").isString().bail().trim().isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres").bail()
    .isAlphanumeric().withMessage("El username debe ser alfanumérico").bail()
    .custom(async (username) => {
      if (await UserModel.findOne({ where: { username }, paranoid: false })) {
        throw new Error("El username ya está registrado");
      }
      return true;
    }),
  body("email").isString().bail().trim().isEmail().withMessage("El email no es válido").bail()
    .isLength({ max: 100 }).bail().custom(async (email) => {
      if (await UserModel.findOne({ where: { email }, paranoid: false })) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),
  body("password").isString().bail().isLength({ min: 8 })
    .withMessage("La password debe tener al menos 8 caracteres").bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[\s\S]+$/)
    .withMessage("La password debe incluir mayúscula, minúscula y número"),
  body("role").optional().isIn(["developer", "administrator"])
    .withMessage("El role no es válido"),
  body("profile.employee_number").isString().bail().trim().notEmpty().bail()
    .isLength({ max: 20 }).bail().custom(async (employee_number) => {
      if (await ProfileModel.findOne({ where: { employee_number } })) {
        throw new Error("El employee_number ya está registrado");
      }
      return true;
    }),
  body("profile.first_name").isString().bail().trim().isLength({ min: 2, max: 50 }).bail()
    .matches(/^[\p{L} ]+$/u).withMessage("El nombre debe contener solo letras y espacios"),
  body("profile.last_name").isString().bail().trim().isLength({ min: 2, max: 50 }).bail()
    .matches(/^[\p{L} ]+$/u).withMessage("El apellido debe contener solo letras y espacios"),
  body("profile.phone").optional({ values: "falsy" }).isString().bail().trim()
    .isLength({ max: 20 }).bail().isMobilePhone("any")
    .withMessage("El teléfono no es válido"),
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  // TODO: 8. Validar password: obligatoria.
  body("email").isString().bail().trim().isEmail().withMessage("El email no es válido"),
  body("password").isString().bail().isLength({ min: 8 })
    .withMessage("La password debe tener al menos 8 caracteres"),
];
