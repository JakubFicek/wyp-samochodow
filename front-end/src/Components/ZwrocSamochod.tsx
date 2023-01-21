import useSWR from "swr"
import { API } from "../api/api";
import { SamochodDto } from "./DodajSamochod";

export function ZwrocSamochod ({id}: ParametrySamochod) {
  const {data, error} = useSWR(`http://localhost:5000/samochod/${id}`, API.zwrocSamochod, { refreshInterval: 2000 });

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <p>
      {data.map((sam :SamochodDto) => 
        <p>Marka Samochodu: {sam.marka} ,Model: {sam.model}</p>
        )}
    </p>
  );
} 

export interface ParametrySamochod {
    id: number;
}