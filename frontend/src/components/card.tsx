import {BaseCard} from "../client";

interface CardProps {
    info: BaseCard
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
            borderRadius: "10px",
            whiteSpace: "normal"
        }}>
            {card.name}
            <div style={{ height: "8rem", background: "black", padding: "0.5rem"}}>
                <div style={{
                    background: "white",
                    height: "100%"
                }}>
                    <img
                        src={`/src/assets/cards/${card.path}`}
                        alt={"image error :("}
                        style={{
                            width: "110%",
                            height: "110%",
                            objectFit: "cover",
                            marginLeft: "-7%",
                            marginTop: "-1%",
                            borderRadius: "5px"
                        }}
                    />
                </div>
            </div>
            {card.description}
        </div>
    );
}
