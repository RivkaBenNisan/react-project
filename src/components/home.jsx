import { useEffect } from "react"
import { useSelector } from "react-redux"

export const Home = () => {
    //שליפת המשתמש הנוכחי
    const user = useSelector(u => { return u.user })
    
    return <>
        <p>home</p>
    </>
}