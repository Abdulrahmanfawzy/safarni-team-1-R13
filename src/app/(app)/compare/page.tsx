import SearchBar from "@/components/shared/SearchBar"
import SelectedItems from "./_components/SelectedItems"
import ComparisonGrid from "./_components/ComparisonGrid"

interface IProps {



}

const ComparePage = ({ }: IProps) => {
    return (
        <main className="app-container mt-3">
            <SearchBar pathname="" />
            <SelectedItems />

            
        </main>
    )
}

export default ComparePage