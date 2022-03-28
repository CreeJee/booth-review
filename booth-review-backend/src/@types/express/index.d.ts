declare global {
  namespace Express {
    interface User {
      sub: number; // subject (who taken token)
      iat: number; // iat
    }
  }
}
export {};
