interface CardProps {
    id: number
}


export default function Card(props: CardProps) {
    const id = props.id

    return <div style={{background: "black", width: "10rem", height: "20rem"}}>
        Hello, my card id is {id}
        <div style={{height: "8rem", background: "red"}}>
            picture here
        </div>
        Description here
    </div>
}
