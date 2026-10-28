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
            <TabsList className="relative inline-flex h-auto w-full items-start justify-start gap-6 rounded-none bg-transparent p-0 max-lg:!h-auto max-lg:grid max-lg:grid-cols-3 max-lg:items-end max-lg:justify-between max-lg:gap-0
             
            after:absolute after:bottom-0 after:left-0 after:h-[0.5px] after:w-full  after:bg-gray-200 after:content-['']">
                <TabsTrigger value="About" className="max-lg:relative max-lg:h-auto max-lg:justify-center max-lg:px-2 max-lg:py-2 max-lg:text-xs max-lg:after:absolute max-lg:after:inset-x-0 max-lg:after:bottom-0 max-lg:after:z-10 max-lg:after:h-0.5 max-lg:after:bg-primary max-lg:after:content-[''] max-lg:after:opacity-0 max-lg:data-active:after:opacity-100">
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100 max-lg:after:hidden" >
                        About
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Gallery" className="max-lg:relative max-lg:h-auto max-lg:justify-center max-lg:px-2 max-lg:py-2 max-lg:text-xs max-lg:after:absolute max-lg:after:inset-x-0 max-lg:after:bottom-0 max-lg:after:z-10 max-lg:after:h-0.5 max-lg:after:bg-primary max-lg:after:content-[''] max-lg:after:opacity-0 max-lg:data-active:after:opacity-100">
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100 max-lg:after:hidden">
                        Gallery
                    </span>
                </TabsTrigger>
                <TabsTrigger value="Review" className="max-lg:relative max-lg:h-auto max-lg:justify-center max-lg:px-2 max-lg:py-2 max-lg:text-xs max-lg:after:absolute max-lg:after:inset-x-0 max-lg:after:bottom-0 max-lg:after:z-10 max-lg:after:h-0.5 max-lg:after:bg-primary max-lg:after:content-[''] max-lg:after:opacity-0 max-lg:data-active:after:opacity-100">
                    <span className="relative inline-flex pb-2 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary after:z-10 after:content-[''] after:opacity-0 group-data-active:after:opacity-100 max-lg:after:hidden">
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