const { apiSlice } = require('../api/apiSlice');

const genericDetailsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        genericDetailsAdd: builder.mutation({
            query: (data) => ({
                url: `generic/add-details`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['genericDetails'],
        }),
        genericDetailsUpdate: builder.mutation({
            query: ({data, id}) => ({
                url: `generic/details/${id}`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['genericDetails','genericDetailsUpdate'],
        }),
        getGenericSpecificDetails: builder.query({
            query: (id) => ({
                url: `generic/details/${id}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data,
            providesTags:['genericDetailsUpdate'],
        }),
    })
});

export const {
    useGenericDetailsAddMutation,
    useGenericDetailsUpdateMutation,
    useGetGenericSpecificDetailsQuery,
} = genericDetailsApi;
