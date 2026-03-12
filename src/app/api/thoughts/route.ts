import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const thoughts = await prisma.thought.findMany({
    orderBy: { createdTime: "desc" },
    select: { id: true, text: true, createdTime: true, updatedAt: true },
  });
  return NextResponse.json({ thoughts });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { text?: string; createdTime?: string };
  const createdTime = body.createdTime ? new Date(body.createdTime) : undefined;

  const thought = await prisma.thought.create({
    data: {
      text: body.text ?? "",
      ...(createdTime ? { createdTime } : {}),
    },
    select: { id: true, text: true, createdTime: true, updatedAt: true },
  });

  return NextResponse.json({ thought }, { status: 201 });
}

