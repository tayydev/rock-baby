import random

from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from data import RandomPayloadDTO, LobbyState
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

@app.get("/random")
def random_number() -> RandomPayloadDTO:
    rand = random.randint(1, 10)
    message = "hello world"
    dto = RandomPayloadDTO(
        message=message,
        number=rand
    )
    return dto

@app.get("/create-game")
def create_game(game: Games = Depends(get_games)) -> LobbyState:
    return game.start_game()
