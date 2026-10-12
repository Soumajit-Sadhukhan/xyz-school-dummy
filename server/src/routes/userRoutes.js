import express from 'express';
import { User } from '../models/User.js';
import { protect } from '../middleware/auth.js';
import { checkRole } from '../middleware/checkRole.js';

const router = express.Router();

router.use(protect);
router.use(checkRole('superadmin'));

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    const formatted = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
      role: u.role,
      isActive: u.isActive,
      lastLogin: u.lastLogin ? u.lastLogin.toLocaleString() : 'Never',
    }));
    res.json(formatted);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: role || 'editor',
    });

    res.status(201).json({
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      isActive: newUser.isActive,
      lastLogin: 'Never',
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'superadmin') {
      return res.status(400).json({ message: 'Cannot delete primary super administrator account.' });
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User access revoked.' });
  } catch (err) {
    next(err);
  }
});

export default router;
