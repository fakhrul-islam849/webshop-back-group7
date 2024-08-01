import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from '../../components/Breadcrumb/Breadcrum';
import Container from '../../components/Container';
import BrandList from '../../components/Brand/BrandList';

function Brand() {
    const buttons = () => {
        return (
            <Link to='/brand-add'>
                <button
                    type='button'
                    className='py-2 px-3 text-md font-medium text-center text-white bg-primary-600 rounded-md hover:bg-blue-700 focus:ring-4  focus:ring-blue-300'
                >
                    Add Brand
                </button>
            </Link>
        );
    };
    return (
        <>
            <Breadcrum headerText='Brand List' button={buttons} />
            <Container>
                <BrandList />
            </Container>
        </>
    );
}

export default Brand;
