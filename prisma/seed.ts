import { PrismaClient } from "@prisma/client";

import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const departments = [
  { name: "บัญชี" },
  { name: "คอมพิวเตอร์ธุรกิจ" },
  { name: "เลขา" },
  { name: "คอมพิวเตอร์กราฟฟิก" },
  { name: "วิจิตศิลป์" },
];

const user = [
  {
    id: 99,
    email: "admin@school",
    password: "password",
    f_name: "Admin",
    l_name: "",
    type: 1,
  },
  {
    id: 2001,
    email: "teacher_2001@school",
    password: "password",
    f_name: "คุณครูสมาน",
    l_name: "มีมาก",
    type: 2,
  },
  {
    id: 3001,
    email: "teacher_3001@school",
    password: "password",
    f_name: "คุณครูสมศรี",
    l_name: "จิตไมตรี",
    type: 3,
  },
  {
    id: 1001,
    email: "student_1001@school",
    password: "password",
    f_name: "แดง",
    l_name: "ใจดี",
    type: 4,
  },
  {
    id: 1002,
    email: "student_1002@school",
    password: "password",
    f_name: "เขียว",
    l_name: "ใจดี",
    type: 4,
  },
  {
    id: 1003,
    email: "student_1003@school",
    password: "password",
    f_name: "ดำ",
    l_name: "ใจดี",
    type: 4,
  },
];

async function main() {
  const departmentSeeder = departments.map(
    async (item) => await prisma.department.create({ data: item })
  );

  const userSeeder = user.map(
    async (item) =>
      await prisma.user.create({
        data: { ...item, password: await bcrypt.hash(item.password, 10) },
      })
  );

  await Promise.all([...departmentSeeder, ...userSeeder]);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
