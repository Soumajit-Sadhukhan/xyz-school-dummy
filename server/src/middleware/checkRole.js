export const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    if (req.user.role === 'superadmin') {
      return next(); // Superadmin possesses all privileges
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Forbidden: role '${req.user.role}' is not authorized to perform this action.`,
      });
    }

    next();
  };
};
