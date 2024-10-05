from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class LobbyStatus(str, Enum):
    CREATED = "created"  # before guest has joined
    PLAYING = "playing"  # selecting cards
    SHOWDOWN = "showdown"  # showing the winner

class RandomPayloadDTO(BaseModel):
    message: str
    number: int

class CardInfoDTO(BaseModel):
    name: str  # icon is conventionally [name].png
    description: str

class LobbyState(BaseModel):
    last_update: datetime
    status: "LobbyStatus" = LobbyStatus.CREATED
    guest: "PlayerOptions"
    host: "PlayerOptions"
    game_history: list["GameState"] = []

class PlayerOptions(BaseModel):
    available: list[CardInfoDTO]
    selected: list[CardInfoDTO] = []
    throw: str = ""

class GameState(BaseModel):
    host_state: "PlayerState"
    guest_state: "PlayerState"

class PlayerState(BaseModel):
    throw: str
    status_effects: list[str]  # assumes status effect have unique string names
    played_card: Optional[CardInfoDTO]
