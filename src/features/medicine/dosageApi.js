const { apiSlice } = require('../api/apiSlice');

const dosageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDosageDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `dosage/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['dosage'],
            transformResponse: (response, meta, arg) => response.data
        }),
        dosageAdd: builder.mutation({
            query: (data) => ({
                url: `dosage`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['dosage'],
        }),
        dosageUpdate: builder.mutation({
            query: (data) => ({
                url: `dosage`,
                method: 'PUT',
                body: data
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['dosage', 'dosageDetails'],
        }),
        dosageDetails: builder.query({
            query: (id) => ({
                url: `dosage/details/${id}`,
                method: 'GET'
            }),
            providesTags:['dosageDetails'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getAllDosage: builder.query({
            query: () => ({
                url: `dosage`,
                method: 'GET'
            }),
            providesTags:['dosage'],
            transformResponse: (response, meta, arg) => response.data
        }),
        dosageDelete: builder.mutation({
            query: (id) => ({
                url: `dosage/${id}`,
                method: 'DELETE',
            }),
            transformResponse: (response, meta, arg) => response,
            invalidatesTags:['dosage', 'dosageDetails'],
        }),
    })
});

export const {
    useGetDosageDataTableQuery,
    useDosageAddMutation,
    useDosageUpdateMutation,
    useDosageDetailsQuery,
    useGetAllDosageQuery,
    useDosageDeleteMutation,
} = dosageApi;
