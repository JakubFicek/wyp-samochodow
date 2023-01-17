import useSWR from 'swr'
import { API } from '../api/api';
import { Auto } from './Types/auto';

export function ZarzSamochodami () {
  const {data, error} = useSWR("http://localhost:5000/samochod", API.zwrocSamochody);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return(
  <div>
    <ul className="list">
      {data.map((auto: Auto) => 
        <li key={auto.id}>
            <h5>{auto.marka}:{auto.model}:{auto.rok_produkcji}</h5>
        </li>)}
    </ul>
    </div>);
}