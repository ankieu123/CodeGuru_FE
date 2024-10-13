import { RxAvatar } from "react-icons/rx";
import { apiSlice } from "../api/apiSlice";


export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query:(avatar) => ({
                url:"update-user-avatar",
                method:"PUT",
                body:{avatar},
                credentials: "include" as const,
            })
        }),
        EditProfile: builder.mutation({
            query:({name,email}) => ({
                url:"update-user-avatar",
                method:"PUT",
                body:{name,email},
                credentials: "include" as const,
            })
        })
    })
})
export const {useUpdateAvatarMutation}=userApi;