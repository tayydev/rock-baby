import {LobbyState} from "../../client";

interface ShowdownProps {
    lobby: LobbyState
}

export default function Showdown(props: ShowdownProps) {
    return <div>
        <p>Showdown {JSON.stringify(props.lobby)}</p>
    </div>
}
