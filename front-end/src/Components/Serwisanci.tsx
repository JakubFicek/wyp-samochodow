import { Button } from "@mantine/core";
import useSWR from "swr";
import { API } from "../api/api";
import { Pracownik } from "./ZarzPracownikami";

export function Serwisanci () {
    const {data, error} = useSWR("http://localhost:5000/pracownik/serwisant", API.zwrocPracownikow, { refreshInterval: 2000 });
  
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
  
    const handleDelete = async (id: number) => {
      await API.deletePracownik(id);
    } 

      return(
      <div>
        {data.map((pracownik: Pracownik) => 
          <li key={pracownik.id}>
              <h5>SERWISANT: {pracownik.imie}: {pracownik.nazwisko}: {pracownik.email}</h5>
              <Button onClick={() => handleDelete(pracownik.id)} radius="md" color="red">Delete</Button>
          </li>)}
      </div>);
  }