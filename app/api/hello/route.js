import { NextResponse, NextRequest } from "next/server";

export async function GET(req, res) {
  return NextResponse.json({ name: "John Doe" }, { status: 200 });
}
