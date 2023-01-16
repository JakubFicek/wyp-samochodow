import { Alert, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api/api";
import "./Css/logowanie.css"

export function Rejestrowanie() {
    const [newEmail, setNewEmail] = useState("");
    const [newEmailError, setNewEmailError] = useState(false);

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState(false);

    const [nazwisko, setNazwisko] = useState("");
    const [nazwiskoError, setNazwiskoError] = useState(false);

    const [pesel, setPesel] = useState("");
    const [peselError, setPeselError] = useState(false);

    const [jestPrawko, setJestPrawko] = useState("");
    const [jestPrawkoError, setJestPrawkoError] = useState(false);

    const [wiek, setWiek] = useState("");
    const [wiekError, setWiekError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);

    const [signinStatus, setSigninStatus] = useState("");
    const [signinErrorvalue, setSigninErrorValue] = useState("");

    const handleSignin = async () => {
        if(!newEmail) setNewEmailError(true);
        else setNewEmailError(false);

        if(!name) setNameError(true);
        else setNameError(false);
        
        if(!nazwisko) setNazwiskoError(true);
        else setNazwiskoError(false);

        if(!wiek) setWiekError(true);
        else setWiekError(false);

        if(!pesel) setPeselError(true);
        else setPeselError(false);

        if(!jestPrawko) setJestPrawkoError(true);
        else setJestPrawkoError(false);

        if(!newPassword) setNewPasswordError(true);
        else setNewPasswordError(false);
        
        if(newPassword && name && newEmail) {
            await API.register({ user: {
              email: newEmail, 
              imie: name, 
              nazwisko,
              pesel,
              czy_jest_prawo_jazdy: jestPrawko === "Y",
              wiek: Number(wiek),
              haslo: newPassword}, 
              setSigninErrorValue, setSigninStatus});
            setNewEmail(""); setName(""); setNewPassword("");
            setJestPrawko(""); setPesel(""); setNazwisko(""); setWiek("");
          }
    }
    return(
        <div className="containerRegister">
        <div className="signin">
            <h1>Zaloz konto!</h1>
            <p>Powrot do <Link to="/" style={{color: 'white'}}>strony glownej</Link></p>
       <TextInput
     placeholder="Twoj e-mail"
     label="E-mail"
     radius="xs"
     required
     type="email"
     value={newEmail}
     onChange={(e) => setNewEmail(e.target.value)}
     error={newEmailError && "wprowadz email"}
       />
       <TextInput
     placeholder="Twoje imie"
     label="Imie"
     radius="xs"
     required
     value={name}
     onChange={(e) => setName(e.target.value)}
     error={nameError && "imie nie moze byc puste"}
       />
       <TextInput
     placeholder="Twoje nazwisko"
     label="Nazwisko"
     radius="xs"
     required
     value={nazwisko}
     onChange={(e) => setNazwisko(e.target.value)}
     error={nazwiskoError && "nazwisko nie moze byc puste"}
       />
       <TextInput
     placeholder="Twoje haslo"
     label="Haslo"
     radius="xs"
     type="password"
     required
     value={newPassword}
     onChange={(e) => setNewPassword(e.target.value)}
     error={newPasswordError && "wprowadz haslo"}
       />
       <TextInput
     placeholder="Twoj pesel"
     label="Pesel"
     radius="xs"
     required
     value={pesel}
     onChange={(e) => setPesel(e.target.value)}
     error={peselError && "pesel nie moze byc pusty"}
       />
       <TextInput
     placeholder="Twoj wiek"
     label="Wiek"
     radius="xs"
     required
     value={wiek}
     onChange={(e) => setWiek(e.target.value)}
     error={wiekError && "wiek nie moze byc pusty"}
       />
       <TextInput
     placeholder="Czy masz prawko?"
     label="Masz prawo jazdy (Y/N)"
     radius="xs"
     required
     value={jestPrawko}
     onChange={(e) => setJestPrawko(e.target.value)}
     error={jestPrawkoError && "Napisz odpwiedz na pytanie"}
       />
       {signinStatus === "error" && <Alert radius="xs" title="Error!" color="red">
         {signinErrorvalue}
       </Alert>}
       {signinStatus === "registered" && <p>Teraz mozesz sie <Link style={{color: "white"}} to="/logowanie">zalogowac!</Link></p>}
       <Button onClick={handleSignin} color="green" radius="xs"> Sign-in </Button>
   </div>
   </div>);
}