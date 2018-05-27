import { Model } from '../model.js'

export class CharacterModel extends Model {
  controller = `characters`
}
const Character = new CharacterModel()
export default Character