import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide photograph title'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Campus', 'Facilities', 'Sports', 'Events', 'Faculty'],
      default: 'Campus',
    },
    imageUrl: {
      type: String,
      required: [true, 'Please provide photograph URL'],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Gallery = mongoose.model('Gallery', gallerySchema);
