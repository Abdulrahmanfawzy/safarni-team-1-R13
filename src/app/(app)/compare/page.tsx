import SearchBar from "@/components/shared/SearchBar"
import SelectedItems from "./_components/SelectedItems"
import ComparisonGrid from "./_components/ComparisonGrid"

interface IProps {



}

const ComparePage = ({ }: IProps) => {
    return (
        <main className="w-full py-3 sm:py-5">
            <SearchBar pathname="" />
            <div className="mt-4 sm:mt-6">
                <SelectedItems />
            </div>
            <div className="mt-6 sm:mt-8">
                <ComparisonGrid />
            </div>
            
        </main>
    )
}

export default ComparePage