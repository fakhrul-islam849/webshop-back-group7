const { apiSlice } = require('../api/apiSlice');

const pharmaceuticalApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPharmaceuticalDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `pharmaceutical/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags: ['pharmaceutical'],
            transformResponse: (response, meta, arg) => response.data
        }),
        pharmaceuticalAdd: builder.mutation({
            query: (data) => ({
                url: `pharmaceutical`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['pharmaceutical'],
            transformResponse: (response, meta, arg) => response
        }),
        getAllPharmaceutical: builder.query({
            query: () => ({
                url: `pharmaceutical`,
                method: 'GET'
            }),
            providesTags: ['pharmaceutical'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getPharmaceuticalDetails: builder.query({
            query: (id) => ({
                url: `/pharmaceutical/public/get-pharmaceutical/${id}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags: ['pharmaceuticalUpdate']
        }),
        updatePharmaceuticalGenericCount: builder.query({
            query: () => ({
                url: `pharmaceutical/brand-count/update`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        pharmaceuticalUpdate: builder.mutation({
            query: ({ data, id }) => ({
                url: `pharmaceutical/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['pharmaceuticalUpdate'],
            transformResponse: (response, meta, arg) => response
        }),
        pharmaceuticalDelete: builder.mutation({
            query: (id) => ({
                url: `pharmaceutical/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['pharmaceutical'],
            transformResponse: (response, meta, arg) => response
        })
    })
});

export const {
    useGetPharmaceuticalDataTableQuery,
    usePharmaceuticalAddMutation,
    useGetAllPharmaceuticalQuery,
    useGetPharmaceuticalDetailsQuery,
    useUpdatePharmaceuticalGenericCountQuery,
    usePharmaceuticalUpdateMutation,
    usePharmaceuticalDeleteMutation
} = pharmaceuticalApi;
