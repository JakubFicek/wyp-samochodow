import { Logout } from "./Logout";
import "./Css/klientPage.css"
import { Button } from "@mantine/core";
import { Navigate } from "react-router";
import { useState } from "react";
import { API } from "../api/api";
import useSWR from "swr";

export function PracownikPage () {
  const [wybor, setWybor] = useState("")
  const {data, error} = useSWR("http://localhost:5000/weryfikacja/pracownik", API.zwrocPracownika);
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  const handleZarzadzanie = () => {
    if(data?.rola === "Administrator") setWybor("pracownicy");
  }

  const handleAuta = () => {
    if(data?.rola === "Administrator") setWybor("samochody");
  }

  return(
    <div>
      <Logout />
      <div className="klientPage">
        <h1>Strona pracownicza!</h1>
        <Button onClick={handleZarzadzanie} size="lg" color="green" radius="xl"> Zarzadzaj pracownikami </Button>
        <Button onClick={handleAuta} color="green" size="lg" radius="xl"> Zarzadzaj samochodami </Button>
        {wybor === "samochody" && <Navigate to="/zarzSam" />}
        {wybor === "pracownicy" && <Navigate to="/zarzPrac" />}
      </div>
    </div>
  );
}
