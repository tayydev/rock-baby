import {CardInfoDTO} from "../client";

interface CardProps {
    info: CardInfoDTO
}


export default function Card(props: CardProps) {
    const card = props.info

    return (
        <div style={{
            background: "white",
            color: "black",
            width: "12rem",
            height: "20rem",
            border: "2px solid black",
            borderRadius: "10px"
        }}>
            {card.name}
            <div style={{ height: "8rem", background: "red", padding: "1rem"}}>
                <div style={{
                    background: "white",
                    height: "100%"
                }}>
                    <img
                        src={"./assets/card_sprite_1.png"}
                        alt={"image error :("}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "5px"
                        }}
                    />
                </div>
            </div>
            {card.description}
        </div>
    );
}
