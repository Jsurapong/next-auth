import { authServer } from "@/lib/auth";
import { Role } from "@/lib/types/role";

import Dashboard from "@/components/Home/Dashboard";

export default async function Page() {
  await authServer([Role.Admin, Role.Student, Role.TeacherL1, Role.TeacherL2]);

  return <Dashboard />;
}
