import { useSelector } from "react-redux"
import '../css/RecipeDetails.css'
import { Outlet, useNavigate } from "react-router"
import { Button } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import api from "./api"

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
        setShowComments(!showComments);
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
        <head>
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
        )}

        {/* כפתור משך הכנה */}
        <header id="titleHeader">
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

            <section id="section2" class="recipeSection">

                {/* שם הקטגוריה */}
                <header class="recipesHeader">
                    <nav class="topRecipeNav">
                        <a id="jdHomePage2" class="returnTop" href="https://www.jimmydean.com/recipes/breakfast/sausage-and-cheese-calzone" target="_blank" title="Hyperlink to Jimmy Dean's Homepage">
                            {recipe.categoryName}
                        </a>
                    </nav>
                </header>

                <article>
                    {/* תמונה */}
                    <div class="group1">
                        <div class="imageBlock">
                            <h2 id="recipe2" class="recipesHead">{recipe.name}</h2>
                            <img class="recipesImg" src={`${process.env.PUBLIC_URL}/images/${recipe.pic}`} title={recipe.note} alt="Image of a piece of bread covered with yellow cheese, meat, tomato and green pepper on top." />
                            <figcaption>
                                {recipe.note}
                            </figcaption>
                        </div>

                        {/* הרכיבים במתכון */}
                        <div class="ingredientsBlock">
                            <h3 class="ingredientsHead">:החומרים</h3>
                            <ul>
                                {/* <li><strong>1</strong> package Original Sausage Crumbles</li> */}
                                {ingridients && ingridients.map(x =>
                                    <li key={x.id}>
                                        <p>{x.ingredientName} {x.amount} {x.name}</p>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* אופן ההכנה */}
                    <div class="stepsBlock">
                        <h3 class="stepsHead">:אופן ההכנה</h3>
                        <ol>
                            <li>{recipe.instructions}</li>
                        </ol>
                    </div>

                </article>

                {/*  שלושת הכפתורים למטה*/}
                <footer>
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
            </section>

            {/* <button onClick={open}>תגובות על מתכון זה</button> */}

            <Button variant="contained" className="add-comment-button" onClick={() => send()}>
                תגובות על המתכון
            </Button>



            <br></br>
            <br></br>
            <br></br>

        </body>
        <Outlet></Outlet>

    </>
}







{/* <div key={recipe.id} className={`recipeCard ${recipe.categoryName}`}>
            <p className="recipeDetail">{recipe.name}</p>
            <p className="recipeDetail">{recipe.userName}</p>
            <p className="recipeDetail">{recipe.preparationTime}</p>
            <p className="recipeDetail">{recipe.categoryName}</p>
            <p className="recipeDetail">{recipe.note}</p>
            <p className="recipeInstructions">{recipe.instructions}</p>
            <img className="recipeImage" src={`${process.env.PUBLIC_URL}/images/${recipe.pic}`} alt="Recipe" />
            <button onClick={open}>תגובות על מתכון זה</button>


        </div> */}