import { useEffect, useRef, useState } from "react"
import api from "./api"
import { Button } from "@mui/material"

export const Categories = () => {

    const [categories, setCategories] = useState()
    const nameRef = useRef()
    useEffect(() => {

        api.getCategories()

            // תופס הצלחה
            .then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setCategories(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })
    }, [])
    // פונקציה המוסיפה תגובה
    function add() {
        debugger
        const c = {
            name: nameRef.current.value
        }
        console.log(c);
        api.addCategory(c).then((y) => {
            alert("הקטגוריה נוספה בהצלחה")
            setCategories(y.data)
        }).catch(error => {
            
            alert("שגיאה בהוספת הקטגוריה");
        });

    }
    return <>
        {categories && categories.map(x =>
            <div key={x.id}>
                <p>{x.name}</p>
            </div>
        )}
        <div className="add-comment-section">
            <input type='text' placeholder="קטגוריה חדשה" className='comment-input' ref={nameRef}></input>

            <Button variant="contained" className="submit-comment-button" onClick={() => add()}>
                הוסף
            </Button>
        </div>
    </>
}