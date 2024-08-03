const { apiSlice } = require('../api/apiSlice');

const genericApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGenericDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `generic/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['generic'],
        }),
        getGenericTopVisitorDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `generic/top-visitor?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['generic'],
        }),
        genericAdd: builder.mutation({
            query: (data) => ({
                url: `generic`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['generic'],
        }),
        getAllGeneric: builder.query({
            query: () => ({
                url: `generic/get-all`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['generic'],
        }),
        getGenericDetails: builder.query({
            query: (id) => ({
                url: `generic/${id}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['genericDetails'],
        }),
        genericUpdate: builder.mutation({
            query: ({data, id}) => ({
                url: `generic/${id}`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['generic', 'genericDetails'],
        }),
    })
});

export const {
    useGetGenericDataTableQuery,
    useGetGenericTopVisitorDataTableQuery,
    useGenericAddMutation,
    useGetAllGenericQuery,
    useGetGenericDetailsQuery,
    useGenericUpdateMutation,
} = genericApi;
