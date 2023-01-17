import { Logout } from "./Logout";
import "./Css/klientPage.css"
import { Button } from "@mantine/core";

export function PracownikPage () {
  return(
    <div>
      <div className="klientPage">
        <Logout />
        <h1>Strona pracownicza!</h1>
        <Button onClick={} color="green" radius="xs"> Log-in </Button>
        <Button onClick={} color="green" radius="xs"> Log-in </Button>
        <Button onClick={} color="green" radius="xs"> Log-in </Button>
      </div>
    </div>
  );
}