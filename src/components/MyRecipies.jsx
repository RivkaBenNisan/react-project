import { useDispatch, useSelector } from "react-redux"
import api from "./api"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { chooseRecipe } from "../redux/action"
import styled from "styled-components"
import { ButtonBase, Typography } from "@mui/material"
import '../css/AllRecipies.css'


export const MyRecipies=()=>{

    const user = useSelector(u => { return u.user })
    const [list,setList]=useState()
    const dis = useDispatch()





    // פונקציה המתממשת בעת טעינת הקומפוננטה
    useEffect(() => {

        // שליפת כל המתכונים
        api.getRecipe()
            // תופס הצלחה
            .then(x => { setList(x.data) })
            // תופס כשלון
            .catch(err => { console.log(err.message); })
    }, [])
    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 200,

        //  display: 'flex',
        flexDirection: 'column', // Sets the direction to column
        justifyContent: 'flex-end', // Aligns items to the bottom

        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 100%',
    });

    const Image = styled('span')(({ theme }) => ({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.2,
        transition: theme.transitions.create('opacity'),
    }));

    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -1,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));



     //ניתוב לקומפוננטת פרטים נוספים
     const nav = useNavigate()

     //פונקציה הנקראת בעת לחיצה על מתכון
     function send(event) {
         console.log(event)
 
         dis(chooseRecipe(event))
         // ניתוב לקומפוננטת פרטים נוספים
         nav(`/RecipeDetails`)
 
     }


    return<>
     <div className="recipe-container">
            {list && list.map(x => {
                if ((x.userId == user.id) ) {
                    return (
                        <div key={x.id} className={`recipe-card ${x.categoryName}`}>
                            <p className="recipe-detail">{x.name}</p>
                            <p className="recipe-detail">{x.userName}</p>

                            <ImageButton onClick={() => { send(x) }}
                                focusRipple
                                key={x.id}
                            >
                                <ImageSrc style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/${x.pic})` }} />
                                <ImageBackdrop className="MuiImageBackdrop-root" />
                                <Image>
                                    <Typography
                                        component="span"
                                        variant="subtitle1"
                                        color="inherit"
                                        sx={{
                                            position: 'relative',
                                            p: 4,
                                            pt: 2,
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                    >
                                        פרטי המתכון
                                        <ImageMarked className="MuiImageMarked-root" />
                                    </Typography>
                                </Image>
                            </ImageButton>
                            {/* <img className="recipe-image" src={`${process.env.PUBLIC_URL}/images/${x.pic}`} alt="Recipe" /> */}
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>

    </>
}