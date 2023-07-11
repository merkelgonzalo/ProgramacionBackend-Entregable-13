export const autorization = (req, res, next) => {
    if(!req.session.user){
        res.status(403).json({ error: 'ACCESS DENIED' });
    } else {
        if (req.session.user.role === 'admin') {
            next();
          } else {
            res.status(403).json({ error: 'ACCESS DENIED' });
        }
    }
} 