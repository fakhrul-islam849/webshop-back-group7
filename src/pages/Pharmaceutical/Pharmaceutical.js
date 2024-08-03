import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import PharmaceuticalList from '../../components/Pharmaceutical/PharmaceuticalList';

function Pharmaceutical() {
    const buttons = () => {
        return (
            <Link to='/pharmaceutical/add'>
                <button
                    type='button'
                    className='py-2 px-3 text-md font-medium text-center text-white bg-primary-600 rounded-md hover:bg-blue-700 focus:ring-4  focus:ring-blue-300'
                >
                    Add Category
                </button>
            </Link>
        );
    };
    return (
        <>
            <Breadcrum headerText='Category List' button={buttons} />
            <Container>
                <PharmaceuticalList />
            </Container>
        </>
    );
}

export default Pharmaceutical;
