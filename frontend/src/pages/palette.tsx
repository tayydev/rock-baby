import {useEffect, useState} from "preact/hooks";
import Card from "../components/card.tsx";
import {CardInfoDTO, Configuration, DefaultApi} from "../client";

const apiConfig = new Configuration({
    basePath: 'http://127.0.0.1:8000', // Your FastAPI base URL
});

const apiClient = new DefaultApi(apiConfig);

export function Palette() {
    const [cardList, setCardList] = useState<CardInfoDTO[]>([])

    useEffect(() => {
        apiClient.randomCardListRandomCardListGet()
            .then(result => setCardList(result.data))
    }, [])

    return <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px", // Adjust the space between elements
        alignItems: "flex-start", // Adjust alignment if needed
    }}
    >
        {cardList.map(item =>
            <Card info={item}></Card>
        )}
    </div>
}
