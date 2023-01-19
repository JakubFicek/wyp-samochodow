import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Css/App.css';
import { HomePage } from './Components/HomePage';
import { Logowanie } from './Components/Logowanie';
import { Rejestrowanie } from './Components/Rejestrowanie';
import { LogowanieP } from './Components/LogowanieP';
import { KlientPage } from './Components/KlientPage';
import { PracownikPage } from './Components/PracownikPage';
import { ZarzPracownikami } from './Components/ZarzPracownikami';
import { ZarzSamochodami } from './Components/ZarzSamochodami';
import { WyswietlanieRaportow } from './Components/WyswietlanieRaportow';
import { TworzenieRaportow } from './Components/TworzenieRaportow';
import { WypozyczeniaPrac } from './Components/WypozyczeniaPrac';
import { KontrolaPojazdow } from './Components/KontrolaPojazdow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="logowanie" element={<Logowanie />} />
        <Route path="rejestracja" element={<Rejestrowanie />} />
        <Route path="pracownik/logowanie" element={<LogowanieP />} />
        <Route path="klient" element={<KlientPage />} />
        <Route path="pracownik" element={<PracownikPage />} />
        <Route path="zarzPrac" element={<ZarzPracownikami />} />
        <Route path="zarzSam" element={<ZarzSamochodami />} />
        <Route path="wyswietlanieRaportow" element={<WyswietlanieRaportow />} />
        <Route path="tworzenieRaportow" element={<TworzenieRaportow />} />
        <Route path="wypozyczeniaPracownika" element={<WypozyczeniaPrac />} />
        <Route path="kontrolaPojazdow" element={<KontrolaPojazdow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
