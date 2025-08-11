import { Schema, model, models } from "mongoose";

const companySchema = new Schema({
    company: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },
})

companySchema.index({ company: "text", country: "text" });

const Company = models.Company || model("Company", companySchema);
export default Company;