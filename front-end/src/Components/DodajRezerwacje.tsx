import { Alert, Button, TextInput } from "@mantine/core";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import { useState } from "react";
import { API } from "../api/api";
import { Auto } from "./Types/auto";
import "./Css/klientPage.css";
import 'dayjs/locale/pl';

export function DodajRezerwacje () {
    const [value, setValue] = useState<DateRangePickerValue>([
        new Date(2023, 1, 1, 16),
        new Date(2023, 1, 5, 16),
      ]);
      
    const [idSam, setIdSam] = useState("");
    const [idSamError, setIdSamError] = useState(false);

    const [kodBlik, setKodBlik] = useState("");
    const [kodBlikError, setKodBlikError] = useState(false);
  
    const [dodanieStatus, setDodanieStatus] = useState("");
    const [dodanieErrorValue, setDodanieErrorValue] = useState("");
    
    const [pokaz, setPokaz] = useState(false);

    const [samochody, setSamochody] = useState<Auto[]>([]);
    const [jesliError, setJesliError] = useState(false);

      const handleSignin = async () => {
          if(!kodBlik) setKodBlikError(true);
          else setKodBlikError(false);
      
          if(!idSam) setIdSamError(true);
          else setIdSamError(false);
        
          if(kodBlik && idSam) {
            await API.platnosc({
                kod_blik: Number(kodBlik)
            });
            await API.nowaRezerwacja({ rezerwacja: {
                id_samochodu: Number(idSam),
                data_wypozyczenia: value[0],
                data_zwrotu: value[1],
            }, 
              setDodanieErrorValue, setDodanieStatus
            });
            setDodanieErrorValue(""); setDodanieStatus("");
            setIdSam(''); setKodBlik("");
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
       <p> Zaliczka to 50zl </p>
       <TextInput
     placeholder="Podaj KOD DO PLATNOSCI ZALICZKI"
     label="kod BLIK"
     radius="xs"
     required
     value={kodBlik}
     onChange={(e) => setKodBlik(e.target.value)}
     error={kodBlikError && "wprowadz kod BLIK"}
       />
       {dodanieStatus === "error" && <Alert radius="xs" title="Error!" color="red">
         {dodanieErrorValue}
       </Alert>}
       <Button onClick={handleSignin} color="green" radius="xs"> Dodaj </Button>
   </div>
   </div>
  );
}
