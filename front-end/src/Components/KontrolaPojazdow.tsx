import { Button } from "@mantine/core";
import useSWR from "swr";
import { API } from "../api/api";
import { Auto } from "./Types/auto";

export function KontrolaPojazdow () {
  const {data, error} = useSWR("http://localhost:5000/samochod", API.zwrocSamochody, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  const handleNaprawe = () => {
    
  } 

  return (
    <div>
      <h1>Wykaz samochodow</h1>
      <ul className="list">
      {data.map((auto: Auto) => 
        <li key={auto.id}>
          <h4>Auto: {auto.marka}, {auto.model}, {auto.rok_produkcji}, STAN: {auto.stan_pojazdu}</h4>
            
          {auto.stan_pojazdu === "Do przegladu" && 
          <Button onClick={handleWyswietlanie} radius="md" color="grape">Przeglad wykonany</Button>}

          {auto.stan_pojazdu === "Do naprawy" && 
          <Button onClick={handleNaprawe} radius="md" color="grape">Naprawiony</Button>}

        </li>)}
    </ul>
        </div>
    );
}