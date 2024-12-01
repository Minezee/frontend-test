import cookie from "cookie";

export const setCookie = (name:string, value: string, day: number) => {
  document.cookie = cookie.serialize(name, value, {
    maxAge: day * 24 * 60 * 60,
    path: '/',
  });
}