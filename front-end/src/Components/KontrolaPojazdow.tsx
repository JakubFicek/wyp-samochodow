import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { API } from "../api/api";
import { Auto } from "./Types/auto";

export function KontrolaPojazdow () {
  const [wpis, setWpis] = useState("");
  const [wpisError, setWpisError] = useState(false);

  const {data, error} = useSWR("http://localhost:5000/samochod", API.zwrocSamochody, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const handlePrzeglad = async (id: number) => {
    if(!wpis) setWpisError(true);
    else setWpisError(false);

    if(wpis) {
        await API.ksiazkaSerwisowa(id, wpis);
        await API.stanNaDostepny(id);

        setWpis("");
    } 

  }
  const handleDoNaprawy = async (id: number) => {
    await API.doNaprawy(id);
  } 

  const handleNaprawe = async (id: number) => {
    await API.stanNaDostepny(id);
  } 

  return (
    <div className='listaPracownikow'>
      <h1>Wykaz samochodow</h1>
      <p>Powrot do <Link to="/pracownik" style={{color: 'white'}}>strony pracowniczej</Link></p>
      <ul className="list">
      {data.map((auto: Auto) => 
        <li key={auto.id}>
          <h4>Auto: {auto.marka}, {auto.model}, {auto.rok_produkcji}, STAN: {auto.stan_pojazdu}</h4>
            
          {auto.stan_pojazdu === "Do przegladu" && 
          <div>
            <TextInput
          placeholder="Wpis do ksiazeczki serwisowej - DATA"
          label="Wpis z data wykonania"
          radius="xs"
          value={wpis}
          type="email"
          required
          onChange={(e) => setWpis(e.target.value)}
          error={wpisError && "podaj wpis"}
            />
            <Button onClick={() => handlePrzeglad(auto.id)} radius="md" color="grape">Przeglad wykonany</Button>
            <Button onClick={() => handleDoNaprawy(auto.id)} radius="md" color="grape">Auto do naprawy</Button>
          </div>}

          {auto.stan_pojazdu === "Do naprawy" && 
          <Button onClick={() => handleNaprawe(auto.id)} radius="md" color="grape">Naprawiony</Button>}
        </li>)}
    </ul>
        </div>
    );
}