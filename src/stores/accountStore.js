import { observable, action } from 'mobx'
import api from '../api'

class AccountStore {
  @observable isLoading = false
  @observable getResult = false

  @observable email = ''
  @observable breachList = []
  @observable pasteList = []

  @action reset() {
    this.getResult = false
    this.error = undefined
    this.breachList = []
    this.pasteList = []
  }

  @action setEmail(email) {
    this.email = email
  }

  @action getResults() {
    this.isLoading = true
    this.reset()
    api.Account.getBreaches(this.email)
      .then(action((response) => this.breachList = response.data))
      .catch((error) => { error.response.status !== 404 && console.log(error.message) })
    api.Account.getPastes(this.email)
      .then(action((response) => this.pasteList = response.data))
      .catch((error) => { error.response.status !== 404 && console.log(error.message) })
      .finally(action(() => {
        this.isLoading = false
        this.getResult = true
      }))
  }
}

export default new AccountStore()