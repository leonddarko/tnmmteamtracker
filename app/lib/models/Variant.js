import mongoose from 'mongoose';


const VariantSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    variants: {
        type: [String],
        default: [],
    },
});

export default mongoose.models.Variant || mongoose.model('Variant', VariantSchema);