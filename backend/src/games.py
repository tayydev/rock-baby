import datetime
import uuid

from pydantic import BaseModel

from data import LobbyState, PlayerOptions, list_cards


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
        return new_game

    def join_game(self, game_id: str) -> LobbyState:
        pass

    def get_state(self, game_id) -> LobbyState:
        pass

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
