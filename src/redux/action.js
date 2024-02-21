// עריכת המשתמש הנוכחי
export const setUser = (user) => {
    return { type: 'SET_USER', payload: user }
}

// בחירת פרטי מתכון
export const chooseRecipe = (recipe) => {
    return { type: 'CHOOSE_RECIPE', payload: recipe }
}
export const setIfManager = (is) => {
    return { type: 'SET_IF_MANAGER', payload: is }
}


export const setChekedList = (checked) => {
    debugger
    return { type: 'SET_CHEKED', payload: checked }
}


