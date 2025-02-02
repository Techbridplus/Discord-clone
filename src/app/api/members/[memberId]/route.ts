import { NextResponse,NextRequest } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function DELETE(
  request: NextRequest
) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const searchParams = request.nextUrl.searchParams;
    const serverId = searchParams.get("serverId");
    const memberId = searchParams.get("memberId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    if (!memberId)
      return new NextResponse("Member ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest

) {
  try {
    
    const { role } = await request.json();

    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    
    const searchParams = request.nextUrl.searchParams;
    const serverId = searchParams.get("serverId");
    const memberId = searchParams.get("memberId");
    if (!serverId)
      return new NextResponse("Server ID Missing", { status: 400 });

    if (!memberId)
      return new NextResponse("Member ID Missing", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          update: {
            where: {
              id: memberId,
              profileId: {
                not: profile.id
              }
            },
            data: { role }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(server);
  } catch (error) {
    console.error("[MEMBER_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
