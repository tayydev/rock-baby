import Router from "preact-router";
import {Palette} from "./pages/palette.tsx";
import {Home} from "./pages/home.tsx";
import {Game} from "./pages/game.tsx";
import {Error404} from "./pages/error.tsx";

const App = () => {
    return (
        <div>
            <nav>
                <a href="/">Home</a> | <a href="/palette">About</a> | <a href="/error">Test Error</a>
            </nav>

            <Router>
                <Home path="/" />
                <Palette path="/palette" />
                <Game path="/game" />
                <Error404 path="/error" />
            </Router>
        </div>
    );
};

export default App;
