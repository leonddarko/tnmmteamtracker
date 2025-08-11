import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    brands: {
        type: [String],
        default: [],
    },
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);