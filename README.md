This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### 1. Instalar Prisma

### `npm i prisma -D`

### 2. Inicializar Prisma

```bash
npx prisma init --datasource-provider [sqlite || mysql || mongodb]
```

### 3. Creacion de Modelo Prisma

**Ejemplo:**

```bash
model Note {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 4. Creacion de Migracion

```bash
npx prisma migrate dev --name name_migration
```
