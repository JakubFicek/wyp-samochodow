import { SamochodDto } from "../Components/DodajSamochod";
import { RezerwacjaType } from "../Components/Rezerwacje";
import { NowyPracownikDto } from "../Components/ZarzPracownikami";
import { KlientDto } from "../dto/create-Klient.dto";

export class API{
  public static async logowanieKlienta(user: daneLogowanie, flags: setFlags) {
    await fetch('http://localhost:5000/weryfikacja/login', {
            method: 'POST',
            credentials: 'include',
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
          credentials: 'include',
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

    public static logout = async (setLogOut: React.Dispatch<React.SetStateAction<boolean>>) => {
      await fetch('http://localhost:5000/weryfikacja/log-out', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then((response) => {
        if (response.ok) {
          setLogOut(true);
          return response.json();
        }
        return response.json();
     })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    }

    public static zwrocSamochody = (url: RequestInfo | URL) => fetch(url).then(r => r.json());
    public static zwrocPracownika = (url: RequestInfo | URL) => fetch(url).then(r => r.json());
    public static zwrocPracownikow = (url: RequestInfo | URL) => fetch(url).then(r => r.json());

    public static deletePracownik = async (id: number) => {
      await fetch(`http://localhost:5000/pracownik/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json()
       ).catch((err) => {
        console.log(err.message);
       })
    }

    public static nowyPracownik = async ({pracownik, setDodanieErrorValue, setDodanieStatus }: nowyPracownikParam) => {
      await fetch('http://localhost:5000/pracownik/create', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify(pracownik),
        }).then((response) => {
          if (response.ok) {
             setDodanieStatus("dodany");
            return response.json();
          }
          setDodanieStatus("error");
          return response.json();
       })
       .then((data) => {
          setDodanieErrorValue(data.message);
        })
        .catch((err) => {
          console.log(err.message)
        });
    } 

    public static nowySamochod = async ({samochod, setDodanieErrorValue, setDodanieStatus }: nowySamochodParam) => {
      await fetch('http://localhost:5000/samochod', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(samochod),
      }).then((response) => {
        if (response.ok) {
           setDodanieStatus("dodany");
          return response.json();
        }
        setDodanieStatus("error");
        return response.json();
     })
     .then((data) => {
        setDodanieErrorValue(data.message);
      })
      .catch((err) => {
        console.log(err.message)
      });
    }
  
    public static deleteSamochod = async (id: number) => {
      await fetch(`http://localhost:5000/samochod/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json()
      ).catch((err) => {
        console.log(err.message);
      })
    }

    public static nowyRaport = async () => {
      await fetch('http://localhost:5000/raport/create', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json();
       })
       .then((data) => {
        })
        .catch((err) => {
          console.log(err.message)
        });
    }
    
    public static zwrocRaporty = (url: RequestInfo | URL) => fetch(url).then(r => r.json());
    public static zwrocRezerwacje = (url: RequestInfo | URL) => fetch(url).then(r => r.json());
    public static zwrocSamochod = (url: RequestInfo | URL) => fetch(url).then(r => r.json());

    public static deleteRezerwacja = async (id: number) => {
      await fetch(`http://localhost:5000/rezerwacja/${id}`, {
        method: 'DELETE',
      }).then((response) => response.json()
      ).catch((err) => {
        console.log(err.message);
      })
    }

    public static nowaRezerwacja = async ({rezerwacja, setDodanieErrorValue, setDodanieStatus }: nowaRezerwacjaParam) => {
      await fetch('http://localhost:5000/samochod', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(rezerwacja),
      }).then((response) => {
        if (response.ok) {
           setDodanieStatus("dodany");
          return response.json();
        }
        setDodanieStatus("error");
        return response.json();
     })
     .then((data) => {
        setDodanieErrorValue(data.message);
      })
      .catch((err) => {
        console.log(err.message)
      });
    }

    public static zwrocDostepneSamochody = async (url: RequestInfo | URL, data1: Date, data2: Date ) => {
      return await fetch(url, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            data_wypozyczenia: data1,
            data_zwrotu: data2
            })
        }).then((response) => response.json())
    }

    public static platnosc = async (platnosc: PlatnoscDto) => {
      await fetch('http://localhost:5000/platnosc/zaliczka', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(platnosc),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json();
     })
     .then((data) => {
      })
      .catch((err) => {
        console.log(err.message)
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

export interface nowyPracownikParam {
  pracownik: NowyPracownikDto;
  setDodanieErrorValue: React.Dispatch<React.SetStateAction<string>>;
  setDodanieStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface nowySamochodParam {
  samochod: SamochodDto;
  setDodanieErrorValue: React.Dispatch<React.SetStateAction<string>>;
  setDodanieStatus: React.Dispatch<React.SetStateAction<string>>;
}

export interface RezerwacjaDto {
  id_samochodu: number;
  data_wypozyczenia: Date | null;
  data_zwrotu: Date | null;
}

export interface PlatnoscDto {
  kod_blik: number;
}

export interface nowaRezerwacjaParam {
  rezerwacja: RezerwacjaDto;
  setDodanieErrorValue: React.Dispatch<React.SetStateAction<string>>;
  setDodanieStatus: React.Dispatch<React.SetStateAction<string>>;
}