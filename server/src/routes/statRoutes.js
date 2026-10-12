import express from 'express';
import { AdmissionEnquiry } from '../models/AdmissionEnquiry.js';
import { Notice } from '../models/Notice.js';
import { Event } from '../models/Event.js';
import { Faculty } from '../models/Faculty.js';
import { Gallery } from '../models/Gallery.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, async (req, res, next) => {
  try {
    const [
      totalEnquiries,
      pendingEnquiries,
      totalNotices,
      totalEvents,
      totalFaculty,
      totalGallery,
      unreadMessages,
    ] = await Promise.all([
      AdmissionEnquiry.countDocuments(),
      AdmissionEnquiry.countDocuments({ status: 'New' }),
      Notice.countDocuments(),
      Event.countDocuments(),
      Faculty.countDocuments(),
      Gallery.countDocuments(),
      ContactMessage.countDocuments({ status: 'Unread' }),
    ]);

    res.json({
      totalEnquiries,
      pendingEnquiries,
      totalNotices,
      totalEvents,
      totalFaculty,
      totalGallery,
      unreadMessages,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
