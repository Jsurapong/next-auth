import { Role } from "@/lib/types/role";

export function authClient(roles: Role[], userRole: number) {
  return roles.includes(userRole);
}
