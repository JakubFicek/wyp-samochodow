import { API } from "../api/api";
import useSWR from "swr";

export function ZwrocSamochod ({id}: ParametrySamochod) {
  const {data, error} = useSWR(`http://localhost:5000/samochod/jeden/${id}`, API.zwrocSamochod);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
    <p>
      {`Marka Samochodu: ${data.marka}, Model: ${data.model} `}
    </p>
    </div>
  );
} 

export interface ParametrySamochod {
    id: number;
}