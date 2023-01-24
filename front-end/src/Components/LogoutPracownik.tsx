import { Button } from "@mantine/core";
import { useState } from "react";
import { Navigate } from "react-router";
import { API } from "../api/api";
import "./Css/logout.css"

export function LogoutPracownik () {
    const [logOut, setLogOut] = useState(false);

    const handleLogout = () => {
        return API.logoutPracownik(setLogOut);
    }

    return(
        <div className="logout">
            <Button onClick={handleLogout} color="green" radius="xs">Logout</Button>
            {logOut && <Navigate to="/" />}
        </div>
    );
}