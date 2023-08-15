import UsersDB_DTO from '../DAL/DTOs/usersDB.dto.js';
import CustomError from '../utils/errors/CustomError.js';
import { ErrorMessage } from '../utils/errors/error.enum.js';

export const getCurrentSession = (req, res) => {
  if (!req.user) {
    CustomError.createCustomError({
      message: ErrorMessage.SESSION_EXPIRED,
      status: 401,
    });
  }
  const userLogin = new UsersDB_DTO(req.user);
  res.json(userLogin);
};
