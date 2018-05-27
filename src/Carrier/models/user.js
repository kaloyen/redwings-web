import { Model } from '../model.js'

export class UserModel extends Model {
  controller = `users`
}
const User = new UserModel()
export default User