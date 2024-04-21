import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  // Extract data from Token
  const userId = await getDataFromToken(request);
  const user = User.findOne({ _id: userId }).select("-password");

  //Check if there is no user
  if (!user) {
    return NextResponse.json(
      { error: "User does not exists" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
