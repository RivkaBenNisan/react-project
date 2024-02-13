import { useDispatch, useSelector } from "react-redux"
import './api'
import api from "./api"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router"

export const CommentsToRecipe = () => {
    const [list, setList] = useState()
    debugger
    const recipe = useSelector(r => { return r.recipe })
    const user = useSelector(u => { return u.user })
    const nav = useNavigate()

    function send() {
        nav('AddCommentToRecipe')
    }
    // שליפת כל תגובות
    api.getCommentsToRecepy(recipe.id)
        // תופס הצלחה
        .then(x => { setList(x.data) })
        // תופס כשלון
        .catch(err => { console.log(err.message); })
    return <>
        {list && list.map(x =>
            <div key={x.id}>
                <p>{x.comment}</p>
                <p>{x.userName}</p>


            </div>
        )}
        {user.id && <button onClick={() => send()}>הוספת תגובה</button>}
        <Outlet></Outlet>
    </>
}