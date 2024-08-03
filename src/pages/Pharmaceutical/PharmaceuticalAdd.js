import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import PharmaceuticalAddForm from '../../components/Pharmaceutical/PharmeceuticalAddForm';

function Pharmaceutical() {
    const buttons = () => {
        return (
            <Link to='/pharmaceutical'>
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
            <Breadcrum headerText='Category Add' button={buttons} />
            <Container>
                <PharmaceuticalAddForm />
            </Container>
        </>
    );
}

export default Pharmaceutical;
