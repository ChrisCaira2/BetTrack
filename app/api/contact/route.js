import connectDB from "/lib/mongo/index";
import Slip from "/models/betSlip";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
    const { sport, team, betType, odds } = await req.json();

    try {
        await connectDB();
        await Slip.create({ sport, team, betType, odds });

        return NextResponse.json({
            msg: ["Bet sent successfully"],
            success: true,
        });
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            let errorList = [];
            for (let e in error.errors) {
                errorList.push(error.errors[e].message);
            }
            console.log(errorList);
            return NextResponse.json({ msg: errorList });
        } else {
            return NextResponse.json({ msg: ["Unable to send message."] });
        }
    }
}