import { authServer } from "@/lib/auth";
import { Role } from "@/lib/types/role";

import DepartmentTable from "@/components/Department/Table";

export default async function Page() {
  await authServer([Role.Admin, Role.Student, Role.TeacherL1, Role.TeacherL2]);

  return (
    <>
      <DepartmentTable />
    </>
  );
}
