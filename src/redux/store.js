import { produce } from 'immer'
import { createStore } from 'redux'

// המשתנים הנוכחיים
const initialState = {
    user: {},
    recipe: {},
    manager: { email: "a@a", password: "1" },
    ifManager: false

}
const reducer = produce((state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        case 'SET_IF_MANAGER':
            return { ...state, ifManager: action.payload }
        case 'CHOOSE_RECIPE':
            return { ...state, recipe: action.payload }
        default:
            break;
    }

}, initialState)

const store = createStore(reducer)
export default store;