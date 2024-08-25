import { object, ref, string, type InferType } from "yup";
import adminLoginSchema from "./adminLoginSchema";

const adminRegisterSchema = adminLoginSchema.concat(object({
    // extend the adminLoginSchema with confirmPassword and key fields
    confirmPassword: string().oneOf([ref("password")], "Passwords must match").required(),
    key: string().required().uuid().label("Key"),
}));

export default adminRegisterSchema;

export type AdminRegisterSchema = InferType<typeof adminRegisterSchema>;