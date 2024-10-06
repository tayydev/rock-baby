import {Throw} from "../../client";
import {useState} from "preact/hooks";

export default function Playing(){
    const [selectedRPS, setSelectedRPS] = useState<Throw | null>(null);

    return <div>
        <div>
            <button onClick={() => setSelectedRPS(Throw.Rock)}>Rock</button>
            <button onClick={() => setSelectedRPS(Throw.Paper)}>Paper</button>
            <button onClick={() => setSelectedRPS(Throw.Scissors)}>Scissors</button>
        </div>
        <p>{selectedRPS ? selectedRPS : "Choice"}</p>
    </div>
}
