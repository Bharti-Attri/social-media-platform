import jwt from 'jsonwebtoken';

function authorize() {
    return (req, res, next) => {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(400).json({ message: 'No Token Found' });
        }
        else {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            } catch (error) {
                if (error.name === 'TokenExpiredError') {
                    res.status(400).json({ message: 'Token Expired.' });
                }
                else res.status(400).json({ message: 'Invalid token.' });
            }
        }
    };
}

export default authorize;
