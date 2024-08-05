const { apiSlice } = require('../api/apiSlice');

const newsLetterApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNewsLetterDataTable: builder.query({
            query: ({ page, limit, search_key }) => ({
                url: `brand/low/stock-list?page=${page}&limit=${limit}&search_key=${search_key}`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
        getAllNewsLetter: builder.query({
            query: () => ({
                url: `newsletter`,
                method: 'GET'
            }),
            transformResponse: (response, meta, arg) => response.data
        }),
    })
});

export const {
    useGetNewsLetterDataTableQuery,
    useGetAllNewsLetterQuery,
} = newsLetterApi;
