from pydantic import BaseModel

from data import LobbyStatus, CardInfoDTO, PlayerOptions, LobbyState


class Games(BaseModel):
    state: dict[str, LobbyState]

    def start_game(self) -> LobbyState:
        pass

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
