import { produce } from 'immer'
import { createStore } from 'redux'

// המשתנים הנוכחיים
const initialState = {
    user: {},
    recipe: {}
}
const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'CHOOSE_RECIPE':
            return { ...state, recipe: action.payload }
        default:
            break;
    }

}, initialState)

const store = createStore(reducer)
export default store;