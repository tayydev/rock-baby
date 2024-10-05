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


class Player(str, Enum):
    HOST = "host"
    GUEST = "guest"


class Throw(str, Enum):
    ROCK = "Rock"
    PAPER = "Paper"
    SCISSORS = "Scissors"
    NONE = "Nothing"

    def cycle(self):
        if self is self.ROCK:
            return self.PAPER
        elif self is self.PAPER:
            return self.SCISSORS
        elif self is self.SCISSORS:
            return self.ROCK
        else:
            return self.NONE


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
    throw: Optional[Throw] = None


class GameState(BaseModel):
    host_state: "PlayerState"
    guest_state: "PlayerState"


class PlayerState(BaseModel):
    throw: Throw
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
    def change_state(self, old: GameState, played_by: Player) -> GameState:
        pass  # don't need to define abstract method
