import {LobbyState} from "../../client";

import './game.css'
import {QRCodeSVG} from "qrcode.react";

interface CreatedProps {
    lobby: LobbyState | null
    role: string
}

export default function Created(props: CreatedProps) {
    const guestLink = `${window.location.origin}/game?role=guest&gameID=${props.lobby?.id}`;

    const copyGuestLink = () => {
        navigator.clipboard.writeText(guestLink).then();
    };

    return <div className="game-container">
        <h1>Game Page</h1>
        <p>Welcome to the game!</p>
        <p>Role: {props.role}</p>
        <p>Lobby Game ID: {props.lobby?.id}</p>
        {props.role === 'host' && props.lobby != null &&
            <div className="host-controls">
                <QRCodeSVG value={guestLink}/>
                <button onClick={copyGuestLink}>Copy guest link</button>
            </div>
        }
    </div>
}
