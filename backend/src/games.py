import datetime
import random
import uuid
from typing import Tuple

from fastapi import HTTPException
from pydantic import BaseModel

from cards import list_cards
from data import LobbyState, PlayerOptions, LobbyStatus, Player, Throw, BaseCard, GameState, PlayerState, GameEndState


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
            "guest": PlayerOptions(available=random.sample(list_cards(), 5)),
            "host": PlayerOptions(available=random.sample(list_cards(), 5))
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

    def submit(self, game_id: uuid.UUID, selected_cards: list[BaseCard], role: Player, throw_choice: Throw):
        game = self.get_state(game_id)
        updated = game.model_copy(update={
            "host" if (role == Player.HOST) else "guest": PlayerOptions(
                available=[], selected=selected_cards, throw=throw_choice
            )
        })
        self.state[game_id] = updated
        return self.check_completed(game_id)

    def check_completed(self, game_id: uuid.UUID) -> LobbyState:
        game = self.get_state(game_id)
        if game.guest.throw is None or game.host.throw is None:
            return game  # this case is just if the game isn't over yet
        guest_tuples = [(a, Player.GUEST) for a in game.guest.selected]
        host_tuples = [(a, Player.HOST) for a in game.host.selected]
        mixed: list[Tuple[BaseCard, Player]] = _interleave([guest_tuples, host_tuples])
        initial_game_state = GameState(
            host_state=PlayerState(throw=game.host.throw),
            guest_state=PlayerState(throw=game.guest.throw)
        )
        history = [initial_game_state]
        for tup in mixed:
            card, player = tup
            history.append(card.change_state(history[-1], player))
        end = _determine_game_end_state(history[-1])
        updated_game = game.model_copy(update={
            "game_history": history,
            "end": end,
            "status": LobbyStatus.SHOWDOWN
        })
        self.state[game_id] = updated_game
        return updated_game

def _determine_game_end_state(state: GameState):
    if state.guest_state.throw == state.host_state.throw:
        winner = random.choice(list(Player))
        return GameEndState(
            winner=winner,
            tie_breaker="Tie broken by player with longest remaining life span"
        )
    if state.guest_state.throw == Throw.NONE:
        return GameEndState(winner=Player.HOST)
    if state.host_state.throw == Throw.NONE:
        return GameEndState(winner=Player.GUEST)
    if state.host_state.throw.cycle() == state.guest_state.throw:  # host dies
        return GameEndState(winner=Player.GUEST)
    if state.guest_state.throw.cycle() == state.host_state.throw:
        return GameEndState(winner=Player.HOST)
    raise Exception("Unknown Win State Encountered")


def _interleave(arrays):
    # WARNING: this is chatgpt magic
    result = []
    iterators = [iter(arr) for arr in arrays]
    while iterators:
        next_iterators = []
        for it in iterators:
            try:
                result.append(next(it))
                next_iterators.append(it)
            except StopIteration:
                continue
        if not next_iterators:
            break
        iterators = next_iterators
    return result


games = Games(state={})


def get_games():
    return games
