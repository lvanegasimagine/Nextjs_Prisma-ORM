import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: 'Obteniendo una nota' })
}

export function PUT() {
    return NextResponse.json({ message: 'Actualizando una nota' })
}

export function DELETE() {
    return NextResponse.json({ message: 'Eliminando una nota' })
}