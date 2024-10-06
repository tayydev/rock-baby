import {
    BaseCard,
    BodySubmitPostGamePost,
    Configuration,
    DefaultApi,
    LobbyState,
    Player,
    Throw
} from "../../client";
import {useEffect, useState} from "preact/hooks";
import Card from "../../components/card.tsx";
import './playing.css';
import {base_url_1} from "../constants.ts";

interface createdProps {
    lobby: LobbyState;
    role: Player;
}

const apiConfig = new Configuration({
    basePath: base_url_1, // Your FastAPI base URL
});

const apiClient = new DefaultApi(apiConfig);

export default function Playing(props: createdProps){
    const [selectedRPS, setSelectedRPS] = useState<Throw | null>(null);
    const [selectedCards, setSelectedCards] = useState<Array<BaseCard>>([]);
    const [availableCards, setAvailableCards] = useState<BaseCard[]>([]);


    const have_i_already_submitted= (props.role == 'host') ? props.lobby.host.selected!.length > 0 : props.lobby.guest.selected!.length > 0;

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

    const handleSubmit = () => {
        if (!selectedRPS) return;
        else {
            const body:  BodySubmitPostGamePost = {
                selected_cards: selectedCards.map(it=>it.name),
                role: props.role,
                throw_choice: selectedRPS
            }
            apiClient.submitPostGamePost(props.lobby.id, body)
                .then()
                .catch(err => {
                    console.error("Submission failed:", err.response?.data || err.message);
                    if (err.response?.data?.detail) {
                        console.error("Error details:", err.response.data.detail);
                    }
                    console.log(selectedCards);
                });
        }
    };

    if (have_i_already_submitted) {
        return <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }
        }><b>Waiting for other player...</b></div>;
    }


    return <div className='selection-screen'>
        <div className="rps-container">
            <button className="button"
                onClick={() => setSelectedRPS(Throw.Rock)}
                    style={{backgroundColor: selectedRPS === Throw.Rock ? 'gray' : 'black'}}
            ><img src="/assets/rps/rock.png" alt="rock" style={{width: '6rem'}}/>
            </button>
            <button className="button"
                    onClick={() => setSelectedRPS(Throw.Paper)}
                    style={{backgroundColor: selectedRPS === Throw.Paper ? 'gray' : 'black'}}
            ><img src="/assets/rps/paper.png" alt="paper" style={{width: '6rem'}}/>
            </button>
            <button className="button"
                    onClick={() => setSelectedRPS(Throw.Scissors)}
                    style={{backgroundColor: selectedRPS === Throw.Scissors ? 'gray' : 'black'}}
            ><img src="/assets/rps/scissors.png" alt="scissors" style={{width: '6rem'}}/>
            </button>
        </div>
        Cards Selected: {selectedCards.length + ' / 3'}
        <div className="button-container">
            {availableCards.map(card => {
                const selectedIndex = selectedCards.findIndex(c => c.name === card.name);
                return (
                    <button
                        key={card.name}
                        onClick={() => handleCardClick(card)}
                        style={{
                            backgroundColor: selectedCards.some(c => c.name === card.name) ? 'gray' : 'black',
                            position: 'relative'
                        }}
                    >
                        {selectedIndex !== -1 && (
                            <span style={{
                                position: 'absolute',
                                color: 'black',
                                transform: 'translate(20%, 100%)',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                padding: '5px',
                                width: '1rem',
                                height: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                border: '1px solid black'
                            }}>
                                {selectedIndex + 1}
                            </span>
                        )}
                        <Card info={card}></Card>
                    </button>
                )
            })}
        </div>
        <div className="submit-button">
            <button
                onClick={handleSubmit}
                disabled={!selectedRPS}
            >
                Submit
            </button>
        </div>
    </div>
}
