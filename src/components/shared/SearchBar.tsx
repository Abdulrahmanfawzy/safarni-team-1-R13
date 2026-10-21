import { Search } from "lucide-react"
import { BackButton } from "./BackButton"
import { Input } from "../ui/input"

interface IProps {
pathname:string;


}

const SearchBar=({pathname}:IProps)=> {
  return (
      <div className="app-container flex items-center justify-center gap-3.5">
           <BackButton hrefName={pathname}/>
           <Input placeholder="Search..." startIcon={<Search />} className='h-15!' /> 
        </div>
  )
}

export default SearchBar