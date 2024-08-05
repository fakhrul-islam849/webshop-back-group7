const { apiSlice } = require('../api/apiSlice');

const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `user/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getUsers: builder.query({
            query: () => ({
                url: `user/`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getUserSiteVisit: builder.query({
            query: (id) => ({
                url: `user/site-visit-record/${id}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
    })
});

export const {
    useGetUserDataTableQuery,
    useGetUsersQuery,
    useGetUserSiteVisitQuery,
} = userApi;