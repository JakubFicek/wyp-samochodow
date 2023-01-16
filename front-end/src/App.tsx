import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Css/App.css';
import { HomePage } from './Components/HomePage';
import { Logowanie } from './Components/Logowanie';
import { Rejestrowanie } from './Components/Rejestrowanie';
import { LogowanieP } from './Components/LogowanieP';
import { KlientPage } from './Components/KlientPage';
import { PracownikPage } from './Components/PracownikPage';

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
      </Routes>
    </BrowserRouter>
  );
}
/*<Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>*/
export default App;
