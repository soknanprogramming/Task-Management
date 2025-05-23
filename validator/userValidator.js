// validator/userValidator.js
const { z } = require('zod');

const createUserValidationSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    email: z.string().email("Please provide a valid email address")
});

exports.validateUser = (req, res, next) => {
    try {
        createUserValidationSchema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message
                }))
            });
        }
        return res.status(400).json({ error: 'Invalid request data' });
    }
};