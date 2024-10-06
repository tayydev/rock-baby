import uuid

from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from data import LobbyState
from games import Games, get_games

app = FastAPI()

# TODO: DELETE FOLLOWING SECURITY HOLES:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE, etc.)
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
