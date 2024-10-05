// import {useEffect, useState} from 'preact/hooks'
import { route } from 'preact-router'
// import preactLogo from '../assets/preact.svg'
// import viteLogo from '/vite.svg'
import '../app.css'
// import {Configuration, DefaultApi} from "../client";

// const apiConfig = new Configuration({
//     basePath: 'http://127.0.0.1:8000', // Your FastAPI base URL
// });


// const apiClient = new DefaultApi(apiConfig);


export function Home() {
  
    const navigateToGame = () => {
        route(`/game?role=host`);
    }

  return (
      <div className="card">
          <button onClick={navigateToGame}>
              Go to Game
          </button>
      </div>
  )
}
