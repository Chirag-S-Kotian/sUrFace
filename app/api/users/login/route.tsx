import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export default async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User exists");

    const validatePassword = await bcryptjs.compare(password, user.password);
    if (!validatePassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    console.log("Password is valid");

    return NextResponse.json({
      message: "login successful",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
