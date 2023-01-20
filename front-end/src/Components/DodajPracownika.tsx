import { Alert, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { API } from "../api/api";

export function DodajPracownika () {
  const [newEmail, setNewEmail] = useState("");
  const [newEmailError, setNewEmailError] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [nazwisko, setNazwisko] = useState("");
  const [nazwiskoError, setNazwiskoError] = useState(false);

  const [rola, setRola] = useState("");
  const [rolaError, setRolaError] = useState(false);

  const [wynagrodzenie, setWynagrodzenie] = useState("");
  const [wynagrodzenieError, setWynagrodzenieError] = useState(false);

  const [dataZ, setDataZ] = useState("");
  const [dataZError, setDataZError] = useState(false);

  const [idP, setIdP] = useState("");
  const [idPError, setIdPError] = useState(false);

  const [typ_umowy, setTypUmowy] = useState("");
  const [typUmowyError, setTypUmowyError] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);

  const [dodanieStatus, setDodanieStatus] = useState("");
  const [dodanieErrorValue, setDodanieErrorValue] = useState("");

    const handleSignin = async () => {
        if(!newEmail) setNewEmailError(true);
        else setNewEmailError(false);
    
        if(!name) setNameError(true);
        else setNameError(false);
        
        if(!nazwisko) setNazwiskoError(true);
        else setNazwiskoError(false);
    
        if(!idP) setIdPError(true);
        else setIdPError(false);
    
        if(!rola) setRolaError(true);
        else setRolaError(false);
    
        if(!dataZ) setDataZError(true);
        else setDataZError(false);
    
        if(!wynagrodzenie) setWynagrodzenieError(true);
        else setWynagrodzenieError(false);
    
        if(!newPassword) setNewPasswordError(true);
        else setNewPasswordError(false);
    
        if(!typ_umowy) setTypUmowyError(true);
        else setTypUmowyError(false);
      
        if(newPassword && name && newEmail && typ_umowy && rola && dataZ) {
          await API.nowyPracownik({ pracownik: {
            email: newEmail, 
            imie: name, 
            nazwisko,
            rola,
            id: Number(idP),
            haslo: newPassword,
            wynagrodzenie: Number(wynagrodzenie),
            data_zatrudnienia: dataZ,
            typ_umowy,
          }, 
            setDodanieErrorValue, setDodanieStatus
          });
          setDodanieErrorValue(""); setDodanieStatus("");
          setNewEmail(""); setName(""); setNewPassword("");
          setRola(""); setIdP(""); setNazwisko(""); setWynagrodzenie("");
          setTypUmowy(""); setDataZ("");
          }
      }

    return(
    <div className="containerRegister">
    <div className="signin">
     <TextInput
   placeholder="e-mail"
   label="E-mail"
   radius="xs"
   required
   type="email"
   value={newEmail}
   onChange={(e) => setNewEmail(e.target.value)}
   error={newEmailError && "wprowadz email"}
     />
     <TextInput
   placeholder="imie"
   label="Imie"
   radius="xs"
   required
   value={name}
   onChange={(e) => setName(e.target.value)}
   error={nameError && "imie nie moze byc puste"}
     />
     <TextInput
   placeholder="nazwisko"
   label="Nazwisko"
   radius="xs"
   required
   value={nazwisko}
   onChange={(e) => setNazwisko(e.target.value)}
   error={nazwiskoError && "nazwisko nie moze byc puste"}
     />
     <TextInput
   placeholder="haslo"
   label="Haslo"
   radius="xs"
   type="password"
   required
   value={newPassword}
   onChange={(e) => setNewPassword(e.target.value)}
   error={newPasswordError && "wprowadz haslo"}
     />
     <TextInput
   placeholder="wynagrodzenie"
   label="Wynagrodzenie"
   radius="xs"
   required
   value={wynagrodzenie}
   onChange={(e) => setWynagrodzenie(e.target.value)}
   error={wynagrodzenieError && "wynagrodzenie nie moze byc puste"}
     />
     <TextInput
   placeholder="ID Pracownika"
   label="ID, ktore ma miec pracownik"
   radius="xs"
   required
   value={idP}
   onChange={(e) => setIdP(e.target.value)}
   error={idPError && "wiek nie moze byc pusty"}
     />
     <TextInput
   placeholder="Data Zatrudnienia"
   label="Podaj date zatrudnienia"
   radius="xs"
   required
   value={dataZ}
   onChange={(e) => setDataZ(e.target.value)}
   error={dataZError && "podaj date"}
     />
     <TextInput
   placeholder="typ umowy"
   label="Podaj typ umowy"
   radius="xs"
   required
   value={typ_umowy}
   onChange={(e) => setTypUmowy(e.target.value)}
   error={typUmowyError && "podaj typ umowy"}
     />
     <TextInput
   placeholder="Rola"
   label="Podaj role pracownika (Sprzedawca/Serwisant)"
   radius="xs"
   required
   value={rola}
   onChange={(e) => setRola(e.target.value)}
   error={rolaError && "podaj role"}
     />
     {dodanieStatus === "error" && <Alert radius="xs" title="Error!" color="red">
       {dodanieErrorValue}
     </Alert>}
     <Button onClick={handleSignin} color="green" radius="xs"> Dodaj </Button>
 </div>
 </div>
    );
}