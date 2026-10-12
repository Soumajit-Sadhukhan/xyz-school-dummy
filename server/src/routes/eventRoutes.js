import express from 'express';
import { Event } from '../models/Event.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    const formatted = events.map((e) => ({
      id: e._id.toString(),
      title: e.title,
      category: e.category,
      date: e.date,
      time: e.time,
      venue: e.venue,
      image: e.image,
      description: e.description,
      isUpcoming: e.isUpcoming,
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/', protect, async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ id: event._id.toString(), ...event.toObject() });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', protect, async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ id: event._id.toString(), ...event.toObject() });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', protect, async (req, res, next) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Event deleted.' });
  } catch (err) {
    next(err);
  }
});

export default router;
