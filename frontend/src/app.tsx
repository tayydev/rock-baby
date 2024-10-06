import Router from "preact-router";
import {Palette} from "./pages/palette.tsx";
import {Home} from "./pages/home.tsx";
import {Game} from "./pages/game/game.tsx";
import {Error404} from "./pages/error.tsx";

const App = () => {
    return (
        <Router>
            {/* @ts-ignore */}
            <Home path="/" />
            {/* @ts-ignore */}
            <Palette path="/palette" />
            {/* @ts-ignore */}
            <Game path="/game" />
            {/* @ts-ignore */}
            <Error404 default />
        </Router>
    );
};

export default App;
