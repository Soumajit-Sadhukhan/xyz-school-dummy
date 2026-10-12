import express from 'express';
import { Gallery } from '../models/Gallery.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    const formatted = items.map((i) => ({
      id: i._id.toString(),
      title: i.title,
      category: i.category,
      imageUrl: i.imageUrl,
      description: i.description,
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const item = await Gallery.create(req.body);
    res.status(201).json({ id: item._id.toString(), ...item.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Gallery item removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;
