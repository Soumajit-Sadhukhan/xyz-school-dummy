import mongoose from 'mongoose';

const admissionEnquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Please provide parent/guardian name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email address'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      trim: true,
    },
    grade: {
      type: String,
      required: [true, 'Please specify grade applying for'],
      trim: true,
    },
    academicYear: {
      type: String,
      default: '2026-2027',
    },
    previousSchool: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Under Review', 'Admitted', 'Rejected'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

export const AdmissionEnquiry = mongoose.model('AdmissionEnquiry', admissionEnquirySchema);
