import { Alert, Button, Select, SelectItem, TextInput } from "@mantine/core";
import { useState } from "react";
import { API, Klient } from "../api/api";
import "./Css/klientPage.css";
import 'dayjs/locale/pl';

export function DodajWypozRez () {
    const [idKlienta, setIdKlienta] = useState<string | null>(null);
    const [idKlientaError, setIdKlientaError] = useState(false);

    const [idRez, setIdRez] = useState("");
    const [idRezError, setIdRezError] = useState(false);

    const [klienci, setKlienci] = useState<Klient[]>([]);

    const [dodanieStatus, setDodanieStatus] = useState("");
    const [dodanieErrorValue, setDodanieErrorValue] = useState("");
    
    const [pokazK, setPokazK] = useState(false);

    const [select, setSelect] = useState<SelectItem[]>([
      { value: '0', label: 'Nikt' },
    ]);

    const selectTab: SelectItem[] = [];

      const handleSignin = async () => {
          setDodanieErrorValue("");
          if(!idRez) setIdKlientaError(true);
          else setIdKlientaError(false);

          if(!idKlienta) setIdRezError(true);
          else setIdRezError(false);
        
          if(idKlienta) {
            await API.wypoZRez({ wypo: {
                id_klienta: Number(idKlienta),
                id_rezerwacji: Number(idRez),
            }, 
              setDodanieErrorValue, setDodanieStatus
            });
            setDodanieStatus("");
            setIdKlienta(null); setIdRez("")
            }
        }
        
    const handleKlienci = async () => {
        
        const data = await API.zwrocKlientow("http://localhost:5000/klient");
        if(!data) {return; } else{
          setKlienci(data);
        } 

        await data.map((klient: Klient)=> selectTab.push({ value: String(klient.id), label: klient.imie + " " + klient.nazwisko}))
        console.log(selectTab);
        setSelect([...selectTab]);
        setPokazK(true);
      }

        
      return(
      <div className="containerRegister">
      <div className="signin">
        <Button onClick={handleKlienci} color="green" radius="xs"> Wczytaj klientow </Button>
       { pokazK && <Select
      label="Klient"
      placeholder="Wybierz klienta"
      value={idKlienta} 
      onChange={setIdKlienta}
      data={select}
      creatable
      getCreateLabel={(query) => `+ Create ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        setSelect((current) => [...current, item]);
        return item;
      }}
    />}
    <TextInput
     placeholder="ID rezerwacji"
     label="ID rezerwacji"
     radius="xs"
     required
     value={idRez}
     onChange={(e) => setIdRez(e.target.value)}
     error={idRezError && "wprowadz ID"}
       />
       {dodanieStatus === "error" && <Alert radius="xs" title="Error!" color="red">
         {dodanieErrorValue}
       </Alert>}
       <Button onClick={handleSignin} color="green" radius="xs"> Dodaj </Button>
   </div>
   </div>
  );
}
