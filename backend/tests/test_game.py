from cards import DoNothing, WashingMachine
from data import LobbyStatus, GameState, PlayerState, Throw, Player
from games import Games


def test_games():
    game = Games(state={})

    lobby = game.start_game()
    assert lobby.status == LobbyStatus.CREATED
    assert lobby.id != "" and lobby.id is not None
    assert lobby.guest.available != []
    assert lobby.host.available != []

    lobby = game.join_game(lobby.id)
    assert lobby.status == LobbyStatus.PLAYING
    assert len(lobby.guest.available) == 3
    assert len(lobby.host.available) == 3

    lobby = game.submit(lobby.id, [WashingMachine()], Player.GUEST, Throw.ROCK)
    assert lobby.status == LobbyStatus.PLAYING
    lobby = game.submit(lobby.id, [DoNothing(), DoNothing(), DoNothing()], Player.HOST, Throw.PAPER)
    assert lobby.status == LobbyStatus.SHOWDOWN
    assert lobby.end.winner == Player.HOST



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

