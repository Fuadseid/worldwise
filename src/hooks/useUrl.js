import { useSearchParams } from "react-router-dom";

export function useUrl() {
  const [serchParam] = useSearchParams();
  const lat = serchParam.get("lat");
  const lng = serchParam.get("lng");
  console.log(lat,lng)
  return { lat, lng };
}
