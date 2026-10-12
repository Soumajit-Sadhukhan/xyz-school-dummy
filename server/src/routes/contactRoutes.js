import express from 'express';
import { ContactMessage } from '../models/ContactMessage.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const msg = await ContactMessage.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Message delivered to school front desk.',
      data: { id: msg._id.toString(), ...msg.toObject() },
    });
  } catch (err) {
    next(err);
  }
});

router.get('/', protect, async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    const formatted = messages.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      email: m.email,
      phone: m.phone,
      subject: m.subject,
      message: m.message,
      status: m.status,
      createdAt: m.createdAt ? m.createdAt.toISOString().split('T')[0] : 'Recent',
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', protect, async (req, res, next) => {
  try {
    const msg = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ id: msg._id.toString(), ...msg.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
