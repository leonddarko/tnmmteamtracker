import { Schema, model, models } from "mongoose";

const stationSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Radio', 'TV'], required: true },
});

const Station = models.Station || model('Station', stationSchema);
export default Station