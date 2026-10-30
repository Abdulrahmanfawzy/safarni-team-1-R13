import RoomDetailsPage from "../../_components/RoomDetailsPage";
import { getRoomDetailsMetadata } from "../../metadata";

interface IProps {
  params: Promise<{
    hotelId: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: IProps) {
  const { slug } = await params;
  return getRoomDetailsMetadata(slug);
}

export default async function Page({ params }: IProps) {
  const { hotelId, slug } = await params;
  return <RoomDetailsPage hotelId={hotelId} roomSlug={slug} />;
}
