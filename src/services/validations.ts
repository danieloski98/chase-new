import { z } from 'zod';

const signUpValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3),
    email: z.string().email().nonempty(),
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    dob: z.string().nonempty(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
}).refine(({ password, confirmPassword }) => {
    if (confirmPassword !== password) {
        return false
    } else {
        return true
    }
}, {
    message: 'password do not match',
    path: ['confirmPassword'],
})

const signInValidation = z.object({
    username: z.string().nonempty('username cannot be empty').min(3, 'must contain at least 3 characters'),
    password: z.string().nonempty('Password cannot be empty'),
})

export {
    signUpValidation,
    signInValidation
}