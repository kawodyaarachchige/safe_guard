import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";
import { Map, Navigation2 } from "lucide-react";



const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 6.9271,
  lng: 79.8612
};

const SafeRouteMap: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [directions, setDirections] = useState<any>(null);

  const handleFindRoute = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startPoint || !endPoint) {
      alert("Please enter both start and destination points.");
      return;
    }

    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: startPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirections(results);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Map className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold text-black-800">Safe Route Planner</h2>
        </div>

        <form onSubmit={handleFindRoute} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Point</label>
            <input
                type="text"
                value={startPoint}
                onChange={(e) => setStartPoint(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter starting location"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
                type="text"
                value={endPoint}
                onChange={(e) => setEndPoint(e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                placeholder="Enter destination"
            />
          </div>

          <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
          >
            <Navigation2 className="h-5 w-5" />
            <span>Find Safe Route</span>
          </button>
        </form>

        <div className="mt-6">
          <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={10}
          >
            {directions && <DirectionsRenderer directions={directions} />}
          </GoogleMap>
        </div>
      </div>
  );
};

export default SafeRouteMap;
