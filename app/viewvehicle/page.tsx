/* eslint-disable @next/next/no-img-element */
'use client'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LeafletMouseEvent, Marker, } from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker as MapMarker } from 'react-leaflet';

import { useSearchParams } from 'next/navigation';
import useGetVehicleDetails from '../resources/hooks/vehicle/useGetVehicleDetails';
import { configVariable } from '../resources/constant/ConfigVariable';
import { Button, ListItem, Modal } from '../resources/components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DragEndEvent } from 'leaflet';
import { calculateDistance } from '../resources/utils/location.utils';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ViewVehicle() {
    const params = useSearchParams();
    const vehicle_id = params.get('id');
    const {data:vehicle} = useGetVehicleDetails({id:vehicle_id ? vehicle_id:''})
    const [value, onChange] = useState<Value>(new Date());
    const [isDisplayMap,setIsDisplayMap] = useState<boolean>(false);
    const [coordinate,setCoordinate] = useState<LatLngExpression | null>(null);
    const [origin,setOrigin] =useState<LatLngExpression | null>(null);
    const [destination,setDestination] = useState<LatLngExpression | null>(null);
    const [destinationType,setDestinationType] = useState<string>('');
    const [kilometer,setKilometer] = useState<string>('');
    const [totalFee,setTotalFee] = useState<string>('');
    const [isOpen,setIsOpen] = useState<boolean>(false);
    
    const originIcon = new L.DivIcon({
     className:' pin2',
      iconSize:[25,25]
    });
    const destinationIcon = new L.DivIcon({
        className:' pin3',
         iconSize:[25,25]
       });
const [post,setPost] = useState<LatLngExpression>();
 
    const markerRef = useRef<Marker>(null);
    function handleCalculateDistance(lat1:number, lon1:number, lat2:number, lon2:number): void {
        
       
      
        const distance = calculateDistance(lat1,lon1,lat2,lon2);
        if(!vehicle){
            return;
        }
       
        const total = parseFloat(vehicle?.price ) * distance;
        
        setTotalFee(total.toFixed(2).toString())
        setKilometer(distance.toFixed(2).toString());
        
      }



    const displayTotal = useMemo(()=>{
        if(!totalFee){
            return;
        }

        return(
            <ListItem label='Total Fee' value={totalFee}/>
        );
    },[totalFee])

    const displayDistance = useMemo(()=>{
        if(!kilometer){
            return;
        }

        return(
            <ListItem label='Distance' value={kilometer.toString()}/>
        );
    },[kilometer]);
    
    useEffect(() => {
    if (markerRef.current != null) {
      markerRef.current.on('dragend', (event: DragEndEvent) => {
        const positions = event.target.getposLatLng();
        setPost([positions.lat,positions.lng]);
    });
    }
  }, [setPost]);
  
    function handleClickSelectPosition(){
        if(!post){
            return;
        }
        
        switch (destinationType) {
            case 'ORIGIN':
                    setOrigin(post);
                    setIsDisplayMap(false)
                break;
            case 'DESTINATION':
                    setDestination(post);
                    handleCalculateDistance((origin as any)[0] as number, (origin as any)[1], (post as any)[0], (post as any)[1]);
                    setIsDisplayMap(false);
                break;
            default:
                break;
        }
       
    }

    const displayContent = useMemo(()=>{
        if(isDisplayMap){
            if(!coordinate){
                return;
            }
            const newOrigin = origin ? origin : coordinate;
            const newDestination = destination ? destination : coordinate;
            return(
                <div className=" p-20 -z-10">  

                    <MapContainer center={newOrigin} zoom={13} className=' h-1/4' >
                    
                    <TileLayer
                        className=' w-full'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <MapMarker 
                        position={coordinate} 
                        icon={originIcon}  
                        draggable={true}   
                        eventHandlers={{
                            dragend: (event: LeafletMouseEvent) => {
                                const positions = event.target.getLatLng();
                                setOrigin([positions.lat,positions.lng]);

                            },
                          }}
                        >
                            <Popup>
                                <button onClick={handleClickSelectPosition} className=' p-2 bg-red-400'>Select this Location</button>
                            </Popup>
                        </MapMarker>
                        <MapMarker 
                        position={coordinate} 
                        icon={destinationIcon}  
                        draggable={true}   
                        eventHandlers={{
                            dragend: (event: LeafletMouseEvent) => {
                                const positions = event.target.getLatLng();
                               
                                setDestination([positions.lat,positions.lng]);
                                // handleCalculateDistance((origin as any)[0] as number, (origin as any)[1], positions.lat,positions.lng);
                            },
                          }}
                        >
                        </MapMarker>

                       
                    </MapContainer>
                   
                </div>
            );
        }

        
    },[isDisplayMap, coordinate, origin, destination, originIcon, handleClickSelectPosition, destinationIcon]);

    async function getLocation(destinationType:string){
        const option = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude} = position.coords;
            setCoordinate([latitude,longitude]);
            setIsDisplayMap(true);
            setDestinationType(destinationType);
        },
        ()=>{
            console.log("ERROR")
        },
        option
    );
    }


    async function handleBookNow(){
        if(!totalFee){
            return;
        }

        
    }
    return (
        <>
          <Modal isOpen isFullScreen>
                   {displayContent}
            </Modal>  
                <div className=' flex pt-32 justify-center'>
            <div className=' p-8 bg-white w-1/2'>
            <h3 className=' font-bold'>Vehicle Details</h3>
            <div className=' flex'>
                <div className=' flex flex-1'>
                    <img src={(configVariable.BASE_URL as string)+vehicle?.vehicleImage} alt='vehicle image' className=' h-[300px] w-[300px]'/>
                </div>
                <div className=' px-4 flex flex-1 flex-col'>
                    <p className=' font-bold'>{vehicle?.description}</p>
                    <div className=' h-[0.5px] bg-slate-300 my-2'/>
                    <div className=' h-2'/>
                    <ListItem label='Brand' value={vehicle?.brand as string}/>
                    <ListItem label='Year Model' value={vehicle?.model as string} />
                    <ListItem label='Vehicle Type' value={vehicle?.vehicle_type as string}/>
                    <ListItem label='Rent Price' value={vehicle?.price as string}/>
                    <>{displayDistance}</>
                    <>{displayTotal}</>
                </div>
            </div>
                <div className=' flex flex-row'>
                    <div className=' flex flex-1'>
                    <Calendar onChange={onChange}/>
                    </div>
               
                <div className=' flex flex-1 flex-col'>
                    <Button text={'Select Origin'}  onClick={()=>getLocation('ORIGIN')}/>
                    <div className=' h-10'/>
                    <Button text={'Select Destination'} outline onClick={()=>getLocation('DESTINATION')}/>
                    <div className=' h-10'/>
                    <Button text="Book Now" onClick={handleBookNow}/>
                </div>
                </div>
            </div>
        </div>  

            {displayContent}
        </>
     )
}
