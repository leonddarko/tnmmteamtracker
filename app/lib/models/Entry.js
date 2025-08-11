import { Schema, model, models } from "mongoose";

const entrySchema = new Schema({
    station: String,
    date: {
        type: Date,
        required: true,
    },
    timestamp: String,
    title: String,
    product: String,
    duration: String,
    language: String,
    program: String,
    brandgeneric: String,
    brandvariant: String,
    brandvariant: String,
    company: String,
    industry: String,
    category: String,
    timesubmitted: String,
    user: String,
});

const Entry = models.Entry || model("Entry", entrySchema);
export default Entry;