import uuid
from abc import ABC, abstractmethod
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


class LobbyState(BaseModel):
    id: uuid.UUID
    last_update: datetime
    status: "LobbyStatus" = LobbyStatus.CREATED
    guest: "PlayerOptions"
    host: "PlayerOptions"
    game_history: list["GameState"] = []


class PlayerOptions(BaseModel):
    available: list["BaseCard"]
    selected: list["BaseCard"] = []
    throw: str = ""


class GameState(BaseModel):
    host_state: "PlayerState"
    guest_state: "PlayerState"


class PlayerState(BaseModel):
    throw: str
    status_effects: list[str]  # assumes status effect have unique string names
    played_card: Optional["BaseCard"]


# ###
# CARD STUFF AFTER THIS LINE
# ###

class BaseCard(BaseModel, ABC):
    name: str
    path: str
    description: str

    @abstractmethod
    def change_state(self, old: GameState) -> GameState:
        pass  # don't need to define abstract method


class DoNothing(BaseCard):
    name: str = "Does Nothing"
    path: str = "nothing"
    description: str = "Does Nothing :3"

    def change_state(self, old: GameState) -> GameState:
        return old


class WashingMachine(BaseCard):
    name: str = "Washing Machine"
    path: str = "washing.png"
    description: str = "Cycles throws to what they beat"

    def change_state(self, old: GameState) -> GameState:
        # TODO: Add state changing logic
        return old


def list_cards() -> list[BaseCard]:
    return [
        DoNothing(),
        WashingMachine()
    ]
