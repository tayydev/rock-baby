from random import randint

from data import BaseCard, GameState, Player, Throw


def shared_change_state(old: GameState, played_by: Player) -> [GameState, bool]:  # updated state, should continue execute
    if played_by is Player.GUEST and "jail" in old.guest_state.status_effects:
        old.guest_state.status_effects.remove("jail")
        new_guest_state = old.guest_state.model_copy(update={
            "status_effects": old.guest_state.status_effects,
            "played_card": None
        })
        new_game_state = old.model_copy(update={
            "guest_state": new_guest_state
        })
        return new_game_state, False
    if played_by is Player.HOST and "jail" in old.host_state.status_effects:
        old.host_state.status_effects.remove("jail")
        new_host_state = old.host_state.model_copy(update={
            "status_effects": old.host_state.status_effects,
            "played_card": None
        })
        new_game_state = old.model_copy(update={
            "host_state": new_host_state
        })
        return new_game_state, False

    return old, True

def angel_save(old: GameState, player_saved: Player) -> GameState:
    throw_types = [Throw.SCISSORS,Throw.PAPER,Throw.ROCK]
    rand_throw = randint(0,2)

    if player_saved is Player.HOST:
        old.host_state.status_effects.remove("angel")
        throw = rand_throw if (old.guest_state.throw is Throw.NONE) else old.guest_state.throw.cycle().cycle()
        new_host_state = old.host_state.model_copy(update={
            "throw": throw,
            "status_effect": old.host_state.status_effects
        })
        new_guest_state = old.guest_state.model_copy()
    else:
        old.guest_state.status_effects.remove("angel")
        throw = rand_throw if (old.host_state.throw is Throw.NONE) else old.host_state.throw.cycle().cycle()
        new_guest_state = old.guest_state.model_copy(update={
            "throw": throw,
            "status_effect": old.guest_state.status_effects
        })
        new_host_state = old.host_state.model_copy()
    return old.model_copy(update={
        "host_state": new_host_state,
        "guest_state": new_guest_state
    })

class DoNothing(BaseCard):
    name: str = "Does Nothing"
    path: str = "nothing"
    description: str = "Does Nothing :3"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        return old


class WashingMachine(BaseCard):
    name: str = "Washing Machine"
    path: str = "washing.png"
    description: str = "Sends you and your opponent's hands for a tumble! Cycles throws forward: Rock -> Paper | Paper -> Scissors | Scissors -> Rock"

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
    description: str = "Apparently the coriolis effect hits washing machines too! Washing machines down under cycle hands backward: Rock -> Scissors | Paper -> Rock | Scissors -> Paper"

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

class CardJail(BaseCard):
    name: str = "Card Jail"
    path: str = "card_jail.png"
    description: str = "No one is above the law! One too many illicit activities by your opponent means their next card has no effect."

    def change_state(self, old: GameState, played_by: Player) -> GameState:

        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        if played_by is Player.HOST:
            old.guest_state.status_effects.append("jail")
            new_guest_state = old.guest_state.model_copy(update={
                "status_effects": old.guest_state.status_effects
            })
            new_host_state = old.host_state.model_copy(update={
                "played_card": self
            })
        else:
            old.host_state.status_effects.append("jail")
            new_host_state = old.host_state.model_copy(update={
                "status_effects": old.host_state.status_effects
            })
            new_guest_state = old.guest_state.model_copy(update={
                "played_card": self
            })

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class OppositeDay(BaseCard):
    name: str = "Opposite Day"
    path: str = "oppositeday.png"
    description: str = "Its opposite day! At the end of the game, if you would have lost, win instead! Of course, if you would have won, now you lose. Womp Womp."

    def change_state(self, old: GameState, played_by: Player) -> GameState:

        is_flipped = False
        if "winflip" in old.host_state.status_effects or old.guest_state.status_effects:
            is_flipped = True

        if is_flipped:
            if "winflip" in old.host_state.status_effects:
                old.host_state.status_effects.remove("winflip")
                new_host_state = old.host_state.model_copy(update={
                    "status_effects": old.host_state.status_effects,
                    "played_card": self if (played_by == Player.HOST) else None
                })
                new_guest_state = old.guest_state.model_copy(update={
                    "played_card": self if (played_by == Player.GUEST) else None
                })
            else:
                old.guest_state.status_effects.remove("winflip")
                new_guest_state = old.guest_state.model_copy(update={
                    "status_effects": old.guest_state.status_effects,
                    "played_card": self if (played_by == Player.GUEST) else None
                })
                new_host_state = old.host_state.model_copy(update={
                    "played_card": self if (played_by == Player.HOST) else None
                })
        else:
            if played_by is Player.HOST:
                old.host_state.status_effects.append("winflip")
                new_host_state = old.host_state.model_copy(update={
                    "status_effects": old.host_state.status_effects,
                    "played_card": self
                })
                new_guest_state = old.guest_state.model_copy()
            else:
                old.guest_state.status_effects.append("winflip")
                new_guest_state = old.guest_state.model_copy(update={
                    "status_effects": old.guest_state.status_effects,
                    "played_card": self
                })
                new_host_state = old.host_state.model_copy()

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class Angel(BaseCard):
    name: str = "Guardian Angel"
    path: str = "angel.png"
    description: str = "An angel descends from heaven, staying by your side to aid in your time of need. If your throw is destroyed, restores it to the winning one."

    def change_state(self, old: GameState, played_by: Player) -> GameState:

        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        if played_by is Player.HOST:
            old.host_state.status_effects.append("angel")
            new_host_state = old.host_state.model_copy(update={
                "status_effects": old.host_state.status_effects,
                "played_card": self
            })
            new_guest_state = old.guest_state.model_copy()
        else:
            old.guest_state.status_effects.append("angel")
            new_guest_state = old.guest_state.model_copy(update={
                "status_effects": old.guest_state.status_effects,
                "played_card": self
            })
            new_host_state = old.host_state.model_copy()

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class Cat(BaseCard):
    name: str = "Cat"
    path: str = "cat.png"
    description: str = "Silly kitty! The cat got a little too playful and destroyed all the paper. Paper hands of both players are destroyed."

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        new_host_state = old.host_state.model_copy(update={
            "played_card": self if (played_by == Player.HOST) else None
        })
        new_guest_state = old.guest_state.model_copy(update={
            "played_card": self if (played_by == Player.HOST) else None
        })

        if old.host_state.throw is Throw.PAPER:
            if("angel" in old.host_state.status_effects):
                return angel_save(old,Player.HOST)
            new_host_state = old.host_state.model_copy(update={
                "throw": old.host_state.throw.NONE,
                "played_card": self if (played_by == Player.HOST) else None
            })

        if old.guest_state.throw is Throw.PAPER:
            if("angel" in old.guest_state.status_effects):
                return angel_save(old,Player.GUEST)
            new_guest_state = old.guest_state.model_copy(update={
                "throw": old.guest_state.throw.NONE,
                "played_card": self if (played_by == Player.GUEST) else None
            })

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class Screw(BaseCard):
    name: str = "Loose Screw"
    path: str = "screw.png"
    description: str = "Uh oh! A loose screw loosens your scissors, and now they've fallen apart. If your throw is scissors, destroy it. Looks like someone's really screwed!"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        new_host_state = old.host_state.model_copy(update={
            "played_card": self if (played_by == Player.HOST) else None
        })
        new_guest_state = old.guest_state.model_copy(update={
            "played_card": self if (played_by == Player.GUEST) else None
        })

        if played_by is Player.HOST and old.host_state.throw is Throw.SCISSORS:
            if("angel" in old.host_state.status_effects):
                return angel_save(old,Player.HOST)
            new_host_state = old.host_state.model_copy(update={
                "throw": old.host_state.throw.NONE,
                "played_card": self
            })
        if played_by is Player.GUEST and old.guest_state.throw is Throw.SCISSORS:
            if("angel" in old.guest_state.status_effects):
                return angel_save(old,Player.GUEST)
            new_guest_state = old.guest_state.model_copy(update={
                "throw": old.guest_state.throw.NONE,
                "played_card": self
            })

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class Gun(BaseCard):
    name: str = "Gun"
    path: str = "gun.png"
    description: str = "Rock, paper, scissors, GUN!! If your opponent's throw is rock, destroy it. Watch out for flying fragments!"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        new_host_state = old.host_state.model_copy(update={
            "played_card": self if (played_by == Player.HOST) else None
        })
        new_guest_state = old.guest_state.model_copy(update={
            "played_card": self if (played_by == Player.GUEST) else None
        })

        if played_by is Player.HOST and old.guest_state.throw is Throw.ROCK:
            if("angel" in old.guest_state.status_effects):
                return angel_save(old,Player.GUEST)
            new_guest_state = old.guest_state.model_copy(update={
                "throw": old.guest_state.throw.NONE,
            })
        if played_by is Player.GUEST and old.host_state.throw is Throw.ROCK:
            if("angel" in old.host_state.status_effects):
                return angel_save(old,Player.HOST)
            new_host_state = old.host_state.model_copy(update={
                "throw": old.host_state.throw.NONE,
            })

        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

class DevilDice(BaseCard):
    name: str = "Deal with the Devil"
    path: str = "devildice.png"
    description: str = "Reroll yours and your opponent's throw, but watch out! The devil giveth and the devil taketh away. (Your throw may be destroyed)"

    def change_state(self, old: GameState, played_by: Player) -> GameState:
        shared, should_continue = shared_change_state(old, played_by)
        if not should_continue:
            return shared

        throw_types = [Throw.SCISSORS,Throw.PAPER,Throw.ROCK,Throw.NONE]
        opponent_rand = randint(0,2)
        player_rand = randint(0,3)

        if played_by is Player.HOST:
            guest_throw = throw_types[opponent_rand]
            host_throw = throw_types[player_rand]
            if("angel" in old.host_state.status_effects and host_throw is Throw.NONE):
                return angel_save(old,Player.HOST)
            new_host_state = old.host_state.model_copy(update={
                "throw": host_throw,
            })
            new_guest_state = old.guest_state.model_copy(update={
                "throw": guest_throw,
            })
        else:
            host_throw = throw_types[opponent_rand]
            guest_throw = throw_types[player_rand]
            if("angel" in old.guest_state.status_effects and guest_throw is Throw.NONE):
                return angel_save(old,Player.GUEST)
            new_host_state = old.host_state.model_copy(update={
                "throw": host_throw,
            })
            new_guest_state = old.guest_state.model_copy(update={
                "throw": guest_throw,
            })
        return old.model_copy(update={
            "host_state": new_host_state,
            "guest_state": new_guest_state
        })

def list_cards() -> list[BaseCard]:
    return [
        DoNothing(),
        WashingMachine(),
        AusWashingMachine(),
        CardJail(),
        OppositeDay(),
        Angel(),
        Cat(),
        Screw(),
        Gun(),
        DevilDice()
    ]
