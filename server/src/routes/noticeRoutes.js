import express from 'express';
import { Notice } from '../models/Notice.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    const formatted = notices.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      category: n.category,
      priority: n.priority,
      summary: n.summary,
      date: n.date,
      isPublished: n.isPublished,
      attachmentUrl: n.attachmentUrl,
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json({
      id: notice._id.toString(),
      ...notice.toObject(),
    });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!notice) return res.status(404).json({ message: 'Notice not found' });
    res.json({ id: notice._id.toString(), ...notice.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Notice deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
