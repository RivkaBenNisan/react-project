import { Route, Routes } from "react-router"
import { Home } from "./home"
import { Register } from "./Register"
import { Login } from "./login"
import { Nav } from "./Nav"
import { AllRecipies } from "./AllRecipies"
import { MyDetails } from "./MyDetails"
import { ByLevel } from "./ByLevel"
import { ByCategory } from "./ByCategory"
import { ByUser } from "./ByUser"

export const Routing=()=>{
    return<>
    {/* הקומפוננטות שננתב אליהם תוך כדי הפרוייקט */}
    <Routes>
        <Route path="Nav" element={<Nav></Nav>}></Route>
        <Route path="Home" element={<Home></Home>}></Route>
        <Route path="Register" element={<Register></Register>}></Route>
        <Route path="Login" element={<Login></Login>}></Route>
        <Route path="MyDetails" element={<MyDetails></MyDetails>}></Route>
        <Route path="AllRecipies" element={<AllRecipies></AllRecipies>}></Route>
        <Route path="ByLevel" element={<ByLevel></ByLevel>}></Route>
        <Route path="ByCategory" element={<ByCategory></ByCategory>}></Route>
        <Route path="ByUser" element={<ByUser></ByUser>}></Route>
    </Routes>
    </>
}


//<Route path="More/:name/:code/:price/:pic" element={<More></More>}></Route>
