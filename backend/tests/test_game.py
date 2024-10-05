from data import LobbyStatus
from games import Games


def test_games():
    game = Games(state={})

    result = game.start_game()
    assert result.status == LobbyStatus.CREATED
    assert result.id != "" and result.id is not None
    assert result.guest.available != []
    assert result.host.available != []

