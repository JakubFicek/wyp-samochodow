import { API } from "../api/api";
import useSWR from "swr";
import { Button } from "@mantine/core";

export function ZwrocSamochodP ({id}: ParametrySamochod) {
  const {data, error} = useSWR(`http://localhost:5000/samochod/jeden/${id}`, API.zwrocSamochod);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  const handleOddanie = async (id: number) => {
    await API.zwrotDoPrzegladu(id);
  }

  return (
    <div>
    <p>
      {`Marka Samochodu: ${data.marka}, Model: ${data.model}, Stan: ${data.stan_pojazdu}`}
      {data.stan_pojazdu === "Dostepny" && <Button onClick={() => handleOddanie(Number(data.id))} radius="md" color="grape">Oddanie</Button>}
    </p>
    </div>
  );
} 

export interface ParametrySamochod {
    id: number;
}