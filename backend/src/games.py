import datetime
import uuid

from pydantic import BaseModel

from cards import list_cards
from data import LobbyState, PlayerOptions


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
        # TODO: Finish this with Arya
        #if self.state[game_id] is uuid.UUID:
        pass

    def get_state(self, game_id: uuid.UUID) -> LobbyState:
        """
        return state if exists, throw error if not
        :param game_id:
        :return:
        """
          #TODO: it doesn't work
        if self.state[game_id] is None:
            raise Exception("Game does not exist! :(")
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
