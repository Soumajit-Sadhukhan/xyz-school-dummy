import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide notice title'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Admissions', 'Academics', 'Examinations', 'Sports', 'General'],
      default: 'General',
    },
    priority: {
      type: String,
      enum: ['Normal', 'Medium', 'High'],
      default: 'Normal',
    },
    summary: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      default: () => new Date().toISOString().split('T')[0],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    attachmentUrl: {
      type: String,
      default: '#',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export const Notice = mongoose.model('Notice', noticeSchema);
