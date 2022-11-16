import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*"] }
export default withAuth(
  {
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      authorized: async ({ req }) => {
        const token = req.cookies.get("next-auth.session-token");

        if (token) return true;

        return false;
      },
    },

    pages: {
      signIn: "/entrar",
    },
  }
)