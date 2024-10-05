import {useState} from "preact/hooks";
import Card from "../components/card.tsx";

export function Palette() {
    const [bgColor, setBgColor] = useState("red")

    return <div style={{background: bgColor}}>
        <Card id={123}/>
    </div>
}
