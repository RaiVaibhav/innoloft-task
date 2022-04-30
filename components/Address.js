import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Address = ({ address }) => {
  const lang = address.longitude;
  const lat = address.longitude;
  const mapLocation = `https://www.google.com/maps/search/?api=1&query=${lang},${lat}`;
  return (
    <MapContainer
      center={[lang, lat]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: 500, width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lang, lat]}>
        <Popup>
          <a href={mapLocation} target="_blank" rel="noreferrer">
            Get directions
          </a>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Address;
