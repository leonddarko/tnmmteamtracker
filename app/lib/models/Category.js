// models/Category.js
import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  industry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Industry',
    required: true,
  },
  categories: {
    type: [String],
    default: [],
  },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);