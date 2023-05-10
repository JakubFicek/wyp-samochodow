# Wypożyczalnia samochodów

_Stworzyli: Jakub Ficek, Michał Jurzak przedmiot projektowanie oprogramowania._

## Wykorzystane technologie

Node.js, Nest.js, PostgreSQL, pgAdmin, React, Docker, Postman, Typescript.

## Instrukcja

Aby poprawnie uruchomić program, należy mieć zainstalowane środowisko node.js, oraz program Docker na komputerze.

W pierwszej kolejności należy rozpakować folder z projektem. Następnie w folderze backend tego projektu `.\wyp-samochodow\back-end` trzeba zainstalować moduły node.js .
Zrobimy to przez wpisanie w wierszu poleceń w ścieżce docelowej powyższygo folderu komendy
`npm install`.
Po instalacji node modules, uruchamiamy w tej samej ścieżce folderu komendę
`docker-compose up`. To uruchamia obraz Dockera który zawiera informacje o wersji pgAdmina oraz PostgreSQL.
Uruchomienie backendu odbywa się przez komendę w tej samej ścieżce docelowej
`npm run start`.
Następnie aby uruchomić front-end należy wrócić do folderu głównego projektu i przejść do `.\wyp-samochodow\front-end` i należy zainstalować moduły node.js przez `npm install`, a gdy to się skończy uruchomić przez polecenie `npm run start`.
Ostatnim krokiem jest uruchomienie dowolnej przeglądarki z wyłączoną ochroną, jest to konieczne aby wysyłać requesty. Przeglądarkę chrome uruchamia się taką komendą, gdzie typową ścieżką docelową jest `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"` lecz może się to różnić w zależności od instalacji. Używamy komendy w wierszu poleceń (nie w PowerShellu): `"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-features=IsolateOrigins, site-per-proces --user-data-dir="C://ChromeDev"` *Uwaga! Nie należy wchodzić na inne adresy na tej przeglądarce niż localhost:3000*
Aby podejrzeć bazę danych należy uruchomić w dowolnej przeglądarce localhost:8080

## Zarys

Korzystamy w tym programie z technologii aplikacji webowych oraz uproszczeń stosowanych przez nest.js, co uwzględnia nietypową dla klasycznego programowania struktury projektu. Zachęcamy do zapoznania się z oficjalną dokumentacją nest.js poczynając podanych pojęć: https://docs.nestjs.com/.
W zakładce Overview znajdują się takie pojęcia jak Controllers, Providers oraz Modules.

Projekt oparty jest na poniższym diagramie klas: 
![image](https://github.com/JakubFicek/wyp-samochodow/assets/122308445/36cf44be-9c2b-4653-8f3b-6b7cb3d0c2eb)

Główna część projektu znajduje się w folderze `.\back-end\src`.
W naszym przypadku, każda klasa jest podzielona jak powyżej na kilka folderów:

- class.dto.ts,
- class.edit.dto.ts (opcjonalnie),
- class.controller.ts,
- class.entity.ts,
- class.module.ts,
- class.service.ts

**W skrócie**:
W DTO przedstawiamy, jak wygląda obiekt klasy _class_. Drugi plik jest bardzo podobny do pierwszego, różnica jest taka, że jest używany jedynie podczas edytowania danego obiektu klasy. W entity implementujemy klasę _class_ jako tabelę która będzie w bazie danych. Service to większość metod, jakie będziemy wywoływali. Controller to miejsce w którym implementujemy te operacje naszej klasy które wymagają żądań HTTP. Module natomiast to złączenie wszystkiego w całość, zapewnia metadane które pozwalają zorganizować prawidłową strukturę aplikacji.

# Dokumentacja

### Klient

struktura:

- id: number
- imie: string
- nazwisko: string
- haslo: string
- pesel: string
- czy_jest_prawo_jazdy: boolean
- wiek: number
- email: string

metody:

- create(_daneKlienta: KlientDto_)
  >Tworzy instancję klienta

- znajdzPoEmailu(_email: string_)
  >Zwraca klienta po jego emailu

- weryfikacja_danych(_id: number_)
  >Weryfikuje poprawność danych

- historiaKlienta(_id_klienta: number_)
  >Wypisuje historię wypożyczeń klienta

- znajdzPoId(_id: number_)
  >Zwraca klienta po jego numerze id

## Platnosc

struktura:

- id: number
- kwota: number
- id_klienta: number

metody:

- zaplacZaliczke(_klient: Klient, nr_rez: number_)
  >Zwraca true dla "zapłaconej" rezerwacji. Każda zaliczka to 50 złotych, kwota jest dodawana do bazy razem z id klienta.

## Pracownicy

struktura:

- id: number
- imie: string
- nazwisko: string
- email: string
- haslo: string
- typ_umowy: string
- data_zatrudnienia: string
- wynagrodzenie: number
- rola: string

metody:

- zwrocSprzedawcow()
- zwrocSerwisantow()
- dodaj_pracownika(_daneNowegoPracownika: NowyPracownikDto_)
  >Wykorzystywana wyłącznie przez Administratora. Dodaje nowego pracownika do bazy danych. Szyfruje hasło.
- edytujPracownika(_id: number, noweDane: EdytujPracownika_)
  >Wykorzystywana wyłącznie przez Administratora
- usunPracownika(_id: number_)
  >Wykorzystywana wyłącznie przez Administratora
- znajdzPoEmailu(_email: string_)
- ZnajdzPoId(_id: number_)
  >Zwraca Pracownika o danym id.

**Poniżej znajdują się klasy pochodne klasy Pracownik i posiadają wszystkie powyższe atrybuty**

### Administrator

Administrator może występować maksymalnie jeden.
Dodatkowa struktura:

- klucz_weryfikacyjny: string

### Sprzedawca

Dodatkowa struktura:

- stan: string

### Serwisant

Serwisant na obecną chwilę nie posiada dodatkowej struktury ani metod.

## Raport

Struktura:

- id: number;
- il_wypozyczen: number
- kto_sporzadzil: number
- wszystkie_wypozyczenia: string
- wszystkie_rezerwacje: string
- data_stworzenia: Date
- przychod: number

metody:

- stworzRaport(kto: Pracownik)
  >Jako argument przyjmuje pracownika który stworzył raport i obejmuje jego id w raporcie.
- wypiszOstatniRaport()
  >Zwraca ostatni utworzony raport.
- wypiszRaporty()
  >Zwraca wszystkie raporty.

## Rezerwacja

Struktura:

- nr_rez?: number
- id_samochodu: number
- data_wypozyczenia: Date
- data_zwrotu: Date
- id_klienta?: number

Metody:

- stworzRezerwacje(_rezerwacja: RezerwacjaDto, user: Klient_)
  >Tylko zalogowany Klient może korzystać. Tworzy rejestrację na podstawie wysłanych informacji w postaci interfejsu RezerwacjaDto.
- usunRezerwacje(_nr_rez: number_)
  >Tylko zalogowany Klient może korzystać.
- znajdzRezerwacje(_nr_rez: number_)
  >Wyszukuje daną rezerwację.
- wypiszRezerwacje(_user: Klient_)
  >Tylko zalogowany Klient może korzystać. Wykorzystuje id zalogowanego klienta do wyszukania i wypisania jego wszystkich rezerwacji.

## Samochod

Struktura:

- marka: string;
- model: string;
- rok_produkcji: number;
- przebieg: number;
- cena_za_dzien: number;
- il_miejsc: number;
- stan_pojazdu: string;
- ksiazka_serwisowa: string;
- czy_sprawdzony: boolean;
- zajete_terminy: Date[][];
  _Zajęte terminy są w postaci tablicy, gdzie poszczególne elementy to dwuelementowe tablice, gdzie pod [0] indeksem jest data wypożyczenia, a pod [1] indeksem data zwrotu._

Metody:

- wypiszSamochody()
- wypiszDostepneSamochody()
- wypiszDostepneSamochodyWTerminie(_daty: daty_)
  >Powyższe metody należy lepiej wyjaśnić. Pierwsza, wypisuje wszystkie samochody. Druga, te które są dostępne do użytku, ale także te obecnie zajmowane. Trzecia zwraca samochody wolne w podanym terminie.
- dodajSamochod(_samochod: SamochodDto_)
  >Wykorzystywana wyłącznie przez Administratora, dodaje samochód do bazy danych.
- usun_samochod(_id: number_)
  >Wykorzystywana wyłącznie przez Administratora, usuwa samochód z bazy danych.
- zwrocStan(_id: number_)
  >Zwraca stan samochodu. Dostępne są stany:
  >'Dostepny', 'Do naprawy', 'Do przegladu'.
- zwrotDoPrzegladu(_id: number_)
  >Metoda wymagająca implementacji dalszej
- zmienStan(_id: number, samochod: edytujSamochodDto_)
  >Metoda zmieniająca dowolne parametry samochodu.
- serwis(_id: number_)
  >Wyłącznie wykorzystywana przez Serwisanta. funkcja zwracająca stan samochodu na 'Dostepny', po tym jak był 'Do naprawy'.
- edytujKsiazkeSerwisowa(_id: number, nowyWpis: wpis_)
  >Wyłącznie wykorzystywana przez Serwisanta. Metoda edytująca książkę serwisową.

## Typy

To folder zawierający wszelakie interfejsy dzięki którym możemy pobierać dane poprzez wysyłanie ich w controllerach przez dekorator @Body.

- Email
  - email: string
- RequestKlient (dziedziczy po Request)
  - klient: Klient
- RequestPracownik (dziedziczy po Request)
  - user: Pracownik
- RequestWithUser (dziedziczy po Request)
  - user: Klient
- TokenPayload
  - klientId: number
- TokenPayloadPracownik
  - pracownikId: number
- wpis
  - wpis: string
- daty
  - data_wypozyczenia: Date
  - data_zwrotu: Date
- id
  - id_klienta: number

## Weryfikacja

Weryfikacja nie była na naszym diagramie uwzględniana ponieważ od razu planowaliśmy implemenctację zabezpieczeń w sposób niejawny dzięki implementacjom użytego przez nas frameworka nest.js. Aplikacja internetowa oferuje również odmienne do standardowych rozwiązań, takich jak zaprzyjaźnianie, przez używanie strażników które pozwalają sprawdzać role danej zalogowanej osoby. Poniżej jest uogólniona struktura naszych zabezpieczeń:

### Register

Struktura:

- imie: string
- nazwisko: string
- haslo: string
- pesel: string
- czy_jest_prawo_jazdy: boolean
- wiek: number
- email: string

### Login

Struktura:

- email: string
- password: string
  >_Ważna uwaga! Klient oraz rejestracja posiada hasło, a login password. Niestety implementacja frameworka nest.js nie pozwalała na użycie dowolnej nazwy w tym zakresie._

#### Metody:

- register(_daneZakladaniaKonta: RegisterDto_)
  >Metoda rejestrująca konto klienta w bazie danych.
- potwierdzKlienta(_email: string, hashedPass: string_)
  >Metoda pozwalająca zweryfikować podczas logowania email i hasło klienta.
- potwierdzPracownika(_email: string, hashedPass: string_)
  >Metoda pozwalająca zweryfikować podczas logowania email i hasło pracownika.
- zweryfikujHaslo(_plainTextPassword: string, hashedPassword: string_)
  >Pośrednia metoda która jest używana do odszyfrowywania zahaszowanych haseł.

## Wypozyczenie

Struktura:

- nr_wyp: number
- id_samochodu: number
- data_wypozyczenia: Date
- data_zwrotu: Date
- id_klienta?: number
- cena_wypozyczenia?: number

Metody:

- znajdzWypozyczenie(_nr_wyp: number_)
  >Metoda znajdująca wypożyczenie po numerze wypożyczenia
- wypiszWypozyczenia(_user: Klient_)
  >Metoda której używa tylko Klient. Wypisuje wszystkie wypożyczenia danego klienta.
- stworzWypozyczenie(_wypozyczenie: WypozyczenieDto, user_id: number_)
  >Ta metoda uzupełnia niezbędne atrybuty tej klasy podanymi jako _wypozyczenie_ informacjami, oraz oblicza cenę wypożyczenia.
- usunWypozyczenie(_nr_wyp: number_)
  >W praktyce metoda używana jedynie przez Administratora oraz Sprzedawcę ponieważ wypożyczenie jest spotkaniem face-to-face klienta ze sprzedawcą, przez co w razie pomyłki możliwe jest usunięcie wypożyczenia.
- stworzWypozyczenieZRezerwacji(_nr_rez: number, user_id: number_)
  >Metoda używana jedynie przez Sprzedawcę. Tworzy wypożyczenie na podstawie danego numeru rezerwacji oraz numeru klienta.

## Inne

### App.module.ts

Plik zawierający wszystkie zebrane moduły wszystkich klas.

### Main.ts

Plik który ostatecznie podsumowuje poprzednie strukturalne części projektu tworząc spójną całość.

### .env

Plik zawierający dane potrzebne do połączenia się ze środowiskiem tj. z obrazem Dockera oraz informacje dla ciasteczek.

### docker-compose.yml

Plik zawierający dane nt. środowiska zawartych w nim kontenerów.

### docker.env

Służy do połączenia się automatycznie przez program z bazą danych.
