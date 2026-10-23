import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import RoomAbout from "./RoomAbout"
import RoomGallery from "./RoomGallery"
import RoomReview from "./RoomReview"
interface IProps {



}

const RoomDetailsTabs = ({ }: IProps) => {
    return (
        <Tabs defaultValue="About" className="w-full">
            <TabsList>
                <TabsTrigger value="About">About</TabsTrigger>
                <TabsTrigger value="Gallery">Gallery</TabsTrigger>
                <TabsTrigger value="Review">Review</TabsTrigger>

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