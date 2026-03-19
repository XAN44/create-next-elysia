# create-next-elysia

> CLI tool สำหรับ scaffold fullstack project แบบ **Next.js (frontend) + Elysia.js (backend)** ในคำสั่งเดียว

---

## 🚀 Usage

```bash
npx create-next-elysia my-app
# or
bunx create-next-elysia my-app
```

เสร็จแล้วจะได้โครงสร้างแบบนี้:

```
my-app/
├── front-end-app/    # Next.js — App Router, TypeScript, TailwindCSS, shadcn/ui
└── back-end-app/     # Elysia.js — Bun runtime, Prisma ORM
```

> ทั้งสองส่วนถูก setup เป็น **git submodule** แยกกัน — แก้ไขและ deploy อิสระจากกัน

---

## ✨ Features

- **Interactive setup wizard** — ถามชื่อ project และเลือก package manager ผ่าน prompt
- **Auto git submodules** — init และ link front-end / back-end ให้อัตโนมัติ
- **Package manager choices** — รองรับ `bun`, `npm`, `yarn`
- **TypeScript ทั้งคู่** — frontend และ backend เป็น TypeScript 100%
- **Prisma พร้อมใช้** — backend มี Prisma ORM setup รออยู่แล้ว

---

## 📦 Tech Stack ที่ได้

| | Frontend | Backend |
|---|---|---|
| Framework | Next.js 15 (App Router) | Elysia.js |
| Runtime | Node.js | **Bun** |
| Language | TypeScript | TypeScript |
| ORM | — | Prisma |
| UI | TailwindCSS + shadcn/ui | — |
| Linter | Biome | — |

---

## 🏃 เริ่มหลัง scaffold

```bash
# รัน frontend
cd my-app/front-end-app
bun dev        # หรือ npm run dev

# รัน backend (เปิด terminal ใหม่)
cd my-app/back-end-app
bun dev
```

Frontend → `http://localhost:3000`  
Backend  → `http://localhost:3001` (หรือตาม config ใน Elysia)

---

## 💡 ทำไมถึงแยก frontend/backend?

Next.js รองรับ API Routes อยู่แล้ว แต่มีข้อจำกัด เช่น ทำ Socket.io ลำบาก, runtime ไม่ยืดหยุ่น  
การแยก Elysia.js เป็น backend อิสระทำให้:
- **Backend scale แยกได้** โดยไม่กระทบ frontend
- **Elysia + Bun เร็วกว่า Express มาก** — เหมาะกับ API ที่ต้องการ performance
- **Deploy แยกกันได้** — frontend บน Vercel, backend บน Railway/Fly.io

---

## 📋 Requirements

- Node.js 18+
- Git (สำหรับ submodule setup)
- Bun (แนะนำ — สำหรับ backend)

---

## License

MIT
