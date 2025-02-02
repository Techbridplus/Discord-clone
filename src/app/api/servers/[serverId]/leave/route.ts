import { NextResponse,NextRequest } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest

) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const searchParams = request.nextUrl.searchParams;
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: { not: profile.id },
        members: { some: { profileId: profile.id } }
      },
      data: { members: { deleteMany: { profileId: profile.id } } }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID_LEAVE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
