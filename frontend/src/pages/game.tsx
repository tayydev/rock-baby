import {useEffect, useState} from "preact/hooks";
import {LobbyState} from "../client";
import {Configuration, DefaultApi} from "../client";
import {route} from "preact-router";
import {QRCodeSVG} from "qrcode.react";

import './game.css'


const apiConfig = new Configuration({
    basePath: 'http://127.0.0.1:8000', // Your FastAPI base URL
});

const apiClient = new DefaultApi(apiConfig);

export function Game() {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    const gameID = params.get('gameID');
    const guestLink = `${window.location.origin}/game?role=guest&gameID=${gameID}`;

    const [lobby, setLobby] = useState<LobbyState | null>(null);


    const copyGuestLink = () => {
        navigator.clipboard.writeText(guestLink).then(() => {
            alert('Guest link copied to clipboard!');
        });
    };

    useEffect(() => {
        if (gameID !== null) {
            apiClient.getGameGetGameGet(gameID).then
            (result => {
                setLobby(result.data);
            }
            );
        }
        else if (role === 'host' && lobby === null) {
            apiClient.createGameCreateGameGet().then
            (result => {
                setLobby(result.data);
                route(`/game?role=${role}&gameID=${result.data.id}`, true)
            }
            );
        }
        else if (role === 'guest') {
            //Join game logic
            }
        }
        , []);

    return (
        <div className="game-container">
            <h1>Game Page</h1>
            <p>Welcome to the game!</p>
            <p>Role: {role}</p>
            <p>Game ID: {lobby?.id}</p>
            {role === 'host' && (
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    className="host-controls">
                    <QRCodeSVG value={guestLink} />
                    <button onClick={copyGuestLink}>Copy guest link</button>
                </div>
            )}

        </div>
    );
}