import { FormEvent, useEffect, useState } from 'react';
import { Check, GameController } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Toggle from '@radix-ui/react-toggle-group';

import { Input } from './Input';
import { Game } from '../../App';
import axios from 'axios';

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then((res) => setGames(res.data));
  }, []);

  const handleCreatedAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name)
      return;

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hoursStart: data.hoursStart,
        hourEnd: data.hourEnd,
        useVoiceChannel
      });
      alert('Sucesso ao criar o anuncio')
    } catch (e) {
      console.log(e);
      alert('Erro ao criar o anuncio')
    }


  }

  // Utilizar  ZOD e react hook form
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
      <Dialog.Content
        className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25"
      >
        <Dialog.Title className="text-3xl font-black">
          Publique um Anúncio
        </Dialog.Title>

        <form onSubmit={handleCreatedAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="game"
              className="font-semibold"
            >
              Qual o Game?
            </label>

            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
              defaultValue=""
            >
              <option disabled value="">Selecione o game que deseja jogar</option>
              {games.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nickname ou nome</label>
            <Input id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do jogo?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-2">
              <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
              <Input id="yearsPlaying"
                name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="discord">Qual o seu discord?</label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="user#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <Toggle.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                onValueChange={setWeekDays}
                value={weekDays}
              >
                <Toggle.Item
                  value="0"
                  className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Domingo"
                >
                  D
                </Toggle.Item>
                <Toggle.Item
                  value="1"
                  className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Segunda"
                >
                  S
                </Toggle.Item>
                <Toggle.Item
                  value="2"
                  className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Terça"
                >
                  T
                </Toggle.Item>
                <Toggle.Item
                  value="3"
                  className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quarta"
                >
                  Q
                </Toggle.Item>
                <Toggle.Item
                  value="4"
                  className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Quinta"
                >
                  Q
                </Toggle.Item>
                <Toggle.Item
                  value="5"
                  className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sexta"
                >
                  S
                </Toggle.Item>
                <Toggle.Item
                  value="6"
                  className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                  title="Sábado"
                >
                  S
                </Toggle.Item>
              </Toggle.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hoursStart">Qual horario do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  id="hoursStart"
                  name="hoursStart"
                  type="time"
                  placeholder="De" />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              className="w-6 h-6 p-1 rounded bg-zinc-900"
              checked={useVoiceChannel}
              onCheckedChange={c => {
                if (c === true)
                  setUseVoiceChannel(true);
                else
                  setUseVoiceChannel(false);
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController
                className="w-6 h-6"
              />
              Encontrar Duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}