/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LeafletMouseEvent, Marker, } from 'leaflet';
import { MapContainer, TileLayer, Marker as MapMarker } from 'react-leaflet';

import { useSearchParams } from 'next/navigation';
import useGetVehicleDetails from '../resources/hooks/vehicle/useGetVehicleDetails';
import { configVariable } from '../resources/constant/ConfigVariable';
import { Button, ListItem, Modal, TextInput } from '../resources/components';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DragEndEvent } from 'leaflet';
import { calculateDistance } from '../resources/utils/location.utils';
import useAlertOption from '../resources/hooks/useAlertOption';
import dayjs from 'dayjs';
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ViewVehicle() {
    const params = useSearchParams();
    const vehicle_id = params.get('id');
    const {alertError,alertWarning,alertSuccess} = useAlertOption();
    const {data:vehicle} = useGetVehicleDetails({id:vehicle_id ? vehicle_id:''})
    const [value, onChange] = useState<Value>(new Date());
    const [isDisplayMap,setIsDisplayMap] = useState<boolean>(false);
    const [coordinate,setCoordinate] = useState<LatLngExpression | null>(null);
    const [origin,setOrigin] =useState<LatLngExpression | null>(null);
    const [destination,setDestination] = useState<LatLngExpression | null>(null);
    const [kilometer,setKilometer] = useState<string>('');
    const [totalFee,setTotalFee] = useState<string>('');
    const [isOpen,setIsOpen] = useState<boolean>(false);
    const [time,setTime] = useState<string>('');
    console.log("VALUE",dayjs(value?.toString()).format('YYYY-MM-DD'))
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
            <ListItem label='Distance' value={kilometer.toString()+' km'}/>
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
         handleCalculateDistance((origin as any)[0] as number, (origin as any)[1], (destination as any)[0], (destination as any)[1]);
         setIsOpen(false);              
    }

    const displayContent = useMemo(()=>{
        if(isDisplayMap){
            if(!coordinate){
                return;
            }
            const newOrigin = origin ? origin : coordinate;
            const newDestination = destination ? destination : coordinate;
            return(
                <div className=" relative">  
                    
                    <div className=' absolute bottom-20 z-50 flex w-full justify-center'>
                      
                        <div className=' w-1/4 mx-10'>
                            <Button text='Confirm your Location' onClick={()=>handleClickSelectPosition()}/>
                        </div>
                        <div className=' w-1/4 mx-10'>
                            <Button text='Back' onClick={()=>setIsOpen(false)} outline/>
                        </div>
                    </div>
                    <h1>Please Choose Your Destination</h1>
                    <MapContainer center={newOrigin} zoom={13} className=' z-0' >
                    
                    <TileLayer
                        className=' w-full'
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                        <MapMarker 
                        position={newOrigin} 
                        icon={originIcon}  
                        draggable={true}   
                        eventHandlers={{
                            dragend: (event: LeafletMouseEvent) => {
                                const positions = event.target.getLatLng();
                                setOrigin([positions.lat,positions.lng]);

                            },
                          }}
                        >
                        </MapMarker>
                        <MapMarker 
                            position={newDestination} 
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

    async function getLocation(){
        const option = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
        navigator.geolocation.getCurrentPosition((position)=>{
            const {latitude,longitude} = position.coords;
            setCoordinate([latitude,longitude]);
            setIsOpen(true)
            setIsDisplayMap(true);
        },
        ()=>{
            console.log("ERROR")
        },
        option
    );
    }


    const displayDestinationIsSet = useMemo(()=>{
        if(!totalFee || !kilometer){
            return;
        }

        return(
            <p className=' text-green-500'>Destination is Set</p>
        )
    },[totalFee,kilometer])

    async function handleBookNow(){
        if(!totalFee){
            
            return;
        }

        if(!value){
            return;
        }

        if(!time){
            
            return;
        }
        
    }
    return (
        <>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} isFullScreen>
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
                    <TextInput type='time' label='Pick up Time'/>
                    <div className=' h-10'/>
                    {displayDestinationIsSet}
                    <Button text={'Select Destination'} outline onClick={()=>getLocation()}/>
                    <div className=' h-10'/>
                    <Button text="Book Now" onClick={handleBookNow}/>
                </div>
                </div>
            </div>
        </div>  
        </>
     )
}
