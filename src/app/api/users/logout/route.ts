import { connect } from "@/dbConfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";

connect();

// GET since you just wanna clean the token
export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
