import { useEffect, useState } from 'react'
import './api'
import api from "./api"
import '../css/AllRecipies.css'

export const AllRecipies = () => {


    const [list, setList] = useState()

    useEffect(() => {

        api.getRecipe()

            // תופס הצלחה
            .then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setList(x.data)
            })
            // תופס כשלון
            .catch(err => {
                console.log(err.message);
            })
    }, [])


    return <>
       <div className="recipe-container">
            {list && list.map(x =>
                <div key={x.id} className="recipe-card">
                    <img className="recipe-image" src={x.pic} alt="Recipe" />
                    <p className="recipe-detail">{x.preparationTime}</p>
                    <p className="recipe-detail">{x.userId}</p>
                    <p className="recipe-detail">{x.userName}</p>
                    <p className="recipe-detail">{x.categoryId}</p>
                    <p className="recipe-detail">{x.categoryName}</p>
                    <p className="recipe-detail">{x.levelId}</p>
                    <p className="recipe-detail">{x.levelName}</p>
                    <p className="recipe-detail">{x.note}</p>
                    <p className="recipe-instructions">{x.instructions}</p>
                    {/* <button onClick={() => send(x.id)}>show details</button> */}
                </div>
            )}
        </div>

    </>
}