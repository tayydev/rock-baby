import {CardInfoDTO} from "../client";

interface CardProps {
    info: CardInfoDTO
}


export default function Card(props: CardProps) {
    const card = props.info

    return <div style={{background: "black", width: "10rem", height: "20rem"}}>
        {card.name}
        <div style={{height: "8rem", background: "red"}}>
            picture here
        </div>
        {card.description}
    </div>
}
