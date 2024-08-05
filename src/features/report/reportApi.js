const { apiSlice } = require('../api/apiSlice');

const reportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStat: builder.query({
            query: () => ({
                url: `/report/dashboard-stat`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getAllBlogs: builder.query({
            query: () => ({
                url: `/report/get-all-blogs`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getAllBrand: builder.query({
            query: () => ({
                url: `/report/get-all-brands`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        visitorReport: builder.mutation({
            query: (data) => ({
                url: `/report/visitor-report`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response
        }),
        visitorReportGraph: builder.mutation({
            query: (data) => ({
                url: `/report/visitor-graph`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response
        }),
        advertiserReport: builder.mutation({
            query: (data) => ({
                url: `report/advertiser-report`,
                method: 'POST',
                body: data
            }),
            transformResponse: (response, meta, arg) => response
        }),
        getAllAdvertiser: builder.query({
            query: () => ({
                url: `/report/all-advertiser`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        })
    })
});

export const {
    useGetDashboardStatQuery,
    useGetAllBlogsQuery,
    useGetAllBrandQuery,
    useVisitorReportMutation,
    useVisitorReportGraphMutation,
    useGetAllAdvertiserQuery,
    useAdvertiserReportMutation
} = reportApi;
