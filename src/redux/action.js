// עריכת המשתמש הנוכחי
export const setUser = (user) => {
    return { type: 'SET_USER', payload: user }
}

// בחירת פרטי מתכון
export const chooseRecipe = (recipe) => {
    return { type: 'CHOOSE_RECIPE', payload: recipe }
}


