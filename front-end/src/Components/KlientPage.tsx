import { Logout } from "./Logout";
import "./Css/klientPage.css"
import { Fasada } from "./Fasada";

export function KlientPage () {
  return(
    <div>
      <Logout />
      <div className="klientPage">
        <h1>Witamy w naszej apliakacji!</h1>
        <Fasada />
      </div>
    </div>
  );
}
