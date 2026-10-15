// * ARCHIVO A COMPLETAR
import { UserModel, ProfileModel } from "../models/index.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { signToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // TODO: 1. Hashear la password antes de guardarla (hashPassword).
    // TODO: 2. Crear el user y su profile asociado.
    // TODO: 3. Responder con código 201, un mensaje de éxito y devolver el usuario sin la password.
    const { username, email, password, role, profile } = req.body;
    const hashedPassword = await hashPassword(password);
    const user = await UserModel.sequelize.transaction(async (transaction) => {
      const newUser = await UserModel.create({
        username, email, password: hashedPassword, role: role ?? "developer",
      }, { transaction });
      await ProfileModel.create({
        user_id: newUser.id,
        employee_number: profile.employee_number,
        first_name: profile.first_name,
        last_name: profile.last_name,
        phone: profile.phone || null,
      }, { transaction });
      return newUser;
    });
    return res.status(201).json({
      msg: "Usuario registrado correctamente",
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: 1. Buscar el user por email y comparar la password (comparePassword).
    // TODO: 2. Firmar un JWT con el id y el role del user (signToken).
    // TODO: 3. Guardar el token en una cookie httpOnly llamada "token", responder con código 200 y un mensaje de éxito.
    // ? Considerar qué mensaje devolver ante credenciales inválidas.
    const { email, password } = req.body;
    const user = await UserModel.findOne({ where: { email } });
    if (!user || !(await comparePassword(password, user.password))) {
      return res.status(401).json({ msg: "Credenciales inválidas" });
    }
    const token = signToken({ id: user.id, role: user.role });
    res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    return res.status(200).json({ msg: "Sesión iniciada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  try {
    // TODO: 1. Eliminar la cookie "token" y responder con código 204 sin devolver ningun mensaje.
    res.clearCookie("token");
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};
