import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrum from '../../../components/Breadcrumb/Breadcrum';
import Container from '../../../components/Container';
import DiagnosticTestList from '../../../components/Diagnostic/DiagnosticTest/DiagnosticTestList';

function DiagnosticTest() {
    const buttons = () => {
        return (
            <Link to='/diagnostic-test-add'>
                <button
                    type='button'
                    className='py-2 px-3 text-md font-medium text-center text-white bg-primary-600 rounded-md hover:bg-blue-700 focus:ring-4  focus:ring-blue-300'
                >
                    Add Diagnostic Test
                </button>
            </Link>
        );
    };
    return (
        <>
            <Breadcrum headerText='Order List' />
            <Container>
                <DiagnosticTestList />
            </Container>
        </>
    );
}

export default DiagnosticTest;
