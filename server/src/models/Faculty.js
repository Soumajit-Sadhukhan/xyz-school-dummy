import mongoose from 'mongoose';

const facultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide educator name'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Please provide designation'],
      trim: true,
    },
    department: {
      type: String,
      enum: ['Leadership', 'Sciences', 'Mathematics', 'Humanities', 'Athletics'],
      default: 'Sciences',
    },
    qualification: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      default: '5 Years',
    },
    email: {
      type: String,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80',
    },
    bio: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = mongoose.model('Faculty', facultySchema);
