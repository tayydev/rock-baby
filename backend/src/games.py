import datetime
import random
import uuid

from fastapi import HTTPException
from pydantic import BaseModel

from cards import list_cards
from data import LobbyState, PlayerOptions, LobbyStatus


class Games(BaseModel):
    state: dict[uuid.UUID, LobbyState]

    def start_game(self) -> LobbyState:
        new_uuid = uuid.uuid4()
        new_time = datetime.datetime.now()
        new_game = LobbyState(
            id=new_uuid,
            last_update=new_time,
            guest=PlayerOptions(
                available=list_cards()
            ),
            host=PlayerOptions(
                available=list_cards()
            )
        )
        self.state[new_uuid] = new_game
        return new_game

    def join_game(self, game_id: uuid.UUID) -> LobbyState:
        """
        Check for uuid in dictionary, raise if not there, update the state
        :param game_id:
        :return: the new lobby state
        """
        game = self.get_state(game_id)
        self.state[game_id] = game.model_copy(update={
            "status": LobbyStatus.PLAYING,
            "last_update": datetime.datetime.now(),
            "guest": PlayerOptions(available=random.sample(list_cards(), 3)),
            "host": PlayerOptions(available=random.sample(list_cards(), 3))
        })
        return self.state[game_id]

    def get_state(self, game_id: uuid.UUID) -> LobbyState:
        """
        return state if exists, throw error if not
        :param game_id:
        :return:
        """
        if game_id not in self.state.keys():
            raise HTTPException(status_code=404, detail="Not a valid Game ID")
        return self.state[game_id]

    def set_options(self, cards: PlayerOptions, role: str):
        """

        :param cards:
        :param role: "host" or "client"
        :return:
        """
        pass


games = Games(state={})


def get_games():
    return games
