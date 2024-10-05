from typing import Optional

from data import BaseCard, GameState, Player


def shared_change_state(old: GameState, played_by: Player) -> [GameState, bool]:  # updated state, should continue execute
    if played_by is Player.GUEST and "jail" in old.guest_state.status_effects:
        pass  # return a version with no more jail in status effects, but also played by not doing anything
    # TODO: also jail if player isn't guest

    return old, True


class DoNothing(BaseCard):
    name: str = "Does Nothing"
    path: str = "nothing"
    description: str = "Does Nothing :3"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        return old


class WashingMachine(BaseCard):
    name: str = "Washing Machine"
    path: str = "washing.png"
    description: str = "Cycles throws to what they beat"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        new_host_state = old.host_state.model_copy(update={
            "throw": old.host_state.throw.cycle().cycle(),
            # return self if (conditional==true) else none
            "played_card": self if (played_by == Player.HOST) else None
        })
        new_guest_state = old.guest_state.model_copy(update={
            "throw": old.guest_state.throw.cycle().cycle(),
            "played_card": self if (played_by == Player.GUEST) else None
        })
        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class AusWashingMachine(BaseCard):
    name: str = "Australian Washing Machine"
    path: str = "auswashing.png"
    description: str = "Cycles throws to what they lose to"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        new_host_state = old.host_state.model_copy(update={
            "throw": old.host_state.throw.cycle(),
            "played_card": self if (played_by == Player.HOST) else None
        })
        new_guest_state = old.guest_state.model_copy(update={
            "throw": old.guest_state.throw.cycle(),
            "played_card": self if (played_by == Player.GUEST) else None
        })

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })


def list_cards() -> list[BaseCard]:
    return [
        DoNothing(),
        WashingMachine(),
        AusWashingMachine()
    ]
