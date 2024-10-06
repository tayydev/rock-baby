import {useEffect, useState} from "preact/hooks";
import {Configuration, DefaultApi, LobbyState, LobbyStatus} from "../../client";
import {route} from "preact-router";

import './game.css'
import Playing from "./playing.tsx";
import Showdown from "./showdown.tsx";
import Created from "./created.tsx";


const apiConfig = new Configuration({
    basePath: 'http://127.0.0.1:8839', // Your FastAPI base URL
});

const apiClient = new DefaultApi(apiConfig);

export function Game() {
    const params = new URLSearchParams(window.location.search);
    const role = params.get('role');
    const queryStringId = params.get('gameID');

    const [lobby, setLobby] = useState<LobbyState | null>(null);

    //constant updater thing
    useEffect(() => {
        const fetchData = () => {
            console.log("tick", queryStringId == null)
            if (queryStringId == null) return;
            apiClient.getGameGetGameGet(queryStringId!)
                .then(game => setLobby(game.data)
                ).catch(err => {
                console.error(err);
                route("/error");
            });
        };

        fetchData(); // Fetch data immediately on page load

        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, [lobby?.id]);

    useEffect(() => {
        if (role === 'host' && queryStringId === null) {
            apiClient.createGameCreateGameGet().then(result => {
                setLobby(result.data);
                route(`/game?role=${role}&gameID=${result.data.id}`, true)
            });
        }
        else if (role === 'guest') {
            if(queryStringId === null) route("/error");
            else {
                apiClient.joinGameJoinGameGet(queryStringId).then();
            }
        }
    }, [queryStringId, role]);

    return <>
        {(lobby == null || lobby.status == LobbyStatus.Created) && <Created lobby={lobby} role={role!}/>}
        {(lobby != null && lobby.status == LobbyStatus.Playing) && <Playing lobby={lobby} role={role!}/>}
        {(lobby != null && lobby.status == LobbyStatus.Showdown) && <Showdown lobby={lobby}/>}
    </>
}
