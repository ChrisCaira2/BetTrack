import mongoose, { Schema } from "mongoose";

const betSlip = new Schema({
    sport: {
        type: String,
        required: [true, "Sport is required."],
        trim: true,
        maxLength: [7, "Sport must be lesser than 7 characters"],
    },
    team: {
        type: String,
        required: [true, "Team is required."],
        trim: true,
        maxLength: [7, "Team must be lesser than 7 characters"],
    },

    betType: {
        type: String,
        required: [true, "Bet Type is required."],
        maxLength: [7, "BetType must be lesser than 7 characters"],
    },

    odds: {
        type: String,
        required: [true, "Odds are required."],
        maxLength: [7, "Odds must be lesser than 7 characters"],
    },
    wager: {
        type: String,
        required: [true, "Wager is required."],
        maxLength: [7, "Wager must be lesser than 7 characters"],
    },

    date: {
        type: Date,
        default: Date.now,
    },
});

const slip =
    mongoose.models.slip || mongoose.model("Slip", betSlip);

export default slip;