import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './components/App'

import './css/custom.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTimes, faSortAlphaDown, 
        faSortAlphaUp, faSortNumericDown, faSortNumericUp } from '@fortawesome/free-solid-svg-icons'

import accountStore from './stores/accountStore'
import breachStore from './stores/breachStore'
import passwordStore from './stores/passwordStore'

library.add(faCheck)
library.add(faTimes)
library.add(faSortAlphaDown)
library.add(faSortAlphaUp)
library.add(faSortNumericDown)
library.add(faSortNumericUp)

const stores = {
  accountStore,
  breachStore,
  passwordStore
}

ReactDOM.render((
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'))
