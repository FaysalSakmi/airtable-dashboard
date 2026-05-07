import { NextResponse } from "next/server";
import { fetchCandidats } from "@/lib/airtable";

export async function GET() {
  try {
    const candidats = await fetchCandidats();
    return NextResponse.json(candidats);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Airtable" },
      { status: 500 }
    );
  }
}
