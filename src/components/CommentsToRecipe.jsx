import { useDispatch, useSelector } from "react-redux"
import './api'
import api from "./api"
import { useRef, useState } from "react"
import { Outlet, useNavigate } from "react-router"
import { Button } from "@mui/material"
import '../css/CommentsToRecipe.css'
// import { AddCommentToRecipe } from "./AddCommentToRecipe"

export const CommentsToRecipe = () => {
    const [list, setList] = useState()

    const recipe = useSelector(r => { return r.recipe })
    const user = useSelector(u => { return u.user })
    const nav = useNavigate()
    const [show, setShow] = useState(false)
    const resRef = useRef()
    const [show1, setShow1] = useState(true)

    function send() {
        console.log("Button Clicked");
        debugger
        setShowComments(!showComments);
        setShow(!show)
        setShow1(!show1)
        // nav('AddCommentToRecipe')
    }

    // פונקציה המוסיפה תגובה
    function addRes() {
        debugger
        const c = {
            recipeId: recipe.id,
            userId: user.id,
            comment: resRef.current.value
        }
        console.log(c.comment);

        setShowComments(!showComments);

        api.addCommentsToRecepy(c).then((y) => {
            alert(y);
            setShow(!show)
            setShow1(!show1)
        }).catch(error => {
            // console.error(error);
            alert("שגיאה בהוספת תגובה למתכון");
        });

    }

    // שליפת כל תגובות
    api.getCommentsToRecepy(recipe.id)
        // תופס הצלחה
        .then(x => { setList(x.data) })
        // תופס כשלון
        .catch(err => { console.log(err.message); })

    // 
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return <>

        {/* {list && list.map(x =>
            <div key={x.id}>
                <p>{x.comment}</p>
                <p>{x.userName}</p>
            </div>
        )}

        {user.id && show1 && <button className="add-comment-button" onClick={() => send()}>הוספת תגובה</button>}
        {show && <input id={'res'} type='text' placeholder="התגובה שלך" ref={resRef} className='form-control comment-input'></input>}

        {show && <Button variant="contained" className="submit-comment-button" onClick={() => addRes()}>
            שליחת התגובה
        </Button>} */}

        <Button variant="contained" className="add-comment-button" onClick={() => send()}>
            הוספת תגובה
        </Button>

        {showComments && (
            <div className="comments-modal">
                <div className="comments-header">
                    <h3>תגובות על המתכון</h3>
                    <button className="close-button" onClick={() => toggleComments()}>X</button>
                </div>
                <div className="comments-list">
                    { list && list.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.userName}</p>
                        </div>
                    ))}
                </div>
                <div className="add-comment-section">
                    <input type='text' placeholder="התגובה שלך" className='comment-input' ref={resRef}></input>
                    <Button variant="contained" className="submit-comment-button" onClick={() => addRes()}> 
                        הוסף
                    </Button>
                </div>
            </div>
        )}


        <Outlet></Outlet>
    </>
}