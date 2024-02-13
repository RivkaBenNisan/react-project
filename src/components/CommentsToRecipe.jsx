import { useDispatch, useSelector } from "react-redux"
import './api'
import api from "./api"
import { useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import { Button } from "@mui/material"
// import { AddCommentToRecipe } from "./AddCommentToRecipe"

export const CommentsToRecipe = () => {
    const [list, setList] = useState()

    const recipe = useSelector(r => { return r.recipe })
    const user = useSelector(u => { return u.user })
    const nav = useNavigate()
    const [show, setShow] = useState(false)
    const resRef = useRef()

    function send() {
        console.log("Button Clicked");
        debugger
        setShow(!show)
        // nav('AddCommentToRecipe')
    }

    function addRes() {

        const c = {

            recipeId: recipe.id,
            userId: user.id,
            
            comment: resRef
        }
        debugger
        api.addCommentsToRecepy(c).then((y) => {
            alert(y);
            setShow(!show)
        }).catch(error => {
            console.error(error);
            alert("שגיאה בהוספת תגובה למתכון");
        });
        
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
        {show && <input id={'res'} type='text' placeholder="התגובה שלך" ref={resRef} className='form-control'></input>}
        {show && <Button variant="contained" onClick={() => addRes()}>
            שליחת התגובה
        </Button>}


        <Outlet></Outlet>
    </>
}