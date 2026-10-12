import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Sports', 'Cultural', 'Academics', 'Leadership', 'General'],
      default: 'Academics',
    },
    date: {
      type: String,
      required: [true, 'Please provide event date'],
    },
    time: {
      type: String,
      default: '09:00 AM - 03:00 PM',
    },
    venue: {
      type: String,
      default: 'Main Campus Auditorium & Grounds',
    },
    image: {
      type: String,
      default: '/images/campus/campus-events.png',
    },
    description: {
      type: String,
      trim: true,
    },
    isUpcoming: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Event = mongoose.model('Event', eventSchema);
