import { Button } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSWR from 'swr'
import { API } from '../api/api';
import { DodajRezerwacje } from './DodajRezerwacje';
import { ZwrocSamochod } from './ZwrocSamochod';

export function Rezerwacje () {
  const [isCreationOn, setIsCreationOn] = useState(false);
  const {data, error} = useSWR("http://localhost:5000/rezerwacja/wypisz", API.zwrocRezerwacje, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const handleDelete = async (id: number) => {
    await API.deleteRezerwacja(id);
  } 

  const handleDodanie = () => {
    setIsCreationOn(true);
  }
  
  const handleKoniecDodawania = () => {
    setIsCreationOn(false);
  }

  return(
    <div className="rezerwacje">
      <h1>REZERWACJE</h1>
      <p>Powrot do <Link to="/klient" style={{color: 'white'}}>strony glownej</Link></p>
    <Button onClick={handleDodanie} radius="md" color="green">Kliknij, aby dodac nowa rezerwacje</Button>
    {isCreationOn && <DodajRezerwacje />}
    <Button onClick={handleKoniecDodawania} radius="md" color="green">Kliknij, aby skonczyc</Button>
    <h1>Wykaz rezerwacji</h1>
    <ul className="list">
      {data.map((rezerwacja: RezerwacjaType) => 
        <li key={rezerwacja.nr_rez}>
            <h4>NR REZ: {rezerwacja.nr_rez}</h4>
            <ZwrocSamochod id={Number(rezerwacja.id_samochodu)} />
            <p>Data wypozyczenia: {rezerwacja.data_wypozyczenia} Data zwrotu: {rezerwacja.data_zwrotu} </p>
            <Button onClick={() => handleDelete(rezerwacja.nr_rez)} radius="md" color="red">Delete</Button>
        </li>)}
    </ul>
    </div>
  );
}

export interface RezerwacjaType {
  nr_rez: number;
  id_samochodu: number;
  data_wypozyczenia: string;
  data_zwrotu: string;
  id_klienta?: number;
}
