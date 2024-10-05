import Router from "preact-router";
import {Palette} from "./pages/palette.tsx";
import {Home} from "./pages/home.tsx";
import {Game} from "./pages/game.tsx";

const App = () => {
    return (
        <div>
            <nav>
                <a href="/">Home</a> | <a href="/palette">About</a>
            </nav>

            <Router>
                <Home path="/" />
                <Palette path="/palette" />
                <Game path="/game" />
            </Router>
        </div>
    );
};

export default App;
