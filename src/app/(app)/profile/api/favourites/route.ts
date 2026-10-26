
// import { NextResponse } from "next/server";
// import { getFavorites } from "../../service/favourite.service";
// import { ApiError } from "../../client";


// export async function GET() {
//   try {
//     const favorites = await getFavorites();
//     return NextResponse.json(favorites);
//   } catch (error) {
//     const status = error instanceof ApiError ? error.status : 500;

//     return NextResponse.json(
//       {
//         success: false,
//         message: "تعذر تحميل المفضلة",
//         errors: [],
//         data: null,
//       },
//       { status },
//     );
//   }
// }