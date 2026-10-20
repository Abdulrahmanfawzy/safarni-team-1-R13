import { BackButton } from "@/components/shared/BackButton"
import SearchBar from "@/components/shared/SearchBar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import SectionHeader from "./_components/SectionHeader"

interface IProps {



}

const HotelPage=({}:IProps)=> {
  return (
    <section className="container mt-3 mx-auto flex flex-col gap-4 ">
      <SearchBar pathname="/" />
      <SectionHeader title='Recommendation' viewAllHref="" />
    </section>
  )
}

export default HotelPage