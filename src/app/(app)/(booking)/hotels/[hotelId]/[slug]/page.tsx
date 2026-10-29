import RoomDetailsPage from "../../_components/RoomDetailsPage";

interface IProps {
  params: Promise<{
    hotelId: string;
    slug: string;
  }>;
}

export default async function Page({ params }: IProps) {
  const { hotelId, slug } = await params;
  return <RoomDetailsPage hotelId={hotelId} roomSlug={slug} />;
}
