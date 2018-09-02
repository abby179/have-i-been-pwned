import { observable, action, computed } from 'mobx'
import api from '../api'

class BreachStore {
  @observable isLoading = false

  @observable breachList = []
  @observable domain = undefined

  @observable filterState = {
    isVerified: undefined,
    isSensitive: undefined,
    isSpamList: undefined
  }
  @observable sortingState = {
    sortBy: "name",
    asc: true
  }

  @observable limit = 10
  @observable currentPage = 0
  
  @computed get displayBreachList() {
    const filteredList = (
      this.breachList.filter(breach => this.filterState.isVerified ? breach.IsVerified : true)
      .filter(breach => this.filterState.isSensitive ? breach.IsSensitive : true)
      .filter(breach => this.filterState.isSpamList ? breach.IsSpamList : true)
    )
    if (this.sortingState.sortBy === "name") {
      if (this.sortingState.asc){
        return filteredList.sort((breachA, breachB) => (
          breachA.Name.localeCompare(breachB.Name)
        ))
      } else {
        return filteredList.sort((breachA, breachB) => (
          breachB.Name.localeCompare(breachA.Name)
        ))
      }
    } else {
      if (this.sortingState.asc){
        return filteredList.sort((breachA, breachB) => breachA.PwnCount - breachB.PwnCount)
      } else {
        return filteredList.sort((breachA, breachB) => breachB.PwnCount - breachA.PwnCount)
      }
    }
  }
  
  @computed get totalPagesCount() {
    return Math.ceil(this.displayBreachList.length / this.limit)
  }

  @action reset() {
    this.breachList = []
    this.domain = undefined
    this.error = undefined
    this.currentPage = 0
  }

  @action resetFilter() {
    this.filterState = {
      isVerified: undefined,
      isSensitive: undefined,
      isSpamList: undefined
    }
    this.sortingState = {
      sortBy: "name",
      asc: true
    }
  }

  @action setDomain(domain) {
    this.domain = domain
  }

  @action setPage(page) {
    this.currentPage = page
  }

  @action handleFilterChange(name) {
    if (this.filterState[name]) {
      this.filterState[name] = undefined
    } else {
      this.filterState[name] = true
    }
    this.currentPage = 0
  }

  @action handleSortChange(sortBy) {
    if (this.sortingState.sortBy === sortBy) {
      this.sortingState.asc = !this.sortingState.asc
    } else {
      this.sortingState.sortBy = sortBy
      this.sortingState.asc = true
    }
  }

  @action loadBreaches() {
    this.isLoading = true
    if (this.domain) {
      api.Breach.getBreachByDomain(this.domain)
        .then(action((response) => this.breachList = response.data))
        .catch((error) => { console.log(error.message) })
        .finally(action(() => {
          this.isLoading = false
        }))
    } else {
      api.Breach.getAllBreaches()
        .then(action((response) => {
          this.breachList = response.data
        }))
        .catch((error) => { console.log(error.message) })
        .finally(action(() => {
          this.isLoading = false
        }))
    }
  }
}

export default new BreachStore()