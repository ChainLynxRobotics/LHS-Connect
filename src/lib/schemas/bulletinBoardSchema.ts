import { object, string, type InferType } from "yup";


const bulletinBoardSchema = object({
    title: string().required().min(1).max(64),
    content: string().required().min(1).max(512),
    link: string().optional().url().max(1024)
})

export default bulletinBoardSchema;

export type BulletinBoardSchema = InferType<typeof bulletinBoardSchema>;