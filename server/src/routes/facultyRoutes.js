import express from 'express';
import { Faculty } from '../models/Faculty.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: 1 });
    const formatted = faculty.map((f) => ({
      id: f._id.toString(),
      name: f.name,
      designation: f.designation,
      department: f.department,
      qualification: f.qualification,
      experience: f.experience,
      email: f.email,
      photoUrl: f.photoUrl,
      bio: f.bio,
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const member = await Faculty.create(req.body);
    res.status(201).json({ id: member._id.toString(), ...member.toObject() });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const member = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ message: 'Faculty member not found' });
    res.json({ id: member._id.toString(), ...member.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Faculty member removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;
