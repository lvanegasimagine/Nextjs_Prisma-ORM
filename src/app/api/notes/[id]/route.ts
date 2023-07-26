import { NextResponse } from "next/server";
import { Prisma } from '@prisma/client';
import { prisma } from '@/libs/prisma'

interface Params { params: { id: string } }

export async function GET(request: Request, { params }: Params) {
    try {
        const { id } = params;

        const note = await prisma.note.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!note) return NextResponse.json({ message: 'Nota no encontrada' }, { status: 404 })
        return NextResponse.json(note, { status: 200 })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { id } = params
        const { title, content } = await request.json();
        const updatedNote = await prisma.note.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                content
            }
        })

        if (!updatedNote) return NextResponse.json({ message: 'Nota no encontrada' }, { status: 404 })

        return NextResponse.json(updatedNote, { status: 200 })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') return NextResponse.json({ message: 'Nota no encontrada para actualizar' }, { status: 500 })
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        const { id } = params

        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(id)
            }
        })

        if (!deletedNote) return NextResponse.json({ message: 'Nota no encontrada' }, { status: 404 })

        return NextResponse.json(deletedNote, { status: 200 })
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') return NextResponse.json({ message: 'Nota no encontrada para eliminar' }, { status: 500 })
            return NextResponse.json({ message: error.message }, { status: 500 })
        }
    }
}