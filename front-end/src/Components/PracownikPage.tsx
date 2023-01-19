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

  const handleKontrola = () => {
    if(data?.rola === "Administrator" || data?.rola ==="Serwisant") setWybor("kontrola");
  }

  const handleWypozyczenia = () => {
    if(data?.rola === "Administrator" || data?.rola ==="Sprzedawca") setWybor("wypozyczenia");
  }

  const handleRaporty = () => {
    if(data?.rola === "Administrator" || data?.rola ==="Sprzedawca") setWybor("raporty");
  }

  const handleWysRap = () => {
    if(data?.rola === "Administrator" || data?.rola ==="Sprzedawca") setWybor("raportyWys");
  }

  return(
    <div>
      <Logout />
      <div className="klientPage">
        <h1>Strona pracownicza!</h1>
        <h3>Funkcje administratora:</h3>
        <Button onClick={handleZarzadzanie} size="lg" color="green" radius="xl"> Zarzadzaj pracownikami </Button>
        <Button onClick={handleAuta} color="green" size="lg" radius="xl"> Zarzadzaj samochodami </Button>
        {wybor === "samochody" && <Navigate to="/zarzSam" />}
        {wybor === "pracownicy" && <Navigate to="/zarzPrac" />}
        <h3>Funkcje Sprzedawcy: </h3>
        <Button onClick={handleRaporty} size="lg" color="green" radius="xl"> Tworzenie raportow </Button>
        <Button onClick={handleWysRap} size="lg" color="green" radius="xl"> Wszystkie raporty </Button>
        {wybor === "raporty" && <Navigate to="/tworzenieRaportow" />}
        {wybor === "raportyWys" && <Navigate to="/wyswietlanieRaportow" />}
        <Button onClick={handleWypozyczenia} size="lg" color="green" radius="xl"> Wypozyczenia </Button>
        {wybor === "wypozyczenia" && <Navigate to="/wypozyczeniaPracownika" />}
        <h3>Funkcje Serwisanta</h3>
        <Button onClick={handleKontrola} size="lg" color="green" radius="xl"> Kontrola Pojazdow </Button>
        {wybor === "kontrola" && <Navigate to="/kontrolaPojazdow" />}
      </div>
    </div>
  );
}
