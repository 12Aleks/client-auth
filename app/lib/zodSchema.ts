import { z } from 'zod';

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin', 'distributor'])
});

export type AuthDto = z.infer<typeof authSchema>;