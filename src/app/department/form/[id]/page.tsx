import { authServer } from "@/lib/auth";
import { Role } from "@/lib/types/role";

import UpdateForm from "@/components/Department/UpdateForm";

export default async function Page() {
  await authServer([Role.Admin, Role.Student, Role.TeacherL1, Role.TeacherL2]);

  return (
    <>
      <UpdateForm />
    </>
  );
}
