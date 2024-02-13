import { useSelector } from "react-redux"
import { useEffect, useRef } from "react";


export const AddCommentToRecipe = () => {
    debugger
    const recipe = useSelector(r => { return r.recipe })
    const user = useSelector(u => { return u.user })

    
    
    return <>
        {/* <p>jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj</p> */}
        <div id='log' className='dd'>
           

           
            
        </div>
    </>
}