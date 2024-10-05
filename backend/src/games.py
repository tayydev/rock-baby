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

    #check for uuid in dictionary, raise if not there, update the state
    #return lobby state
    def join_game(self, game_id: uuid.UUID) -> LobbyState:
        #if self.state[game_id] is uuid.UUID:
        pass

    #return state if exists, throw error if not
    def get_state(self, game_id) -> LobbyState:
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
