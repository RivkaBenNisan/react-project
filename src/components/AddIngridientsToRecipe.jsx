import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router"
import api from "./api"
import { ClassNames } from "@emotion/react"

export const AddIngredientsToRecipe = () => {
    const params = useParams()
    //מערך המכיל את הרכיבים שהמשתמש בחר
    const checked = useSelector(c => { return c.checked })
    //מערך המכיל את כל הרכיבים הקיימים
    const [ingredients, setIngredients] = useState()
    const nav = useNavigate()
    //של הרכיבים שהמשתמש בחר name ואת ה id המכיל את ה json אובייקט 
    // const [jsonIngredients, setJsonIngredients] = useState([])

    // function setMyList() {
    //     debugger
    //     checked.forEach(x => {
    //         const n = ingredients.find(ingredient => ingredient.id == x)?.name
    //         const ing={
    //             id: x,
    //             name: n
    //         }
    //         setJsonIngredients(...jsonIngredients,ing)
    //     });


    // השארת הרכיבים שהמשתמש בחר
    //  const selectedIngredients = ingredients.filter(ingredient => checked.includes(ingredient.id));

    //  const selectedJsonIngredients = selectedIngredients.map(ingredient => {
    //      return {
    //          id: ingredient.id,
    //          name: ingredient.name
    //      };
    //  });
    //  setJsonIngredients(selectedJsonIngredients);


    useEffect(() => {
        api.getIngredient()
            // תופס הצלחה
            .then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setIngredients(x.data)
            })
            // תופס כשלון
            .catch(err => {

                console.log(err.message);
            })



        // setMyList()
    }, [])

    // fffffffffffffffff
    function changeGrid() {
        debugger

    }
    async function add(e) {
        e.preventDefault();
        for (let i = 0; i < checked.length; i++) {
            debugger
            const ing = [{
                recipeId: parseInt(params.id),
                ingredientId: parseInt(checked[i].id),
                ingredientName: checked[i].name,
                amount: e.target[i].value
            }]
            console.log(ing)
            await api.addIngredientsToRecipe(ing).then(x => {

                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log("הצליח");
                

            })
                // תופס כשלון
                .catch(err => {

                    console.log("לא הצליח");
                })
        }
        debugger
        nav("/Home")

    }

    return <>
        <p>{params.id}</p>


        <div className="container" >

            <div className="login" id="rec_con">

                <h1>רכיבי המתכון</h1>

                <form onSubmit={add} id="">

                    {checked && checked.map(x =>

                        <div className="input-box">
                            <input id={x.id} type="text" name={x.id} placeholder="כמות"
                                className="thePlaceholder amount" required
                            ></input>
                            <label className="labelIngredients" for={x.id}>
                                {x.name}
                            </label>
                            {/* <i class="fa fa-envelope"></i> */}
                        </div>
                    )}



                    <button type='submit'>הוספה</button>
                </form>
            </div>
        </div >

        {/* <!-- לינקים עבור הוספת מתכון --> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.2/css/bootstrap.css" />
        <link rel="stylesheet" href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap4.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
        {<script
            src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
            integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
        </script>}
        {<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossorigin="anonymous"></script>}
        {<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
            integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
            crossorigin="anonymous"></script>}

        {/* {checked && checked.map(x =>
            <div key={x.id}>
                <p>{x.id}</p>
                <p>{x.name}</p>
                <button onClick={() => send(x.id)}>show details</button>
            </div>
        )} */}
    </>
}