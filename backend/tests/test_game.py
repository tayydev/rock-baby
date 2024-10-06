from cards import DoNothing, WashingMachine
from data import LobbyStatus, GameState, PlayerState, Throw, Player
from games import Games


def test_games():
    game = Games(state={})

    result = game.start_game()
    assert result.status == LobbyStatus.CREATED
    assert result.id != "" and result.id is not None
    assert result.guest.available != []
    assert result.host.available != []

    result = game.join_game(result.id)
    assert result.status == LobbyStatus.PLAYING
    assert len(result.guest.available) == 3
    assert len(result.host.available) == 3


def test_washing_machine():
    game_state = GameState(
        host_state=PlayerState(
            throw=Throw.SCISSORS,
            status_effects=[],
            played_card=DoNothing()
        ),
        guest_state=PlayerState(
            throw=Throw.ROCK,
            status_effects=[],
            played_card=None
        )
    )
    washer = WashingMachine()
    new_state = washer.change_state(game_state, played_by=Player.GUEST)
    assert new_state.guest_state.played_card.name == "Washing Machine"
    assert new_state.host_state.played_card is None
    assert new_state.host_state.throw == Throw.PAPER
    assert new_state.guest_state.throw == Throw.SCISSORS

