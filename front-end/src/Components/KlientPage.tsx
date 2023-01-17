import { Logout } from "./Logout";
import "./Css/klientPage.css"

export function KlientPage () {
  return(
    <div>
      <div className="klientPage">
        <Logout />
        <h1>Witamy w naszej apliakacji!</h1>
        
      </div>
    </div>
  );
}
