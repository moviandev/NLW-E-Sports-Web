import { useState, useEffect } from 'react';
import { GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';

import './styles/main.css'
import logoImg from './assets/logo-nlw.svg';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(res => res.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="logo nlw" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => (
          <GameBanner
            key={game.id}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content
            className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25"
          >
            <Dialog.Title className="text-3xl font-black">
              Publique um Anúncio
            </Dialog.Title>

            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor="game" className="">Qual o Game?</label>
                  <input id="game" type="text" placeholder="Selecione o game que deseja jogar" />
                </div>

                <div>
                  <label htmlFor="name">Seu nickname ou nome</label>
                  <input id="name" type="text" placeholder="Como te chamam dentro do jogo?" />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                  </div>
                  <div>
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <input id="discord" type="text" placeholder="user#0000" />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                  </div>
                  <div>
                    <label htmlFor="hoursStart">Qual horario do dia?</label>
                    <div>
                      <input id="hoursStart" type="time" placeholder="De" />
                    </div>
                    <div>
                      <input id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>
                <div>
                  <input id="" type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer>
                  <button>Cancelar</button>
                  <button><GameController /> Encontrar Duo</button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

    </div>
  )
}

export default App
