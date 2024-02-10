import { BrowserRouter } from "react-router-dom"
import { Nav } from "./Nav"
import { Home } from "./home"
import { Routing } from "./Routing"
import { Try } from "./Try"
import { Login } from "./login"
import { Provider } from "react-redux"
import store from "../redux/store"



export const Main = () => {

    return <>
        {/*יכיר את המשתמש הנוכחי Provider מי שבתוך קןמפוננטת ה   */}
        <Provider store={store}>
            <BrowserRouter>
                <Nav></Nav>
                <Routing></Routing>
            </BrowserRouter>
        </Provider>



    </>
}