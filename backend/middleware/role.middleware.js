const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admins only " });
  }
};

const superAdminOnly = (req, res, next) => {
  if (req.user?.isSuperAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Super admin only " });
  }
};

export { adminOnly, superAdminOnly };
