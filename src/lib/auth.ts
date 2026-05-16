import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/modules/auth/auth.validation";
import { loginWithDemoCredentials } from "@/modules/auth/auth.service";
import type { AuthUser } from "@/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          // Validate credentials
          const validation = loginSchema.safeParse(credentials);
          if (!validation.success) {
            if (process.env.NODE_ENV === "development") {
              console.error("[Auth] Validation failed:", validation.error.issues);
            }
            return null;
          }

          const { email, password } = validation.data;

          // Check for missing credentials
          if (!email || !password) {
            if (process.env.NODE_ENV === "development") {
              console.error("[Auth] Missing email or password");
            }
            return null;
          }

          if (process.env.NODE_ENV === "development") {
            console.log("[Auth] Attempting login for:", email);
          }

          // Call the shared auth service directly (no self-fetch)
          const result = await loginWithDemoCredentials({ email, password });

          // Validate user object has required fields
          if (!result.user.id || !result.user.email || !result.user.name || !result.user.role) {
            if (process.env.NODE_ENV === "development") {
              console.error("[Auth] User object missing required fields:", result.user);
            }
            return null;
          }

          const authUser: AuthUser = {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role,
          };

          if (process.env.NODE_ENV === "development") {
            console.log("[Auth] Login successful for:", authUser.email);
          }

          return authUser;
        } catch (error) {
          // Handle ApiError (401 for invalid credentials)
          if (error && typeof error === "object" && "statusCode" in error) {
            if (process.env.NODE_ENV === "development") {
              console.error("[Auth] Authentication failed:", (error as { message?: string }).message);
            }
            // Return null for invalid credentials (triggers CredentialsSignin)
            return null;
          }

          // Handle unexpected errors
          if (process.env.NODE_ENV === "development") {
            console.error("[Auth] Unexpected error during authorization:", error);
          }
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});

// Made with Bob
