import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Breadcrum from '../../../components/Breadcrumb/Breadcrum';
import Container from '../../../components/Container';
import DiagnosticEditForm from '../../../components/Diagnostic/DiagnosticTest/DiagnosticEditForm';
import {useGetDiagnosticTestDetailsQuery} from "../../../features/diagnostic/diagnosticTestApi";

function DiagnosticTestEdit() {
    const { id } = useParams();
    const { data, isLoading, isSuccess, isError } =
        useGetDiagnosticTestDetailsQuery(id);
    console.log(data);
    const buttons = () => {
        return (
            <Link to='/diagnostic-test'>
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
        <div>
            {!isLoading && (
                <div className="grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 py-24 px-4 sm:px-4 sm:py-6 lg:max-w-6xl lg:grid-cols-2 lg:px-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Order ID: {data[0]?.order_id}</h2>
                        <p className="mt-4 font-bold">Customer ID</p>
                        <p className="text-gray-500">{data[0]?.user_uuid}</p>
                    </div>
                    <div>
                        <p className="mt-2 text-green-500">Created: {data[0]?.createdAt}</p>
                        <p className="mt-2 text-red-500">Updated: {data[0]?.updatedAt}</p>
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value.brand.name}</td>
                                        <td>{value.quantity}</td>
                                        <td>{value.price}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DiagnosticTestEdit;
