import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tagTypes";
import Cookies from "js-cookie";
import { getBaseUrl } from "../../helpers/config/envConfig";

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  timeout: 60000,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("frafoldashboard_accessToken");
    const resendOtptoken = Cookies.get("frafoldashboard_forgetToken");
    const resetPasswordToken = Cookies.get(
      "frafoldashboard_forgetOtpMatchToken",
    );

    if (token) {
      headers.set("token", `${token}`);
    }
    if (resendOtptoken) {
      headers.set("token", `${resendOtptoken}`);
    }
    if (resetPasswordToken) {
      headers.set("token", `${resetPasswordToken}`);
    }

    return headers;
  },
});

// const baseQueryWithRefreshToken: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result?.error?.status === 401) {
//     const refreshToken = Cookies.get("frafoldashboard_refreshToken");

//     if (!refreshToken) {
//       Cookies.remove("frafoldashboard_accessToken");
//       return result;
//     }

//     const res = await fetch(`${getBaseUrl()}/auth/refresh-token`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         token: refreshToken,
//       },
//     });

//     const data = await res.json();
//     if (data?.data?.accessToken) {
//       Cookies.set("frafoldashboard_accessToken", data.data.accessToken);
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       Cookies.remove("frafoldashboard_accessToken");
//       Cookies.remove("frafoldashboard_refreshToken");
//     }
//   }

//   return result;
// };

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
