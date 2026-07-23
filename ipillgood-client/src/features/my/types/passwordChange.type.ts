import { z } from 'zod';
import { passwordChangeSchema } from '../schemas/passwordChangeSchema';

export type PasswordChangeType = z.infer<typeof passwordChangeSchema>;
