import useSWR from 'swr'
import { API } from '../api/api';
import { Serwisanci } from './Serwisanci';
import "./Css/pracownik.css"

export function ZarzPracownikami () {
  const {data, error} = useSWR("http://localhost:5000/pracownik/sprzedawca", API.zwrocPracownikow);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

    return(
    <div className='listaPracownikow'>
        <h1>WYKAZ PRACOWNIKOW</h1>
      <ul className="list">
      {data.map((pracownik: Pracownik) => 
        <li key={pracownik.id}>
            <h5>SPRZEDAWCA: {pracownik.imie}: {pracownik.nazwisko}: {pracownik.email}</h5>
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
