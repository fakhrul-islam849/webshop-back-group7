import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import NewsLetterList from '../../components/NewsLetter/NewsLetterList';
import { CSVLink } from 'react-csv';
import { useGetAllNewsLetterQuery } from '../../features/frontElement/newsLetterApi';
function NewsLetter() {
    const { data, isLoading, isSuccess, isError } = useGetAllNewsLetterQuery();

    const buttons = () => {
        return (
            <>
                {!isLoading && (
                    <CSVLink
                        filename={`newsletters.csv`}
                        data={data}
                        style={{ textDecoration: 'none' }}
                    >
                        <button
                            type='button'
                            disabled={data?.length <= 0}
                            className='py-2 px-3 text-md font-medium text-center text-white bg-primary-600 rounded-md hover:bg-amber-500 focus:ring-4  focus:ring-red-300'
                        >
                            Download CSV
                        </button>
                    </CSVLink>
                )}
            </>
        );
    };
    return (
        <>
            <Breadcrum headerText='Low Stock list' button={buttons} />
            <Container>
                <NewsLetterList />
            </Container>
        </>
    );
}

export default NewsLetter;
