import SearchBar from "@/components/shared/SearchBar"
import SelectedItems from "./_components/SelectedItems"
import ComparisonGrid from "./_components/ComparisonGrid"

interface IProps {



}

const ComparePage = ({ }: IProps) => {
    return (
        <main className="app-container my-3">
            <SearchBar pathname="" />
            <SelectedItems />
             <div className="mt-6">
                <ComparisonGrid />
            </div>
            
        </main>
    )
}

export default ComparePage