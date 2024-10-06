import uuid

from fastapi import FastAPI, Depends, Body
from starlette.middleware.cors import CORSMiddleware

from cards import list_cards
from data import LobbyState, BaseCard, Player, Throw
from games import Games, get_games

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://playrock.baby"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)


@app.get("/create-game")
def create_game(game: Games = Depends(get_games)) -> LobbyState:
    return game.start_game()


@app.get("/get-game")
def get_game(game_id: uuid.UUID, game: Games = Depends(get_games)) -> LobbyState:
    return game.get_state(game_id)


@app.get("/join-game")
def join_game(game_id: uuid.UUID, game: Games = Depends(get_games)) -> LobbyState:
    return game.join_game(game_id)


@app.post("/post-game")
def submit(game_id: uuid.UUID,
           selected_cards: list[str] = Body(...),
           role: Player = Body(...),
           throw_choice: Throw = Body(...),
           game: Games = Depends(get_games)
           ) -> LobbyState:
    good_card_happy = []
    for name in selected_cards:
        for card in list_cards():
            if(card.name) == name:
                good_card_happy.append(card)
    return game.submit(game_id, good_card_happy, role, throw_choice)
