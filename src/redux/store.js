import { produce } from 'immer'
import { createStore } from 'redux'


const initialState = {
    user: {}
}
// const reducer = produce((state, action) => {
const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        default:
            break;
    }

},initialState)

const store = createStore(reducer)
export default store;