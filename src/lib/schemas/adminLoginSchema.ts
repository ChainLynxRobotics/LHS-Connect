import { object, string, type InferType } from "yup";

const adminLoginSchema = object({
    email: string().trim().required().email().max(256).label("Email"),
    password: string().required().min(6).max(32).label("Password"),
});

export default adminLoginSchema;

export type AdminLoginSchema = InferType<typeof adminLoginSchema>;