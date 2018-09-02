import axios from 'axios'

const API_ROOT = 'https://haveibeenpwned.com/api/v2'

const Account = {
  getBreaches: (email) => axios.get(`${API_ROOT}/breachedaccount/${email}`),
  getPastes: (email) => axios.get(`${API_ROOT}/pasteaccount/${email}`)
}

const Breach = {
  getAllBreaches: () => axios.get(`${API_ROOT}/breaches`),
  getBreachByDomain: (domain) => axios.get(`${API_ROOT}/breaches?domain=${domain}`)
}

const Password = {
  getRange: (hashChars) => axios.get(`https://api.pwnedpasswords.com/range/${hashChars}`)
}

export default {
  Account,
  Breach,
  Password
}
