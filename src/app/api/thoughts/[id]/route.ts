import { getPrisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const prisma = getPrisma();
  const body = (await request.json().catch(() => ({}))) as { text?: string; createdTime?: string };

  const data: { text?: string; createdTime?: Date } = {};
  if (typeof body.text === "string") data.text = body.text;
  if (typeof body.createdTime === "string") data.createdTime = new Date(body.createdTime);

  const thought = await prisma.thought.update({
    where: { id: params.id },
    data,
    select: { id: true, text: true, createdTime: true, updatedAt: true },
  });

  return NextResponse.json({ thought });
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const prisma = getPrisma();
  await prisma.thought.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}

