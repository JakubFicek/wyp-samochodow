import { Button } from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router";

export function Fasada() {
  const [wyp, setWyp] = useState(false); 
  const [rez, setRez] = useState(false); 

  const wypozyczenia = () => {
    setWyp(true);
  }

  const rezerwacja = () => {
    setRez(true);    
  }

  return(
    <div>
      <Button onClick={wypozyczenia} color="green" size="lg" radius="xl"> Wypozyczenia </Button>
      {wyp && <Navigate to="/wypozyczenia" />}
      <Button onClick={rezerwacja} color="green" size="lg" radius="xl"> Rezerwacja </Button>
      {rez && <Navigate to="/rezerwacje" />}
    </div>
    );
}