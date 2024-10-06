import { route } from 'preact-router'
import '../app.css'


export function Home() {

    const navigateToGame = (role: string) => {
        route(`/game?role=${role}`);
    }

  return (
      <><img src='\assets\logo.png' alt='logo' style={
            {width: '90vw', maxHeight: '70vh', display: 'block', margin: 'auto', marginTop: '20px', objectFit: 'contain'}
      }/>
          <div className="card">
              <button onClick={() => navigateToGame('host')}>
                  Host Game
              </button>
          </div>
      </>
  )
}
