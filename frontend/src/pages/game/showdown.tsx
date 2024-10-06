import {LobbyState} from "../../client";
import {useEffect, useState} from "preact/hooks";

interface ShowdownProps {
    lobby: LobbyState
}

export default function Showdown(props: ShowdownProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Set up the interval to increment index every 3 seconds
        const interval = setInterval(() => {
            setIndex((prevIndex) => prevIndex + 1);
        }, 3000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    return <div style={{minHeight: "100%"}}>
        <div style={{minHeight: "10vh", background: "lightgrey"}}>
            Opponent
        </div>
        <div style={{minHeight: "80vh", background: "blue"}}>
            middle
        </div>
        <div style={{minHeight: "10vh%", background: "lightgrey"}}>
            Self
        </div>

    </div>
}
