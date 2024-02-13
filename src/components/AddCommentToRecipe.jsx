import { useSelector } from "react-redux"

export const AddCommentToRecipe = () => {
    const recipe = useSelector(r => { return r.recipe })
    const user = useSelector(u => { return u.user })

    return <>

        <p>kkkkkkkkkkkkkkkkkk</p>
    </>
}