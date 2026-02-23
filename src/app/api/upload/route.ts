import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { uploadToS3 } from "@/lib/s3";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;
  const category = (formData.get("category") as string) || "general";

  if (!file) {
    return NextResponse.json({ error: "ファイルが選択されていません" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "対応していないファイル形式です (JPEG, PNG, WebP, GIF のみ)" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "ファイルサイズは5MB以下にしてください" },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${crypto.randomUUID()}.${ext}`;
  const key = `uploads/${category}/${filename}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  const url = await uploadToS3(buffer, key, file.type);

  await prisma.upload.create({
    data: {
      filename,
      originalName: file.name,
      path: url,
      mimeType: file.type,
      size: file.size,
    },
  });

  return NextResponse.json({ url });
}
