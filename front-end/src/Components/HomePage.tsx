import { Link } from "react-router-dom";
import "./Css/homePage.css"
import { Kontakt } from "./Kontakt";

export function HomePage () {
  return(
    <div>
      <div className="homePage">
        <h1>Witamy na stronie wypozyczalni samochodowej!</h1>
        <h2>Aby moc uzyc naszej aplikacji, musisz sie <Link style={linkStyle} to="/logowanie">zalogowac</Link>.</h2>
        <h3>Jesli nie masz konta, <Link style={linkStyle} to="/rejestracja">zaloz je!</Link></h3>
        <img alt="auto" src={require("../auto.png")} />
      </div>
      <Kontakt />
    </div>
  );
}

const linkStyle = {
    color: 'white'
}