// * ARCHIVO A COMPLETAR
import { body } from "express-validator";
import { UserModel, ProfileModel } from "../../models/index.js";

export const registerValidation = [
  // TODO: 1. Validar username: obligatorio, entre 3 y 20 caracteres y único (UserModel).
  body("username")
    .isString()
    .withMessage("El username debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("El username debe ser alfanumérico")
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({
        where: { username },
        paranoid: false,
      });
      if (user) throw new Error("El username ya existe");
      return true;
    }),
  // TODO: 2. Validar email: obligatorio, con formato válido y único.
  body("email")
    .isString()
    .withMessage("El email debe ser texto")
    .bail()
    .trim()
    .isEmail()
    .withMessage("El email debe ser válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({
        where: { email },
        paranoid: false,
      });
      if (user) throw new Error("El email ya existe");
      return true;
    }),
  // TODO: 3. Validar password: obligatoria, con mínimo de 8 caracteres.
  body("password")
    .isString()
    .withMessage("La password debe ser texto")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La password debe tener al menos 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("La password debe incluir una minúscula")
    .matches(/[A-Z]/)
    .withMessage("La password debe incluir una mayúscula")
    .matches(/[0-9]/)
    .withMessage("La password debe incluir un número"),
  // TODO: 4. Validar role: opcional y limitado a los roles permitidos.
  body("role")
    .optional()
    .isIn(["developer", "administrator"])
    .withMessage("El role no es válido"),
  // TODO: 5. Validar profile.employee_number: obligatorio y único (ProfileModel).
  body("profile.employee_number")
    .isString()
    .withMessage("El número de empleado debe ser texto")
    .bail()
    .trim()
    .notEmpty()
    .withMessage("El número de empleado es obligatorio")
    .bail()
    .isLength({ max: 20 })
    .withMessage("El número de empleado no puede superar los 20 caracteres")
    .matches(/^[A-Za-z0-9-]+$/)
    .withMessage(
      "El número de empleado debe contener letras, números o guiones",
    )
    .bail()
    .custom(async (employee_number) => {
      const profile = await ProfileModel.findOne({
        where: { employee_number },
      });
      if (profile) throw new Error("El número de empleado ya existe");
      return true;
    }),
  // TODO: 6. Validar profile.first_name y profile.last_name como obligatorios, y profile.phone como opcional.
  body("profile.first_name")
    .isString()
    .withMessage("El nombre debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[\p{L}]+(?: [\p{L}]+)*$/u)
    .withMessage("El nombre solo debe contener letras"),
  body("profile.last_name")
    .isString()
    .withMessage("El apellido debe ser texto")
    .bail()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[\p{L}]+(?: [\p{L}]+)*$/u)
    .withMessage("El apellido solo debe contener letras"),
  body("profile.phone")
    .optional({ values: "falsy" })
    .isString()
    .withMessage("El teléfono debe ser texto")
    .bail()
    .trim()
    .isLength({ max: 20 })
    .withMessage("El teléfono no puede superar los 20 caracteres")
    .isMobilePhone("any")
    .withMessage("El teléfono no es válido"),
  // ? Las unicidades requieren una validación personalizada asíncrona.
];

export const loginValidation = [
  // TODO: 7. Validar email: obligatorio y con formato válido.
  body("email")
    .isString()
    .withMessage("El email debe ser texto")
    .bail()
    .trim()
    .isEmail()
    .withMessage("El email debe ser válido"),
  // TODO: 8. Validar password: obligatoria.
  body("password")
    .isString()
    .withMessage("La password debe ser texto")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La password debe tener al menos 8 caracteres"),
];
