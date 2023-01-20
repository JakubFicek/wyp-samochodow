import { Logout } from "./Logout";
import "./Css/klientPage.css"
import { Fasada } from "./Fasada";

export function KlientPage () {
  return(
    <div>
      <div className="klientPage">
        <Logout />
        <h1>Witamy w naszej apliakacji!</h1>
        <Fasada />
      </div>
    </div>
  );
}
