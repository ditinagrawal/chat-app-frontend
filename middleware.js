import authConfig from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  // console.log("isLoggedIn", isLoggedIn);
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api");
  const isPublicRoute = ["/"].includes(nextUrl.pathname);
  const isAuthRoute = ["/auth/login", "/auth/register"].includes(
    nextUrl.pathname
  );

  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return null;
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
