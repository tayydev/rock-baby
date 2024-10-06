import {LobbyState, Player, Throw} from "../../client";
import {useEffect, useState} from "preact/hooks";
import SlidingComponent from "../../components/slidingComponent.tsx";
import Card from "../../components/card.tsx";

interface ShowdownProps {
    lobby: LobbyState,
    role: Player
}

export default function Showdown(props: ShowdownProps) {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        // Set up the interval to increment index every 3 seconds
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex < props.lobby.game_history!.length - 1){
                    return prevIndex + 1;
                } else {
                    clearInterval(interval);
                    return prevIndex;
                }
            });
        }, 3000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const opponentThrow = props.role == Player.Guest
        ? props.lobby.game_history![index].host_state.throw
        : props.lobby.game_history![index].guest_state.throw

    const selfThrow = props.role == Player.Host
        ? props.lobby.game_history![index].host_state.throw
        : props.lobby.game_history![index].guest_state.throw

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
                <b style={{marginLeft: "0.5rem", fontSize: "2rem"}}>Opponent</b>
                <div style={{ width: "100%" }}></div>
                <div>STATUS EFFECTS</div>
                <GimmeIcon throw={opponentThrow}/>
            </div>

            {/* Middle Space */}
            <div style={{ flex: 1, width: "100%", background: "lightgrey", overflow: "hidden", position: "relative" }}>
                {props.lobby.game_history!.map((value, state_index) => {
                    return state_index == index && <SlidingComponent from="left" duration={3} top={"40%"}>
                        <div style={{background: "#1a1a1a", padding: "20px", borderRadius: "20px"}}>
                            {value.guest_state.played_card != null && <Card info={value.guest_state.played_card}/>}
                            {value.host_state.played_card != null && <Card info={value.host_state.played_card}/>}
                            {value.host_state.played_card == null && value.guest_state.played_card == null && index != 0 && <div>Card In Card Jail</div>}
                            {index == 0 && <div>First Round. Hands are Thrown, Baby!</div>}
                        </div>
                    </SlidingComponent>
                })}
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
                <b style={{marginLeft: "0.5rem", fontSize: "2rem"}}>Self</b>
                <div style={{width: "100%"}}></div>
                <div>STATUS EFFECTS</div>
                <GimmeIcon throw={selfThrow}/>
            </div>
        </div>
    );
}

interface GimmeIconProps {
    throw: Throw
}

export function GimmeIcon(props: GimmeIconProps) {
    return <>
        <img src={`/assets/rps/${props.throw.toLowerCase()}.png`} alt="rock" style={{width: '6rem'}}/>
    </>
}
