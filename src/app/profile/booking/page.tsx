



"use client";

import { useState } from "react";
import GoBack from "../../../components/shared/GoBack/page";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import { SiTourbox } from "react-icons/si";
import { RiHotelBedFill } from "react-icons/ri";
import Flight from "../_components/Flight/page";
import Cars from "../_components/cars/page";

import TourandHotelCard from "../../../components/shared/tourcard/page";

const tabs = [
  { id: "flight", label: "Flight", Icon: BiSolidPlaneAlt },
  { id: "cars", label: "Cars", Icon: FaCarSide },
  { id: "tours", label: "Tours", Icon: SiTourbox },
  { id: "hotel", label: "Hotel", Icon: RiHotelBedFill },
] ;



export default function Booking() {
  const [activeTab, setActiveTab] = useState("flight");

  return (
    <main>
      <GoBack />

      <div className="py-6">
        <h1 className="text-center">My Booking</h1>

        <div
      
          className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-7"
        >
          {tabs.map(({ id, label, Icon }) => {
            const isActive = activeTab === id;

            return (
              <button
                key={id}
                type="button"
            
                onClick={() => setActiveTab(id)}
            
                className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 transition ${
                  isActive
                    ? "border-transparent bg-blue-50 text-blue-600"
                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon  />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        <section
          id="booking-panel"
          className="mt-5"
        >
          {activeTab === "flight" ? (
            <Flight />
          ) : (

         activeTab=="cars"  ? <Cars/>
      

         : 

         activeTab=="tours" ? 
         <TourandHotelCard
         showPrice={true}
         image="/pyramids.png"
         imageAlt="Tours"
         category="full Day Tour"
         location="Luxor"
         price={120}
         rating={3.5}
         
  details={
    <>
      From <span className="font-semibold text-blue-600">$150</span> per person
    </>
  }

         />


         :

activeTab == "hotel" ?   
<TourandHotelCard
showPrice={false}
  image="/Hotel.png"
         imageAlt="Tours"
         category="Golden Valley"
         location="New Yourk , USA"
         rating={3.5}
         percentage={"15%off"}



/>



:null         


          )}


        </section>
      </div>
    </main>
  );
}