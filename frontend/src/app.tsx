import { h } from "preact";
import Router from "preact-router";
import {Palette} from "./pages/palette.tsx";
import {Home} from "./pages/home.tsx";

const App = () => {
    return (
        <div>
            <nav>
                <a href="/">Home</a> | <a href="/palette">About</a>
            </nav>

            <Router>
                <Home path="/" />
                <Palette path="/palette" />
            </Router>
        </div>
    );
};

export default App;
