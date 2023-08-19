import { userModel } from '../../mongoDB/models/users.model.js';
import BasicManager from '../basicDaos/BasicManager.js';
export default class UsersManager extends BasicManager {
  constructor(model) {
    super(model);
  }

  async findByEmail(email) {
    const user = await userModel.findOne({ email });
    return user;
  }

  async createOne(user) {
    const { email, password } = user;
    const existUser = await userModel.find({ email, password });
    if (existUser.length === 0) {
      const newUser = await userModel.create(user);
      return newUser;
    } else {
      return null;
    }
  }

  async findAndDeleteInactive() {
    const halfHourAgo = new Date();
    halfHourAgo.setHours(halfHourAgo.getHours() - 30);
    const usersToDelete = await userModel.find({ last_connection: { $lt: halfHourAgo } });
    await userModel.deleteMany({ last_connection: { $lt: halfHourAgo } });
    return usersToDelete;
  }
}//función para encontrar y eliminar usuarios inactivos la última media hora

export const userManager = new UsersManager(userModel);
