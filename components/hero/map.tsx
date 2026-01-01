import { DottedMap } from "../ui/dotted-map"

const markers = [
  // Africa (Key Focus)
  { lat: 9.0192, lng: 38.7525, size: 0.3 }, // Addis Ababa, Ethiopia
  { lat: 6.5244, lng: 3.3792, size: 0.3 }, // Lagos, Nigeria
  { lat: 30.0444, lng: 31.2357, size: 0.3 }, // Cairo, Egypt
  { lat: -1.2921, lng: 36.8219, size: 0.3 }, // Nairobi, Kenya
  { lat: -26.2041, lng: 28.0473, size: 0.3 }, // Johannesburg, South Africa
  { lat: 5.6037, lng: -0.1870, size: 0.3 }, // Accra, Ghana
  { lat: 33.5731, lng: -7.5898, size: 0.3 }, // Casablanca, Morocco
  { lat: -1.9441, lng: 30.0619, size: 0.3 }, // Kigali, Rwanda
  { lat: 14.7167, lng: -17.4677, size: 0.3 }, // Dakar, Senegal
  { lat: -6.7924, lng: 39.2083, size: 0.3 }, // Dar es Salaam, Tanzania
  { lat: 0.3476, lng: 32.5825, size: 0.3 }, // Kampala, Uganda
  { lat: 5.3600, lng: -4.0083, size: 0.3 }, // Abidjan, Ivory Coast
  { lat: 15.5007, lng: 32.5599, size: 0.3 }, // Khartoum, Sudan
  { lat: -15.3875, lng: 28.3228, size: 0.3 }, // Lusaka, Zambia

  // North America
  { lat: 40.7128, lng: -74.006, size: 0.3 }, // New York
  { lat: 34.0522, lng: -118.2437, size: 0.3 }, // Los Angeles
  { lat: 43.6532, lng: -79.3832, size: 0.3 }, // Toronto

  // Europe
  { lat: 51.5074, lng: -0.1278, size: 0.3 }, // London
  { lat: 48.8566, lng: 2.3522, size: 0.3 }, // Paris
  { lat: 52.52, lng: 13.405, size: 0.3 }, // Berlin
  { lat: 55.7558, lng: 37.6176, size: 0.3 }, // Moscow

  // Asia & Middle East
  { lat: 35.6762, lng: 139.6503, size: 0.3 }, // Tokyo
  { lat: 39.9042, lng: 116.4074, size: 0.3 }, // Beijing
  { lat: 28.6139, lng: 77.209, size: 0.3 }, // New Delhi
  { lat: 25.2048, lng: 55.2708, size: 0.3 }, // Dubai
  { lat: 1.3521, lng: 103.8198, size: 0.3 }, // Singapore

  // South America
  { lat: -23.5505, lng: -46.6333, size: 0.3 }, // São Paulo

  // Oceania
  { lat: -33.8688, lng: 151.2093, size: 0.3 }, // Sydney
]

export function MapComponenet() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <DottedMap 
        markers={markers} 
        className="text-foreground/30 opacity-100"
        markerColor="var(--primary)"
        mapSamples={20000}
        dotRadius={0.22}
      />
    </div>
  )
}
