import mongoose from 'mongoose';

const IndustrySchema = new mongoose.Schema({
  industry: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

export default mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);