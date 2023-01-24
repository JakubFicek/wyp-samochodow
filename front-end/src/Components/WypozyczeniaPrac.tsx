import { Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { API } from "../api/api";
import { DodajWypo } from "./DodajWypo";
import { DodajWypozRez } from "./DodajWypozRez";
import { Wypozyczenie } from "./Wypozyczenia";
import { ZwrocSamochod } from "./ZwrocSamochod";

export function WypozyczeniaPrac () {
    const [isCreationOn, setIsCreationOn] = useState(false);
    const [isCreationOnRez, setIsCreationOnRez] = useState(false);
    const {data, error} = useSWR("http://localhost:5000/wypozyczenie", API.wypiszWypozyczenia, { refreshInterval: 2000 });

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
  
    const handleDelete = async (id: number) => {
        await API.deleteWypo(id);
      } 
    
      const handleDodanie = () => {
        setIsCreationOn(true);
      }

      const handleDodanieZRez = () => {
        setIsCreationOnRez(!isCreationOnRez);
      }
      
      const handleKoniecDodawania = () => {
        setIsCreationOn(false);
      }

      const handleOddanie = async (id: number) => {
      
      }


    return(
      <div className="rezerwacje">
        <h1>Wypozyczenia</h1>
        <Button onClick={handleDodanie} radius="md" color="green">Kliknij, aby dodac nowe</Button>
            {isCreationOn && 
            <DodajWypo />
            }
        <Button onClick={handleKoniecDodawania} radius="md" color="green">Kliknij, aby skonczyc</Button>
        <h2>Wypozyczenie z rezerwacji!</h2>
        <Button onClick={handleDodanieZRez} radius="md" color="green">Kliknij, aby dodac</Button>
          {isCreationOnRez && 
            <DodajWypozRez />
            }
        <h2>Wszystkie wypozyczenia</h2>
        <p>Powrot do <Link to="/klient" style={{color: 'white'}}>strony glownej</Link></p>
        <ul className="list">
        {data.map((wypo: Wypozyczenie) => 
          <li key={wypo.nr_wyp}>
              <ZwrocSamochod id={Number(wypo.id_samochodu)} />
              <p>Data wypozyczenia: {wypo.data_wypozyczenia} Data zwrotu: {wypo.data_zwrotu} Cena: {wypo.cena_wypozyczenia} ID Klienta {wypo.id_klienta}</p>
              <Button onClick={() => handleDelete(Number(wypo.nr_wyp))} radius="md" color="red">Delete</Button>
              <Button onClick={() => handleOddanie(Number(wypo.id_samochodu))} radius="md" color="grape">Oddanie do przegladu</Button>
          </li>)}
        </ul>
      </div>
    );
}