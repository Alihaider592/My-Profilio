import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_USER = process.env.EMAIL_USER;

if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not defined in .env.local");
if (!EMAIL_USER) throw new Error("EMAIL_USER is not defined in .env.local");

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return NextResponse.json({ success: false, error: "Invalid form data" }, { status: 400 });
    }

    await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: EMAIL_USER as string,      
      subject: "New Portfolio Contact",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
