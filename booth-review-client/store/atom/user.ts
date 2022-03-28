import create from "zustand";

interface JwtState {
  jwt: string | null,
  setJwt: (jwt: string) => void;
}
export const useUserJWT = create<JwtState>((set) => {
  return {
    jwt: null,
    setJwt: (jwt) => set(() => ({jwt}))
  }
})
export const login = () => {
  const setJwt = useUserJWT((state) =>state.setJwt);
  setJwt("");
};
