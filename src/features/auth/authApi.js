import { apiSlice } from '../api/apiSlice';
import { userLoggedIn } from './authSlice';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user: result.data.user
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            }
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/auth/a-ad/login',
                method: 'POST',
                body: data
            }),

            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;

                    localStorage.setItem(
                        'auth',
                        JSON.stringify({
                            accessToken: result.data.accessToken,
                            user: result.data.data
                        })
                    );

                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            refreshToken: result.data.refreshToken,
                            user: result.data.data
                        })
                    );
                } catch (err) {
                    // do nothing
                }
            }
        }),

        adminPasswordUpdate: builder.mutation({
            query: (data) => ({
                url: `/auth/change-password`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response, meta, arg) => response
        })
    })
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useAdminPasswordUpdateMutation
} = authApi;
