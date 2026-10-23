import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RoomAbout from "./RoomAbout"
import RoomGallery from "./RoomGallery"
import RoomReview from "./RoomReview"

interface IProps {



}

const RoomDetailsTabs = ({ }: IProps) => {
    return (
        <Tabs defaultValue="About" className="w-full ">
            <TabsList className="w-full bg-transparent border-none item-start  ">
                <TabsTrigger value="About">
                    <span className="relative inline-flex pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[''] after:opacity-0 group-data-active:after:opacity-100" >
                        About
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Gallery">
                    <span className="relative inline-flex pb-2 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[''] after:opacity-0 group-data-active:after:opacity-100">
                        Gallery
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Review">
                    <span className="relative inline-flex pb-2 after:absolute after:bottom-0  after:left-0 after:h-0.5 after:w-full after:bg-primary after:content-[''] after:opacity-0 group-data-active:after:opacity-100">
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
                <RoomReview />
            </TabsContent>
        </Tabs>

    )
}

export default RoomDetailsTabs