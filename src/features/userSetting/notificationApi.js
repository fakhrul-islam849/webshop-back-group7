const { apiSlice } = require('../api/apiSlice');

const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotificationDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `notification/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['notification'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getNotificationDetails: builder.query({
            query: (id) => ({
                url: `notification/details/${id}`,
                method: 'GET'
            }),
            providesTags:['notification'],
            transformResponse: (response, meta, arg) => response.data
        }),
        notificationAdd: builder.mutation({
            query: (data) => ({
                url: `notification`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['notification'],
            transformResponse: (response, meta, arg) => response
        }),
        notificationDelete: builder.mutation({
            query: (id) => ({
                url: `notification/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags:['notification'],
            transformResponse: (response, meta, arg) => response
        }),
    })
});

export const {
    useGetNotificationDataTableQuery,
    useGetNotificationDetailsQuery,
    useNotificationAddMutation,
    useNotificationDeleteMutation,
} = notificationApi;
