const { apiSlice } = require('../api/apiSlice');

const brandApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrandDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `brand/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['brand'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getBrandTopVisitDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `brand/top-visitor?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['brand'],
            transformResponse: (response, meta, arg) => response.data
        }),
        brandAdd: builder.mutation({
            query: (data) => ({
                url: `brand`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['brand', 'notification'],
            transformResponse: (response, meta, arg) => response
        }),
        getBrandDetails: builder.query({
            query: (id) => ({
                url: `brand/public/get-brand-details/${id}`,
                method: 'GET',
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['brandDetails']
        }),
        brandUpdate: builder.mutation({
            query: ({data, id}) => ({
                url: `brand/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags:['brand','brandDetails'],
            transformResponse: (response, meta, arg) => response
        }),
    })
});

export const {
    useGetBrandDataTableQuery,
    useGetBrandTopVisitDataTableQuery,
    useBrandAddMutation,
    useGetBrandDetailsQuery,
    useBrandUpdateMutation
} = brandApi;
