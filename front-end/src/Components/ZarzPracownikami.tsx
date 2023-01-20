import useSWR from 'swr'
import { API } from '../api/api';
import { Serwisanci } from './Serwisanci';
import "./Css/pracownik.css"
import { Button } from '@mantine/core';
import { useState } from 'react';
import { DodajPracownika } from './DodajPracownika';
import { Link } from 'react-router-dom';

export function ZarzPracownikami () {
  const [isCreationOn, setIsCreationOn] = useState(false);
  const {data, error} = useSWR("http://localhost:5000/pracownik/sprzedawca", API.zwrocPracownikow, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  const handleDelete = async (id: number) => {
    await API.deletePracownik(id);
  } 

  const handleDodanie = () => {
    setIsCreationOn(true);
  }
  
  const handleKoniecDodawania = () => {
    setIsCreationOn(false);
  }

  return(
  <div className='listaPracownikow'>
    <h1>Zarzadzanie pracownikami!</h1>
    <p>Powrot do <Link to="/pracownik" style={{color: 'white'}}>strony pracowniczej</Link></p>
    <Button onClick={handleDodanie} radius="md" color="green">Kliknij, aby dodac nowego pracownika</Button>
    {isCreationOn && 
      <DodajPracownika />
    }
    <Button onClick={handleKoniecDodawania} radius="md" color="green">Kliknij, aby skonczyc</Button>
    <h1>WYKAZ PRACOWNIKOW</h1>
    <ul className="list">
    {data.map((pracownik: Pracownik) => 
    <li key={pracownik.id}>
      <h4>SPRZEDAWCA: {pracownik.imie} {pracownik.nazwisko} - {pracownik.email}</h4>
      <p>
        Wynagrodzenie: {pracownik.wynagrodzenie}, typ_umowy: {pracownik.typ_umowy}, data zatrudnienia: {pracownik.data_zatrudnienia}
      </p>
      <Button onClick={() => handleDelete(pracownik.id)} radius="md" color="red">Delete</Button>
    </li>)}
    <Serwisanci />
  </ul>
  </div>);
}

export interface Pracownik {
  id: number;
  imie: string;
  nazwisko: string;
  email: string;
  haslo: string;
  typ_umowy: string;
  data_zatrudnienia: string;
  wynagrodzenie: number;
  rola: string;
}

export interface NowyPracownikDto {
  id: number;
  imie: string;
  nazwisko: string;
  email: string;
  haslo: string;
  typ_umowy: string;
  data_zatrudnienia: string;
  wynagrodzenie: number;
  rola: string;
}
