import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
    message: string,
    activationToken: string,
};

type RegistrationData = {};

export const authAPI = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        //endpoint
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "register",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userRegistration({
                            token: result.data.activationToken,
                        })
                    )
                } catch (error: any) {
                    console.log(error);
                }
            }
        }),
        activation: builder.mutation({
            query: ({ activation_code, activation_token }) => ({
                url: "activation-user",
                method: "POST",
                body: {
                    activation_code,
                    activation_token,
                },
            }),
        }),
    }),
});

export const { useRegisterMutation, useActivationMutation } = authAPI;