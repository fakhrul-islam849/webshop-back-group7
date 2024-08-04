const { apiSlice } = require('../api/apiSlice');

const diagnosticCompanyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDiagnosticCompanyDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `diagnostic-company/data-table?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            providesTags:['diagnosticCompany'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getAllDiagnosticCompany: builder.query({
            query: () => ({
                url: `diagnostic-company`,
                method: 'GET'
            }),
            providesTags:['diagnosticCompany'],
            transformResponse: (response, meta, arg) => response.data
        }),
        getDiagnosticCompanyDetails: builder.query({
            query: (id) => ({
                url: `diagnostic-company/details/${id}`,
                method: 'GET'
            }),
            providesTags:['diagnosticCompanyUpdate'],
            transformResponse: (response, meta, arg) => response.data
        }),
        diagnosticCompanyAdd: builder.mutation({
            query: (data) => ({
                url: `diagnostic-company`,
                method: 'POST',
                body: data
            }),
            invalidatesTags:['diagnosticCompany'],
            transformResponse: (response, meta, arg) => response
        }),
        diagnosticCompanyUpdate: builder.mutation({
            query: (data) => ({
                url: `diagnostic-company/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags:['diagnosticCompanyUpdate'],
            transformResponse: (response, meta, arg) => response
        }),
        diagnosticCompanyDelete: builder.mutation({
            query: (id) => ({
                url: `diagnostic-company/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:['diagnosticCompany'],
            transformResponse: (response, meta, arg) => response
        })
    })
});

export const {
    useGetDiagnosticCompanyDataTableQuery,
    useGetAllDiagnosticCompanyQuery,
    useGetDiagnosticCompanyDetailsQuery,
    useDiagnosticCompanyAddMutation,
    useDiagnosticCompanyUpdateMutation,
    useDiagnosticCompanyDeleteMutation,
} = diagnosticCompanyApi;
