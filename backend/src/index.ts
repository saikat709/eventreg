import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from './routes/auth.routes';

import segmentRoutes from './routes/segment.routes';

import registrationRoutes from './routes/registration.routes';

import idCardRoutes from './routes/idCard.routes';

import userRoutes from './routes/user.routes';

app.use('/api/users', userRoutes);

if (import.meta.env.PROD) {
    app.listen(3001, () => {
        console.log('Server is running on http://localhost:3001');
    });
}

export const viteNodeApp = app;
