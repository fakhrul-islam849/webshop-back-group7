import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import PharmaceuticalEditForm from '../../components/Pharmaceutical/PharmaceuticalEditForm';
import { useGetPharmaceuticalDetailsQuery } from '../../features/medicine/pharmaceuticalApi';

function PharmaceuticalEdit() {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError } = useGetPharmaceuticalDetailsQuery(id);
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
            <Breadcrum headerText='Pharmaceutical Edit' button={buttons} />
            <Container>
                {!isLoading && isSuccess && <PharmaceuticalEditForm data={data} />}
            </Container>
        </>
    );
}

export default PharmaceuticalEdit;

