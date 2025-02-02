import { NextResponse,NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
      return new NextResponse("Server ID Missing.", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        inviteCode: uuidv4()
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[SERVER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
