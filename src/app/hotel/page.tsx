import { BackButton } from "@/components/shared/BackButton"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface IProps {



}

const HotelPage=({}:IProps)=> {
  return (
    <section className="container mt-20">
        <div className="flex items-center justify-center gap-1">
           <BackButton hrefName="/" />
           <Input placeholder="Search" startIcon={<Search />} /> 
        </div>
    </section>
  )
}

export default HotelPage