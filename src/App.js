import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faSyringe, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    BrowserRouter as Router,
    Route, Switch,
} from "react-router-dom";
import Header from "./components/Header";
import District from "./screens/District";
import Home from "./screens/Home";
import NoMatch from "./screens/NoMatch";
import Pincode from "./screens/Pincode";
import { AppContextProvider } from "./appContext";
import Results from './screens/Results';


library.add(faHome, faSyringe, faArrowLeft);

function App() {
    return (
        <AppContextProvider>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/pincode">
                        <Pincode/>
                    </Route>
                    <Route exact path="/district">
                        <District/>
                    </Route>
                    <Route exact path="/results">
                        <Results />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="*">
                        <NoMatch />
                    </Route>
                </Switch>
            </Router>
        </AppContextProvider>
    );
}

export default App;
