import { Button } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { API } from "../api/api";
import { DodajSamochod } from "./DodajSamochod";
import { Auto } from "./Types/auto";

export function ZarzSamochodami() {
  const [isCreationOn, setIsCreationOn] = useState(false);
  const { data, error } = useSWR(
    "http://localhost:5000/samochod",
    API.zwrocSamochody,
    { refreshInterval: 2000 }
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handleDelete = async (id: number) => {
    await API.deleteSamochod(id);
  };

  const handleDodanie = () => {
    setIsCreationOn(true);
  };

  const handleKoniecDodawania = () => {
    setIsCreationOn(false);
  };

  return (
    <div className="listaPracownikow">
      <h1>Strona zarzadzania samochodami</h1>
      <p>
        Powrot do{" "}
        <Link to="/pracownik" style={{ color: "white" }}>
          strony pracowniczej
        </Link>
      </p>
      <Button onClick={handleDodanie} radius="md" color="green">
        Kliknij, aby dodac nowy samochod
      </Button>
      {isCreationOn && <DodajSamochod />}
      <Button onClick={handleKoniecDodawania} radius="md" color="green">
        Kliknij, aby skonczyc
      </Button>
      <h1>Wykaz samochodow</h1>
      <ul className="list">
        {data.map((auto: Auto) => (
          <li key={auto.id}>
            <h4>
              Samochod: {auto.marka} {auto.model}, Rok produkcji:{" "}
              {auto.rok_produkcji}, Cena:{auto.cena_za_dzien}
            </h4>
            <Button
              onClick={() => handleDelete(auto.id)}
              radius="md"
              color="red"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
