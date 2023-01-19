import { Alert, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { API } from "../api/api";

export function DodajSamochod () {
  const [marka, setMarka] = useState("");
  const [markaError, setMarkaError] = useState(false);

  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState(false);
  
  const [przebieg, setPrzebieg] = useState("");
  const [przebiegError, setPrzebiegError] = useState(false);

  const [miejsca, setMiejsca] = useState("");
  const [miejscaError, setMiejscaError] = useState(false);

  const [cena, setCena] = useState("");
  const [cenaError, setCenaError] = useState(false);

  const [rok, setRok] = useState("");
  const [rokError, setRokError] = useState(false);

  const [dodanieStatus, setDodanieStatus] = useState("");
  const [dodanieErrorValue, setDodanieErrorValue] = useState("");

  const handleSignin = async () => {
    if(!marka) setMarkaError(true);
    else setMarkaError(false);

    if(!model) setModelError(true);
    else setModelError(false);

    if(!przebieg) setPrzebiegError(true);
    else setPrzebiegError(false);

    if(!miejsca) setMiejscaError(true);
    else setMiejscaError(false);

    if(!cena) setCenaError(true);
    else setCenaError(false);

    if(!rok) setRokError(true);
    else setRokError(false);
    
    if(marka && rok && miejsca && model && cena && przebieg) {
      await API.nowySamochod({ samochod: {
            marka,
            model,
            przebieg: Number(przebieg),
            il_miejsc: Number(miejsca),
            cena_za_dzien: Number(cena),
            rok_produkcji: Number(rok),
            stan_pojazdu: "Dostepny",
            ksiazka_serwisowa: "Nowy",
            czy_sprawdzony: true,
            zajete_terminy: []
          }, 
            setDodanieErrorValue, setDodanieStatus
          });
          setDodanieErrorValue(""); setDodanieStatus("");
          setMarka(""); setModel(""); setPrzebieg(""); setCena("");
          setMiejsca(""); setRok(""); 
          }
      }

    return(
    <div className="containerRegister">
    <div className="signin">
     <TextInput
   placeholder="Model"
   label="Model"
   radius="xs"
   required
   value={model}
   onChange={(e) => setModel(e.target.value)}
   error={modelError && "wprowadz model"}
     />
     <TextInput
   placeholder="Marka"
   label="Marka"
   radius="xs"
   required
   value={marka}
   onChange={(e) => setMarka(e.target.value)}
   error={markaError && "wprowadz marke"}
     /><TextInput
   placeholder="Ilosc miejsc"
   label="Ilosc miejsc"
   radius="xs"
   required
   value={miejsca}
   onChange={(e) => setMiejsca(e.target.value)}
   error={miejscaError && "wprowadz ilosc miejsc"}
     />
     <TextInput
   placeholder="Przebieg"
   label="Przebieg"
   radius="xs"
   required
   value={przebieg}
   onChange={(e) => setPrzebieg(e.target.value)}
   error={przebiegError && "wprowadz przebieg"}
     />
     <TextInput
   placeholder="Cena"
   label="Cena"
   radius="xs"
   required
   value={cena}
   onChange={(e) => setCena(e.target.value)}
   error={cenaError && "wprowadz cene"}
     />
     <TextInput
   placeholder="Rok Produkcji"
   label="Rok Produkcji"
   radius="xs"
   required
   value={rok}
   onChange={(e) => setRok(e.target.value)}
   error={rokError && "wprowadz rok"}
     />
     {dodanieStatus === "error" && <Alert radius="xs" title="Error!" color="red">
       {dodanieErrorValue}
     </Alert>}
     <Button onClick={handleSignin} color="green" radius="xs"> Dodaj </Button>
 </div>
 </div>
    );
}


export interface SamochodDto {
    marka: string;
    model: string;
    rok_produkcji: number;
    przebieg: number;
    cena_za_dzien: number;
    il_miejsc: number;
    stan_pojazdu: string;
    ksiazka_serwisowa: string;
    czy_sprawdzony: boolean;
    zajete_terminy: Date[][]; //[["2022-08-08T10:00:00Z","2022-08-10T12:00:00Z"]] dodawanie daty
  }