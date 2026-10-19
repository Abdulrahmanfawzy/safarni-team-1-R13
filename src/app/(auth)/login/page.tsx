import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface IProps {



}

const loginPage=({}:IProps)=> {
  return (
     <div className="flex gap-3">
      <Button variant="primary">
        Save Changes
      </Button>

      <Button variant="outline">
        Cancel
      </Button>

      <Button variant="primary">
        <Plus />
        Add Product
      </Button>

      <Button variant="primary" loading>
        Saving...
      </Button>
    </div>
  )
}

export default loginPage