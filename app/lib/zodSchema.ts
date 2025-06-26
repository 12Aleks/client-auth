import { z } from 'zod';

const noSpecialCharsRegex = /^[^<>`"'&]+$/;

export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['user', 'admin', 'distributor'])
});

export type AuthDto = z.infer<typeof authSchema>;

export const ItemSchema = z.object({
    title: z.string().min(6, 'The title is too short')
        .max(100, 'The title is too long, max 100 symbols')
        .regex(noSpecialCharsRegex, 'Description contains forbidden characters'),
    description: z.string().min(6, 'The description is too short')
        .max(600, 'The title is too long, max 600 symbols')
        .regex(noSpecialCharsRegex, 'Description contains forbidden characters'),
});

export type Item = z.infer<typeof ItemSchema>;