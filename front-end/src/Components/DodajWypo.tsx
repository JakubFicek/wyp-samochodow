import { Alert, Button, Select, SelectItem, TextInput } from "@mantine/core";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { useState } from "react";
import { API, Klient } from "../api/api";
import { Auto } from "./Types/auto";
import "./Css/klientPage.css";
import 'dayjs/locale/pl';

export function DodajWypo () {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2023, 1, 1, 16),
        new Date(2023, 1, 5, 16),
      ]);
      
    const [idSam, setIdSam] = useState("");
    const [idSamError, setIdSamError] = useState(false);

    const [idKlienta, setIdKlienta] = useState<string | null>(null);
    const [idKlientaError, setIdKlientaError] = useState(false);

    const [klienci, setKlienci] = useState<Klient[]>([]);

    const [dodanieStatus, setDodanieStatus] = useState("");
    const [dodanieErrorValue, setDodanieErrorValue] = useState("");
    
    const [pokaz, setPokaz] = useState(false);
    const [pokazK, setPokazK] = useState(false);

    const [samochody, setSamochody] = useState<Auto[]>([]);
    const [jesliError, setJesliError] = useState(false);

    const [select, setSelect] = useState<SelectItem[]>([
      { value: '0', label: 'Nikt' },
    ]);

    const selectTab: SelectItem[] = [];

      const handleSignin = async () => {
          if(!idSam) setIdSamError(true);
          else setIdSamError(false);
          
          if(!idKlienta) setIdKlientaError(true);
          else setIdKlientaError(false);
        
          if( idSam && idKlienta) {
            await API.noweWypozyczenie({ wypo: {
                id_samochodu: Number(idSam),
                data_wypozyczenia: value[0],
                data_zwrotu: value[1],
                id_klienta: Number(idKlienta)
            }, 
              setDodanieErrorValue, setDodanieStatus
            });
            setDodanieErrorValue(""); setDodanieStatus("");
            setIdSam('');  setIdKlienta(null);
            }
        }
        
      const handleSamochody = async () => {
        setPokaz(!pokaz); setJesliError(false);
        value[0]?.setHours(16);
        value[1]?.setHours(16);
        const data = await API.zwrocDostepneSamochody("http://localhost:5000/samochod/dostepnewterminie", value[0] , value[1]);
        if(!data) {
        } else setSamochody(data);
          
          if(samochody.length === 0) setJesliError(true);
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
        <DateRangePicker
      label="Wybierz daty!"
      placeholder="wybierz od kiedy do kiedy"
      value={value}
      locale="pl"
      onChange={setValue}
        />
        <Button onClick={handleSamochody} color="green" radius="xs"> Pokaz dostepne samochody </Button>
        <ul className="list">
        {pokaz && samochody.map((auto: Auto) => 
            <li key={auto.id}>
            <h5>ID:{auto.id}, {auto.marka}:{auto.model}:{auto.rok_produkcji} - il miejsc: {auto.il_miejsc}, cena za dzien: {auto.cena_za_dzien} </h5>
            </li>)}
        </ul>
        {jesliError && <p>Nie ma dostepnych samochodow dla tego terminu</p>}
       <TextInput
     placeholder="ID samochodu"
     label="ID samochodu"
     radius="xs"
     required
     value={idSam}
     onChange={(e) => setIdSam(e.target.value)}
     error={idSamError && "wprowadz ID"}
       />
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
       {dodanieStatus === "error" && <Alert radius="xs" title="Error!" color="red">
         {dodanieErrorValue}
       </Alert>}
       <Button onClick={handleSignin} color="green" radius="xs"> Dodaj </Button>
   </div>
   </div>
  );
}
