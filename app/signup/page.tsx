'use client';;
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';

export default function SignUp() {
  const icon = require('../../public/Images/marker.png');
  const leafletIcon = new L.DivIcon({
   className:' bg-red-500 rounded-full h-[20px] w-[20px]',
    iconSize:[30,30]
  });
  const position:LatLngExpression = [10.3157, 123.8854];
  return (
    <div className=" pt-32">
    
       <MapContainer center={position} zoom={13} className=' z-20'>
      
      
    <TileLayer
    className=' w-full'
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[10.3157, 123.8854]} icon={leafletIcon}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer></div>
  )
}
