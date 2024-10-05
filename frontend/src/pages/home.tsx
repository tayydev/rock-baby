import { route } from 'preact-router'
import '../app.css'


export function Home() {

    const navigateToGame = (role: string) => {
        route(`/game?role=${role}`);
    }

  return (
      <div className="card">
          <button onClick={() => navigateToGame('host')}>
              Host Game
          </button>
          <button onClick={() => navigateToGame('guest')}>
              Join Game
          </button>
      </div>
  )
}
