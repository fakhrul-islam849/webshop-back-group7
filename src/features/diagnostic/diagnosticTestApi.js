const { apiSlice } = require('../api/apiSlice');

const diagnosticTestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiagnosticTestDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `order/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['diagnosticTest'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getDiagnosticTestDetails: builder.query({
            query: (id) => ({
                url: `order/details/${id}`,
                method: 'GET'
            }),
            providesTags:['diagnosticTestUpdate'],
            transformResponse: (response, meta, arg) => response.data
        }),
        diagnosticTestAdd: builder.mutation({
            query: (data) => ({
                url: `diagnostic-test`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['diagnosticTest'],
            transformResponse: (response, meta, arg) => response
        }),
        diagnosticTestUpdate: builder.mutation({
            query: (data) => ({
                url: `diagnostic-test/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags:['diagnosticTestUpdate'],
            transformResponse: (response, meta, arg) => response
        }),
        diagnosticTestDelete: builder.mutation({
            query: (id) => ({
                url: `diagnostic-test/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['diagnosticTest'],
            transformResponse: (response, meta, arg) => response
        })
    })
});

export const {
    useGetDiagnosticTestDataTableQuery,
    useGetDiagnosticTestDetailsQuery,
    useDiagnosticTestAddMutation,
    useDiagnosticTestUpdateMutation,
    useDiagnosticTestDeleteMutation,
} = diagnosticTestApi;
