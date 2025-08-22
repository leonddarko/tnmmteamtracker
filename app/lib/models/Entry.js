import { Schema, model, models } from "mongoose";

const entrySchema = new Schema({
    station: String,
    date: String,
    timestamp: String,
    title: String,
    product: String,
    duration: String,
    language: String,
    program: String,
    rate: String,
    industry: String,
    category: String,
    company: String,
    brand: String,
    variant: String,
    country: String,
    timesubmitted: String,
    datesubmitted: String,
    user: String,
});

entrySchema.index(
    {user: "text", country: "text", company: "text", station: "text", product: "text"},
    { language_override: "none" }
);

const Entry = models.Entry || model("Entry", entrySchema);
export default Entry;