import { observable, action, computed } from 'mobx'
import sha1 from 'sha1'
import api from '../api'

class PasswordStore {
  @observable isLoading = false
  @observable getResult = false

  @observable password = ''
  @observable result = undefined

  @computed get hashChars() {
    return [sha1(this.password).slice(0,5), sha1(this.password).slice(5)]
  }

  @action setPassword(password) {
    this.password = password
  }

  @action reset() {
    this.password = ''
    this.result = undefined
    this.getResult = false
  }

  @action checkPwned() {
    this.isLoading = true
    api.Password.getRange(this.hashChars[0])
    .then(action((response) => {
      const re = new RegExp(`${this.hashChars[1].toUpperCase()}:\\d+`)
      const hashCharsMach = response.data.match(re)
      if (hashCharsMach) {
        this.result = hashCharsMach[0].slice(36)
      } else {
        this.result = 0
      }
    }))
    .catch((error) => { console.log(error.message) })
    .finally(action(() => {
      this.isLoading = false
      this.getResult = true
    }))
  }
}

export default new PasswordStore()