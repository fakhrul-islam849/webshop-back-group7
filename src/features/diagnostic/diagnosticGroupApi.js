const { apiSlice } = require('../api/apiSlice');

const diagnosticGroupApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiagnosticGroupDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `diagnostic-test-group/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['diagnosticGroup'],
            transformResponse: (response, meta, arg) => response.data
        }),
        diagnosticGroupAdd: builder.mutation({
            query: (data) => ({
                url: `diagnostic-test-group`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['diagnosticGroup'],
            transformResponse: (response, meta, arg) => response
        }),
        getAllDiagnosticGroup: builder.query({
            query: () => ({
                url: `diagnostic-test-group`,
                method: 'GET'
            }),
            providesTags:['diagnosticGroup'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getDiagnosticGroupDetails: builder.query({
            query: (id) => ({
                url: `diagnostic-test-group/${id}`,
                method: 'GET'
            }),
            providesTags:['diagnosticGroupUpdate'],
            transformResponse: (response, meta, arg) => response.data
        }),
        diagnosticGroupUpdate: builder.mutation({
            query: (data) => ({
                url: `diagnostic-test-group/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags:['diagnosticGroupUpdate'],
            transformResponse: (response, meta, arg) => response
        }),
        diagnosticGroupDelete: builder.mutation({
            query: (id) => ({
                url: `diagnostic-test-group/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['diagnosticGroup'],
            transformResponse: (response, meta, arg) => response
        }),
    })
});

export const {
    useGetDiagnosticGroupDataTableQuery,
    useDiagnosticGroupAddMutation,
    useGetAllDiagnosticGroupQuery,
    useGetDiagnosticGroupDetailsQuery,
    useDiagnosticGroupUpdateMutation,
    useDiagnosticGroupDeleteMutation,
} = diagnosticGroupApi;
