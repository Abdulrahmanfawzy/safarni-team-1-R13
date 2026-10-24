import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomAbout from "./RoomAbout"
import RoomGallery from "./RoomGallery"
import RoomReview from "./RoomReview"

interface IProps {

  onAddReview: () => void;

}

const RoomDetailsTabs = ({onAddReview }: IProps) => {
    return (
        <Tabs defaultValue="About" className="w-full ">
            <TabsList className="relative inline-flex h-auto w-full items-start justify-start gap-6 rounded-none bg-transparent p-0 
             
            after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-full  after:bg-gray-200 after:content-['']">
                <TabsTrigger value="About" >
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100" >
                        About
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Gallery">
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100">
                        Gallery
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Review">
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100">
                        Review
                    </span>
                </TabsTrigger>

            </TabsList>
            <TabsContent value="About">
                <RoomAbout />
            </TabsContent>
            <TabsContent value="Gallery">
                <RoomGallery />
            </TabsContent>
            <TabsContent value="Review">
                <RoomReview onAddReview={onAddReview} />
            </TabsContent>
        </Tabs>

    )
}

export default RoomDetailsTabs