from src.data import LobbyStatus
from src.games import Games


def test_games():
    game = Games(state={})

    result = game.start_game()
    assert result.status == LobbyStatus.CREATED
