import { observable, action, computed, toJS } from "mobx"

class ErrorStore {
  @observable errors = []

  @action
  set(error) {
    this.errors = error
  }

  @action
  addError(error) {
    if(!this.errors.includes(error)){
      this.errors.push(error)
    }
  }

  @computed
  get getErrors() {
    return toJS(this.errors)
  }

  @computed
  get hasErrors() {
    return this.errors.length > 0
  }

  @action
  removeLast() {
    this.errors.pop()
  }

  getLast() {
    return toJS(this.errors.get(this.errors.length - 1))
  }

  @action
  clear() {
    this.errors = []
  }
}

const errorStore = new ErrorStore()
export default errorStore
