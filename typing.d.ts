import { Note } from "@prisma/client";

interface IChildrenProps {
    children: React.ReactNode
}
export type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type UpdateNote = Partial<CreateNote>