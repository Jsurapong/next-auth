import { Prisma } from "@prisma/client";

import { userArgs } from "@/app/api/user/route";

// 1: Define a type that includes the relation to `Post`
const User = Prisma.validator<Prisma.UserArgs>()({});

// 3: This type will include a user and all their posts
type User = Prisma.UserGetPayload<typeof User>;
