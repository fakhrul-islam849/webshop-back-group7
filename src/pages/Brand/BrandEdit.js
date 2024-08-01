import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import BrandEditForm from '../../components/Brand/BrandEditForm';
import { useGetBrandDetailsQuery } from '../../features/medicine/brandApi';

function BrandEdit() {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetBrandDetailsQuery(id);
    const buttons = () => {
        return (
            <Link to='/brand'>
                <button
                    type='button'
                    className='py-2 px-3 text-md font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4  focus:ring-red-300'
                >
                    Back
                </button>
            </Link>
        );
    };
    return (
        <>
            <Breadcrum headerText='Brand Edit' button={buttons} />
            <Container>
                {!isLoading && isSuccess && <BrandEditForm data={data} />}
            </Container>
        </>
    );
}

export default BrandEdit;
