import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApi } from "./api/authApi";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        empCode: { label: "Employee Code", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials");
        const { empCode, password } = credentials;
        if (!empCode || !password) throw new Error("Missing fields");

        try {
          console.log("1. Calling authApi.login with:", { empCode, password });
          const accessToken = await authApi.login({ empCode, password });
          console.log("2. Received accessToken:", accessToken);

          console.log("3. Calling authApi.getCurrentUser with token");
          const user = await authApi.getCurrentUser(accessToken);
          console.log("4. Received user:", user);

          return {
            id: user.id,
            empCode: user.empCode,
            name: user.name,
            email: user.email,
            department: user.department,
            role: user.role,
            hireDate: user.hireDate,
            apiToken: accessToken,
          };
        } catch (error: any) {
          console.error("Full error object:", error);
          console.error("Error message:", error.message);
          console.error("Error response:", error.response?.data);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign in, user object contains the returned data from authorize
      if (user) {
        token.id = user.id;
        token.empCode = user.empCode;
        token.name = user.name;
        token.email = user.email;
        token.department = user.department;
        token.role = user.role; // ✅ copy role to token
        token.hireDate = user.hireDate;
        token.apiToken = user.apiToken;
      }
      return token;
    },
    async session({ session, token }) {
      // Ensure session.user exists, then copy token fields
      if (session.user) {
        session.user.id = token.id as string;
        session.user.empCode = token.empCode as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.department = token.department as string;
        session.user.role = token.role as string; // ✅ copy role to session
        session.user.hireDate = token.hireDate as string;
      }
      // Also attach apiToken for axios interceptor
      session.apiToken = token.apiToken as string;
      return session;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

// Extend types
declare module "next-auth" {
  interface User {
    id: string;
    empCode: string;
    name: string;
    email: string;
    department: string;
    role: string;
    hireDate: string;
    apiToken: string;
  }
  interface Session {
    apiToken?: string;
    user: {
      id: string;
      empCode: string;
      name: string;
      email: string;
      department: string;
      role: string;
      hireDate: string;
    };
  }
}
