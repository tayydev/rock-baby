import {LobbyState} from "../../client";
import {useEffect, useState} from "preact/hooks";
import SlidingComponent from "../../components/slidingComponent.tsx";

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

    return (
        <div style={{
            height: "100vh", display: "flex", flexDirection: "column"
        }}>
            {/* Opponent Bar */}
            <div
                style={{
                    minHeight: "10vh",
                    display: "flex",
                    alignItems: "center",
                    margin: "0.5rem",
                    flexShrink: 0,
                }}
            >
                <b>Opponent</b>
                <div style={{ width: "100%" }}></div>
                <div>STATUS EFFECTS</div>
                <div>OPPONENT IMAGE HERE</div>
            </div>

            {/* Middle Space */}
            <div style={{ flex: 1, width: "100%", background: "lightgrey", overflow: "hidden", position: "relative" }}>
                <SlidingComponent from="left" duration={3} top={"20%"}>
                    <div style={{ background: "lightblue", padding: "20px" }}>
                        This component slides in from the left!
                    </div>
                </SlidingComponent>
                <SlidingComponent from="left" duration={3}>
                    <div style={{ background: "lightblue", padding: "20px" }}>
                        This component slides in from the left!
                    </div>
                </SlidingComponent>
            </div>

            {/* Self Bar */}
            <div
                style={{
                    minHeight: "10vh",
                    display: "flex",
                    alignItems: "center",
                    margin: "0.5rem",
                    flexShrink: 0,
                }}
            >
                <b>Self</b>
                <div style={{ width: "100%" }}></div>
                <div>STATUS EFFECTS</div>
                <div>SELF IMAGE HERE</div>
            </div>
        </div>
    );
}
