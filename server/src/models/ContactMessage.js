import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide sender name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide sender email'],
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide inquiry subject'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide inquiry message'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'Replied'],
      default: 'Unread',
    },
  },
  {
    timestamps: true,
  }
);

export const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
