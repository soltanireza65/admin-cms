import { stringify } from "query-string";
import axios from "axios";
export type Method =
  | "get"
  | "GET"
  | "delete"
  | "DELETE"
  | "head"
  | "HEAD"
  | "options"
  | "OPTIONS"
  | "post"
  | "POST"
  | "put"
  | "PUT"
  | "patch"
  | "PATCH"
  | "link"
  | "LINK"
  | "unlink"
  | "UNLINK";

export const Http = {
  request: async <A>(
    methodType: Method,
    url: string,
    params?: any,
    payload?: any,
  ): Promise<A> => {
    return new Promise((resolve, reject) => {
      const query = params ? `?${stringify({ ...params })}` : "";

      let headers: any = {
        "Content-Type": "application/json",
      };
      let body = undefined;

      body = payload;
      axios({
        method: methodType,
        url: `${url}${query}`,
        data: body,
        headers,
      })
        .then(async (x) => {
          if (x.status === 200) {
            let response: A;
            const data = x.data;
            response = data;
            response = { ...response, status: 200 };
            return resolve(response);
          }

          return reject(x);
        })
        .catch((e) => {
          if (e && e.response && e.response.status == 403) {
            return reject({ status: 403 });
          }
          return reject({ error: e.response, status: 400 });
        });
    });
  },
};
