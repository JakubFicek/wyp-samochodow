import { Link } from "react-router-dom";
import useSWR from "swr";
import { API } from "../api/api";
import { ZwrocSamochod } from "./ZwrocSamochod";

export function Wypozyczenia () {
  const {data, error} = useSWR("http://localhost:5000/wypozyczenie/wypisz", API.wypiszWypozyczenia, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  return(
    <div className="rezerwacje">
      <h2>Twoje wypozyczenia</h2>
      <p>Powrot do <Link to="/klient" style={{color: 'white'}}>strony klienta</Link></p>
      <ul className="list">
      {data.map((wypo: Wypozyczenie) => 
        <li key={wypo.nr_wyp}>
            <ZwrocSamochod id={Number(wypo.id_samochodu)} />
            <p>Data wypozyczenia: {wypo.data_wypozyczenia} Data zwrotu: {wypo.data_zwrotu} Cena: {wypo.cena_wypozyczenia}</p>
        </li>)}
      </ul>
    </div>
  );
}

export interface Wypozyczenie {
  nr_wyp: number;
  id_samochodu: number;
  data_wypozyczenia: string;
  id_klienta?: number;
  data_zwrotu: string;
  cena_wypozyczenia: number;  
}