import { Alert, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api/api";
import "./Css/logowanie.css"
import { Kontakt } from "./Kontakt";

export function Logowanie() {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const [errorValue, setErrorValue] = useState("");
    const [status, setStatus] = useState("");

    const handleLogin = async () => {
        setStatus("")
        if(!email) setEmailError(true);
        else setEmailError(false);

        if(!password) setPasswordError(true);
        else setPasswordError(false);

        if(password && email) {
            await API.logowanieKlienta({email, password}, {setErrorValue, setStatus});
            setEmail(""); setPassword("");
          }
    }

    return(
    <div className="containerLogowanie">
    <h1>Zaloguj sie!</h1>
    <p>Powrot do <Link to="/" style={{color: 'white'}}>strony glownej</Link></p>
    <div className="login">
        <TextInput
      placeholder="Your e-mail"
      label="E-mail"
      radius="xs"
      value={email}
      type="email"
      required
      onChange={(e) => setEmail(e.target.value)}
      error={emailError && "enter an email"}
        />
        <TextInput
      placeholder="Your password"
      label="Password"
      radius="xs"
      type="password"
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      error={passwordError && "enter a password"}
        />
        {status === "error" && <Alert radius="xs" title="Error!" color="red">
          {errorValue}
        </Alert>}
        <Button onClick={handleLogin} color="green" radius="xs"> Log-in </Button>
    </div>
    </div>);
}