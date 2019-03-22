import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import  { createLogger } from 'redux-logger'
import reducers from './reducers'

export function createReducer(initialState, handlers) {
    return function reducer(state = initialState, action) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }
    }
}

const middleware = [ thunk ]
// if (process.env.NODE_ENV !== 'production') {
//     middleware.push(createLogger())
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose

const store = createStore(
    reducers, 
    composeEnhancers(applyMiddleware(...middleware))
)

export default store