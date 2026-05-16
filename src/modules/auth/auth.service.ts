import type { User } from "@prisma/client";

import { ApiError } from "@/lib/api-error";
import {
  DEMO_ACTOR,
  DEMO_AUTH_PASSWORD,
  DEMO_AUTH_TOKEN,
  DEMO_USER_EMAIL,
} from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import type { LoginInput } from "@/modules/auth/auth.validation";

type DemoAuthUser = Pick<User, "id" | "name" | "email" | "role">;

export type LoginResult = {
  token: string;
  user: DemoAuthUser;
};

export async function loginWithDemoCredentials(
  input: LoginInput,
): Promise<LoginResult> {
  if (
    input.email !== DEMO_USER_EMAIL ||
    input.password !== DEMO_AUTH_PASSWORD
  ) {
    throw new ApiError("Invalid email or password.", 401);
  }

  const user = await getOrCreateDemoUser();

  return {
    token: DEMO_AUTH_TOKEN,
    user: toDemoAuthUser(user),
  };
}

export async function getCurrentDemoUser(
  authorizationHeader: string | null,
): Promise<DemoAuthUser> {
  if (authorizationHeader !== `Bearer ${DEMO_AUTH_TOKEN}`) {
    throw new ApiError("Unauthorized.", 401);
  }

  const user = await getOrCreateDemoUser();

  return toDemoAuthUser(user);
}

async function getOrCreateDemoUser(): Promise<User> {
  return prisma.user.upsert({
    where: {
      email: DEMO_USER_EMAIL,
    },
    update: {
      name: DEMO_ACTOR,
      role: "Backend Engineer",
    },
    create: {
      name: DEMO_ACTOR,
      email: DEMO_USER_EMAIL,
      role: "Backend Engineer",
    },
  });
}

function toDemoAuthUser(user: User): DemoAuthUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
