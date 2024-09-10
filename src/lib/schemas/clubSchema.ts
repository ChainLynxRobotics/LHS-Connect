import { object, string, type InferType } from "yup";

const clubSchema = object({
    name: string().required().max(250),
    day: string().required().max(250),
    time: string().required().max(250),
    location: string().required().max(250),
    advisor: string().required().max(250),
    instagram: string().optional().trim().matches(/^[a-zA-Z0-9._]*$/, "Must be a valid instagram username (without the @)").max(250),
});

export default clubSchema;

export type ClubSchema = InferType<typeof clubSchema>;