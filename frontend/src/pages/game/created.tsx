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
        {props.role === 'host' && props.lobby != null &&
            <div className="host-controls">
                <p>Share this QR code or link to create a game.</p>
                <QRCodeSVG value={guestLink} className="QRCode"/>
                <button onClick={copyGuestLink} style={
                    {margin: '20px'}
                }>Copy guest link
                </button>
            </div>
        }
    </div>
}
