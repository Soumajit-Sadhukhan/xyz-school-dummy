import express from 'express';
import { AdmissionEnquiry } from '../models/AdmissionEnquiry.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public: Submit admission enquiry
router.post('/', async (req, res, next) => {
  try {
    const enquiry = await AdmissionEnquiry.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Admission enquiry received.',
      enquiry: { id: enquiry._id.toString(), ...enquiry.toObject() },
    });
  } catch (err) {
    next(err);
  }
});

// Admin: Retrieve enquiries
router.get('/', protect, async (req, res, next) => {
  try {
    const list = await AdmissionEnquiry.find().sort({ createdAt: -1 });
    const formatted = list.map((e) => ({
      id: e._id.toString(),
      studentName: e.studentName,
      parentName: e.parentName,
      email: e.email,
      phone: e.phone,
      grade: e.grade,
      academicYear: e.academicYear,
      previousSchool: e.previousSchool,
      notes: e.notes,
      status: e.status,
      createdAt: e.createdAt ? e.createdAt.toISOString().split('T')[0] : 'Recent',
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

// Admin: Update status / notes
router.patch('/:id', protect, async (req, res, next) => {
  try {
    const enquiry = await AdmissionEnquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ id: enquiry._id.toString(), ...enquiry.toObject() });
  } catch (err) {
    next(err);
  }
});

// Admin: Delete enquiry
router.delete('/:id', protect, async (req, res, next) => {
  try {
    await AdmissionEnquiry.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Enquiry deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
