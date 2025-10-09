import mongoose from 'mongoose';

const MedicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    brand_name: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    dosage_form: {
      type: String,
      trim: true,
    },
    strength: {
      type: String,
      trim: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    default_selling_price: {
      type: Number,
      min: 0,
    },
    reorder_level: {
      type: Number,
      default: 10,
      min: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

MedicineSchema.index({ name: 1, brand_name: 1 }, { unique: true });

// ✅ FIX: Use consistent naming (no hyphen)
export default mongoose.models.mastermedicine || 
  mongoose.model('mastermedicine', MedicineSchema);