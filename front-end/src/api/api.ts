import { KlientDto } from "../dto/create-Klient.dto";

export class API{
  public static async logowanieKlienta(user: daneLogowanie, flags: setFlags) {
    await fetch('http://localhost:5000/weryfikacja/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user),
          }).then((response) => {
            if (response.ok) {
              flags.setStatus("logged");
              return response.json();
            }
            flags.setStatus("error");
            return response.json();
         })
          .then((data) => {
            flags.setErrorValue(data.message);
            console.log(data.message)
          })
          .catch((err) => {
            console.log(err.message);
          });
    }

    public static register = async ({user, setSigninErrorValue, setSigninStatus }: registerParams) => {
      await fetch('http://localhost:5000/weryfikacja/register', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(user),
        }).then((response) => {
          if (response.ok) {
             setSigninStatus("registered");
            return response.json();
          }
          setSigninStatus("error");
          return response.json();
       })
       .then((data) => {
          setSigninErrorValue(data.message);
        })
        .catch((err) => {
          console.log(err.message)
        });
  } 
  public static async logowaniePracownika(user: daneLogowanie, flags: setFlags) {
    await fetch('http://localhost:5000/weryfikacja/pracownik/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(user),
          }).then((response) => {
            if (response.ok) {
              flags.setStatus("logged");
              return response.json();
            }
            flags.setStatus("error");
            return response.json();
         })
          .then((data) => {
            flags.setErrorValue(data.message);
            console.log(data.message)
          })
          .catch((err) => {
            console.log(err.message);
          });
    }
}

interface daneLogowanie {
    email: string;
    password: string;
}

interface setFlags {
    setErrorValue: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface registerParams {
  user: KlientDto;
  setSigninErrorValue: React.Dispatch<React.SetStateAction<string>>;
  setSigninStatus: React.Dispatch<React.SetStateAction<string>>;
}