import { NextResponse } from 'next/server';
const nodemailer = require("nodemailer");

export async function POST(request:any) {
    try {
        const { subject, message } = await request.json();

        const transporter = nodemailer.createTransport({
            service: 'mailersend.net',
            host: 'smtp.mailersend.net',
            port: 587,
            secure: true,
            auth: {
                user: 'MS_KJISN7@trial-pq3enl606z5l2vwr.mlsender.net',
                pass: process.env.NEXT_PUBLIC_PASSWORD
            }
        })

        const mailOption = {
            from: 'MS_KJISN7@trial-pq3enl606z5l2vwr.mlsender.net',
            to: 'davidderedx2@gmail.com',
            subject: "Send Email Tutorial",
            html: `
        <h3>Hello Augustine</h3>
        <li> title: ${subject}</li>
        <li> message: ${message}</li> 
        `
        }

        await transporter.sendMail(mailOption)

        return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Failed to Send Email" }, { status: 500 })
    }
}