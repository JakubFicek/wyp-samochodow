import { Link } from "react-router-dom";
import useSWR from "swr"
import { API } from "../api/api";

export function WyswietlanieRaportow () {
  const {data, error} = useSWR("http://localhost:5000/raport", API.zwrocRaporty);
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return(
    <div className="WysRap">
      <h2>Raporty!</h2>
      <p>Powrot do <Link to="/pracownik" style={{color: 'white'}}>strony pracowniczej</Link></p>
      <ul className="list">
      {data.map((raport: Raport) => 
          <li key={raport.id}>
            <h4>RAPORT {raport.id}: Il wypozyczen = {raport.il_wypozyczen}, ID Pracownika tworzacego: {raport.kto_sporzadzil} </h4>
            <p>ID Wszystkich wypozyczen: {raport.wszystkie_wypozyczenia}, ID Wszystkich rezerwacji: {raport.wszystkie_rezerwacje}
              Przychod = {Number(raport.przychod)}, Data stworzenie: {raport.data_stworzenia} 
            </p> 
          </li>
        )}
      </ul>
    </div>
  );
}

export interface Raport {
  id: number;
  il_wypozyczen: number;
  kto_sporzadzil: number;
  wszystkie_wypozyczenia: string;
  wszystkie_rezerwacje: string;
  data_stworzenia: string;
  przychod: number;
}