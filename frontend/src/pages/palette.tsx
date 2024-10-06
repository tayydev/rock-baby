import {useEffect, useState} from "preact/hooks";
import Card from "../components/card.tsx";
import {BaseCard, Configuration, DefaultApi} from "../client";
import {base_url_1} from "./constants.ts";

const apiConfig = new Configuration({
    basePath: base_url_1, // Your FastAPI base URL
});

const apiClient = new DefaultApi(apiConfig);

export function Palette() {
    const [cardList, setCardList] = useState<BaseCard[]>([])

    useEffect(() => {
        apiClient.createGameCreateGameGet()
            .then(result => setCardList(result.data.host.available))
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
