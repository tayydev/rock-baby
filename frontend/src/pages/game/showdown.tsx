import {LobbyState, Player, Throw} from "../../client";
import {useEffect, useState} from "preact/hooks";
import SlidingComponent from "../../components/slidingComponent.tsx";
import Card from "../../components/card.tsx";
import ConfettiExplosion from "react-confetti-explosion";

interface ShowdownProps {
    lobby: LobbyState,
    role: Player
}

export default function Showdown(props: ShowdownProps) {
    const [index, setIndex] = useState(0)
    const [winner, setWinner] = useState(false)

    useEffect(() => {
        // Set up the interval to increment index every 3 seconds
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                if (prevIndex < props.lobby.game_history!.length - 1){
                    return prevIndex + 1;
                } else {
                    clearInterval(interval);
                    setWinner(true);
                    return prevIndex;
                }
            });
        }, 3000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const opponentStatusEffects = props.role == Player.Guest
        ? props.lobby.game_history![index].host_state.status_effects!
        : props.lobby.game_history![index].guest_state.status_effects!

    const selfStatusEffects = props.role == Player.Guest
        ? props.lobby.game_history![index].guest_state.status_effects!
        : props.lobby.game_history![index].host_state.status_effects!

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
                <div>
                    {opponentStatusEffects.includes("angel") && <img src="/assets/angel_status.png" alt="Angel Status" style={{ width: '3rem' }} />}
                    {opponentStatusEffects.includes("winflip") && <img src="/assets/opposite_status.png" alt="Opposite Status" style={{ width: '3rem' }} />}
                </div>
                <GimmeIcon throw={opponentThrow}/>
            </div>

            {/* Middle Space */}
            <div style={{ display: 'flex', flex: 1, width: "100%", background: "lightgrey", overflow: "hidden", position: "relative", justifyContent: 'center', alignItems: 'center' }}>
                {props.lobby.game_history!.map((value, state_index) => {

                    const opponentPlayed = props.role == Player.Guest && props.lobby.game_history![index].host_state.played_card != null;
                    const selfPlayed = props.role == Player.Guest && props.lobby.game_history![index].guest_state.played_card != null;
                    const nobodyPlayed = !opponentPlayed && !selfPlayed

                    return state_index == index && <SlidingComponent from="left" duration={3} top={"40%"}>
                        <div style={{background: "#1a1a1a", padding: "20px", borderRadius: "20px", color: "white"}}>
                            {opponentPlayed && <b>Opponent Played:</b>}
                            {selfPlayed && <b>You Played:</b>}
                            {value.guest_state.played_card != null && <Card info={value.guest_state.played_card}/>}
                            {value.host_state.played_card != null && <Card info={value.host_state.played_card}/>}
                            {value.host_state.played_card == null && value.guest_state.played_card == null && index != 0 && <div>Card In Card Jail</div>}
                            {index == 0 && <div>First Round. Hands are Thrown, Baby!</div>}
                        </div>
                    </SlidingComponent>
                })}
                {winner && <div style={{background: "#1a1a1a", width: "50%", padding: "20px", borderRadius: "20px", color: "white", margin: "10vh"}}>
                    <b>YOU {props.lobby.end?.winner == props.role ? "WON" : "LOST"}</b>
                    {props.lobby.end?.winner == props.role && <ConfettiExplosion />}
                    {props.lobby.end?.tie_breaker != null && ` (${props.lobby.end.tie_breaker})`}
                </div>}
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
                <div>
                    {selfStatusEffects.includes("angel") && <img src="/assets/angel_status.png" alt="Angel Status" style={{ width: '3rem' }} />}
                    {selfStatusEffects.includes("winflip") && <img src="/assets/opposite_status.png" alt="Opposite Status" style={{ width: '3rem' }} />}
                </div>
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
