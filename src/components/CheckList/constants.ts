import { Role } from "@/lib/types/role";

export const roleOptions = [
  { label: "Admin", value: Role.Admin },
  { label: "ครูฝ่ายปกครอง", value: Role.TeacherL1 },
  { label: "ครูประจำชั้น", value: Role.TeacherL2 },
  { label: "นักเรียน", value: Role.Student },
];
