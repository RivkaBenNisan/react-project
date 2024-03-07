import { useSelector } from "react-redux"
import '../css/RecipeDetails.css'
import { Outlet, useNavigate } from "react-router"
import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import api from "./api"
import '../css/form.css'

export const RecipeDetails = () => {
    //שליפת המתכון הנוכחי
    const recipe = useSelector(r => { return r.recipe })
    console.log(recipe);
    const [list, setList] = useState()
    const [ingridients, setIngridients] = useState()
    const [show, setShow] = useState(false)
    const [showComments, setShowComments] = useState(false);
    const nav = useNavigate()
    const resRef = useRef()
    const user = useSelector(u => { return u.user })
    const [show1, setShow1] = useState(true)

    function send() {
        console.log("Button Clicked");
        debugger
        setShowComments(!showComments);
        setShow(!show)
        // setShow1(!show1)
        // nav('AddCommentToRecipe')
        // nav('CommentsToRecipe')
    }


    useEffect(() => {
        debugger
        api.getIngredientsToRecipe(recipe.id)

            // תופס הצלחה
            .then(x => {
                debugger
                // x = האובייקט שחזר מהשרת
                // data הנתונים נמצאים בתוך 
                console.log(x.status);
                setIngridients(x.data)
            })
            // תופס כשלון
            .catch(err => {
                debugger
                console.log(err.message);
            })
    }, [])


    const toggleComments = () => {
        setShowComments(false);
    };
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
        debugger
        api.addCommentsToRecepy(c).then((y) => {
            setShow(!show)
            setShow1(!show1)
        }).catch(error => {
            // console.error(error);
            alert("שגיאה בהוספת תגובה למתכון");
        });

    }

    // // פתיחת התגובות
    // const open = () => {
    //     // כאשר מנתבים מאבא לבן - אין לשים סלש
    //     nav('CommentsToRecipe')
    // }
    // שליפת כל תגובות
    api.getCommentsToRecepy(recipe.id)
        // תופס הצלחה
        .then(x => { setList(x.data) })
        // תופס כשלון
        .catch(err => { console.log(err.message); })

    // 
    return <>
        {showComments &&
            <div className="con comments-modal" id="popup">

                <div className="log">

                    <div className="comments-header">
                        <h3>תגובות על המתכון</h3>
                        <button className="close-button" onClick={() => toggleComments()}>X</button>
                    </div>                {list && list.map(x =>
                        <div key={x.id}>
                            <p className="p">{x.comment}</p>
                            <p className="p p1">{x.userName}</p>
                        </div>
                    )}
                    {user.id && <form onSubmit={addRes} >
                        <div className="input-box">
                            <input type="text" placeholder="התגובה שלך" ref={resRef} className="thePlaceholder"
                                id="inputText" ></input>
                            <i class="fa fa-envelope"></i>
                        </div>

                        <button type='submit' className="add">הוסף</button>
                    </form>}

                </div>
            </div >}


        {/* {showComments && (
            
            <form className="comments-modal">
                <div className="comments-header">
                    <h3>תגובות על המתכון</h3>
                    <button className="close-button" onClick={() => toggleComments()}>X</button>
                </div>
                <div className="comments-list">
                    {list && list.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.userName}</p>
                        </div>
                    ))}
                </div>
                {user.id &&
                    <div className="add-comment-section">
                        <input type='text' placeholder="התגובה שלך" className='comment-input' ref={resRef}></input>

                        <Button variant="contained" className="submit-comment-button" onClick={() => addRes()}>
                            הוסף
                        </Button>
                    </div>}
            </form>
        )} */}

        <div class="recipeCard">

            <aside>

                <img src={`${process.env.PUBLIC_URL}/images/${recipe.pic}`} alt={recipe.name} />

            </aside>

            <article>

                <h2>{recipe.name}</h2>
                <h3>{recipe.userName}</h3>

                <ul>
                    <li><span class="icon icon-clock"></span><span>{recipe.preparationTime}  </span>
                        <img src={`${process.env.PUBLIC_URL}/images/clock-light.png`} className="Ouricon"></img>
                    </li>
                    <li><span class="icon icon-level"></span><span>{recipe.levelName}  </span>

                        <img src={`${process.env.PUBLIC_URL}/images/cursor-click.png`} className="Ouricon"></img>
                    </li>

                </ul>

                <p id="note">{recipe.note}</p>

                <span>:חומרים נדרשים&nbsp;</span>
                <ul>
                    {ingridients &&
                        ingridients.map(x => (
                            <li key={x.id} style={{ display: 'block' }}>
                                <p>{x.amount} {x.ingredientName}</p>
                            </li>
                        ))}
                </ul>

                <br></br>

                <span>:הוראות הכנה&nbsp;</span>
                <p>{recipe.instructions}</p>


                <Button variant="contained" className="add-comment-button" onClick={() => send()}>
                    תגובות על המתכון
                </Button>

            </article>

        </div>



        <Outlet></Outlet>
        {/* <!-- לינקים עבור הוספת רמה --> */}
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

    </>
}

{/* <head>
            <link href="css/spacing.css" rel="stylesheet"></link>
            <link href="css/theme.css" rel="stylesheet"></link>
            <link href="css/fonts.css" rel="stylesheet"></link>
            <link href="css/borders.css" rel="stylesheet"></link>
            <link href="https://fonts.googleapis.com/css?family=Libre+Baskerville:700|Noto+Serif:700|Oleo+Script|Rambla:700i" rel="stylesheet"></link>
        </head>

        {showComments && (
            <div className="comments-modal">
                <div className="comments-header">
                    <h3>תגובות על המתכון</h3>
                    <button className="close-button" onClick={() => toggleComments()}>X</button>
                </div>
                <div className="comments-list">
                    {list && list.map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>{comment.userName}</p>
                        </div>
                    ))}
                </div>
                {user.id &&
                    <div className="add-comment-section">
                        <input type='text' placeholder="התגובה שלך" className='comment-input' ref={resRef}></input>

                        <Button variant="contained" className="submit-comment-button" onClick={() => addRes()}>
                            הוסף
                        </Button>
                    </div>}
            </div>
        )} */}

{/* כפתור משך הכנה */ }
{/* <header id="titleHeader">
            <nav>
                <a id="navRecipe2" href="#recipe2">
                    :זמן הכנה
                    {<br></br>}
                    {`${recipe.preparationTime}`}

                </a>
            </nav>
        </header>

        <body id="body">
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <section id="section2" class="recipeSection"> */}

{/* שם הקטגוריה */ }
{/* <header class="recipesHeader">
                    <nav class="topRecipeNav">
                        <a id="jdHomePage2" class="returnTop" href="https://www.jimmydean.com/recipes/breakfast/sausage-and-cheese-calzone" target="_blank" title="Hyperlink to Jimmy Dean's Homepage">
                            {recipe.categoryName}
                        </a>
                    </nav>
                </header>

                <article> */}
{/* תמונה */ }
{/* <div class="group1">
                        <div class="imageBlock">
                            <h2 id="recipe2" class="recipesHead">{recipe.name}</h2>
                            <img class="recipesImg" src={`${process.env.PUBLIC_URL}/images/${recipe.pic}`} title={recipe.note} alt="Image of a piece of bread covered with yellow cheese, meat, tomato and green pepper on top." />
                            <figcaption>
                                {recipe.note}
                            </figcaption>
                        </div> */}

{/* הרכיבים במתכון */ }
{/* <div class="ingredientsBlock">
                            <h3 class="ingredientsHead">:החומרים</h3>
                            <ul>
                                {ingridients && ingridients.map(x =>
                                    <li key={x.id}>
                                        <p>{x.ingredientName} {x.amount} {x.name}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div> */}

{/* אופן ההכנה */ }
{/* <div class="stepsBlock">
                        <h3 class="stepsHead">:אופן ההכנה</h3>
                        <ol>
                            <li>{recipe.instructions}</li>
                        </ol>
                    </div>

                </article> */}

{/*  שלושת הכפתורים למטה*/ }
{/* <footer>
                    <nav class="bottomNav">
                        <a class="skipBack" href="#recipe1">
                            <img src="https://gist.githubusercontent.com/REPNOT/0ba2691528bd52a3688073221354ff18/raw/e0981e5ce9f0ac08d878ff231661653c308c15b0/w-48-skip-backward.png" title="Skip backwards to previous recipe section of the page" alt="Small image icon symbolizing skip back to return to the previous section of the page." />
                        </a>
                        <a class="returnTop" href="#top">
                            <img src="https://gist.githubusercontent.com/REPNOT/0ba2691528bd52a3688073221354ff18/raw/e0981e5ce9f0ac08d878ff231661653c308c15b0/w-48-format-wrap-top-bottom.png" title="Jump to the top of the page." alt="Small image icon of an arrow point upwards symbolizing skip to the top of the page." />
                        </a>
                        <a class="skipForward" href="#recipe3">
                            <img src="https://gist.githubusercontent.com/REPNOT/0ba2691528bd52a3688073221354ff18/raw/e0981e5ce9f0ac08d878ff231661653c308c15b0/w-48-skip-forward.png" title="Skip backwards to previous recipe section of the page" alt="Small image icon of an arrow pointing right symbolizing skip forward or fastward to proceed to the next section of the page." />
                        </a>
                    </nav>
                </footer>
            </section> */}


{/* <Button variant="contained" className="add-comment-button" onClick={() => send()}>
                תגובות על המתכון
            </Button> */}



{/* <br></br>
            <br></br>
            <br></br> */}

{/* </body> */ }








