import {BaseCard, LobbyState, Throw} from "../../client";
import {useEffect, useState} from "preact/hooks";
import Card from "../../components/card.tsx";
import './playing.css';

interface createdProps {
    lobby: LobbyState;
    role: string;
}

export default function Playing(props: createdProps){
    const [selectedRPS, setSelectedRPS] = useState<Throw | null>(null);
    const [selectedCards, setSelectedCards] = useState<BaseCard[]>([]);
    const [availableCards, setAvailableCards] = useState<BaseCard[]>([]);

    useEffect(() => {
        const fetchAvailableCards = async () => {
            const cards = props.role === 'host' ? props.lobby.host.available : props.lobby.guest.available;
            setAvailableCards(cards);
        };

        fetchAvailableCards();
    }, [props.lobby, props.role]);

    const handleCardClick = (card: BaseCard) => {
        setSelectedCards(prev => {
            if (prev.some(c => c.name === card.name)) {
                return prev.filter(c => c.name !== card.name);
            } else if (prev.length < 3) {
                return [...prev, card];
            } else {
                return prev;
            }
        });
    };


    return <div>
        <div>
            <button onClick={() => setSelectedRPS(Throw.Rock)}
                    style={{ backgroundColor: selectedRPS === Throw.Rock ? 'gray' : 'black' }}
            >Rock</button>
            <button onClick={() => setSelectedRPS(Throw.Paper)}
                    style={{ backgroundColor: selectedRPS === Throw.Paper ? 'gray' : 'black' }}
            >Paper</button>
            <button onClick={() => setSelectedRPS(Throw.Scissors)}
                    style={{ backgroundColor: selectedRPS === Throw.Scissors ? 'gray' : 'black' }}
            >Scissors</button>
        </div>
        <div className="button-container">
            {availableCards.map(card => (
                <button
                    key={card.name}
                    onClick={() => handleCardClick(card)}
                    style={{
                        backgroundColor: selectedCards.some(c => c.name === card.name) ? 'gray' : 'black'
                    }}
                >
                    <Card info={card}></Card>
                </button>
            ))}
        </div>
    </div>
}
