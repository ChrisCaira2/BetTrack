import connectDB from "/lib/mongo/index";
import Slip from "/models/betSlip";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
    const { sport, team, betType, odds, wager } = await req.json();

    try {
        await connectDB();
        await Slip.create({ sport, team, betType, odds, wager });

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

export async function GET() {
    try {
        await connectDB();
        await Slip.collection.find({ sport, team, betType, odds, wager })
    } catch (error) {
        console.log('no')
    }

}