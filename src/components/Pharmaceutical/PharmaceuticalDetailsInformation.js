import React, { useState } from 'react';
import { useGetPharmaceuticalDetailsQuery } from '../../features/medicine/pharmaceuticalApi';
import { useParams } from 'react-router-dom';

function PharmaceuticalDetailsInformation() {
    const { id } = useParams();

    const { data, isLoading, isSuccess, isError } =
        useGetPharmaceuticalDetailsQuery(id);
    return (
        <div>
            {!isLoading && (
            <div className="grid max-w-2xl grid-cols-1 gap-y-10 gap-x-8 py-24 px-4 sm:px-4 sm:py-6 lg:max-w-6xl lg:grid-cols-2 lg:px-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{data.name}</h2>
                    <p className="mt-4 text-gray-500">
                        <div
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        >
                        </div>
                    </p>
                    <p className="mt-4 font-bold">Headquarter</p>
                    <p className="text-gray-500">{data.headquarter}</p>
                    <p className="mt-4 font-bold">Location</p>
                    <p className="text-gray-500 text-clip overflow-hidden ...">
                        <div> {data.location}</div>
                    </p>
                </div>
                <div>
                    <p className="mt-2 text-green-500">Created: {data.createdAt}</p>
                    <p className="mt-2 text-red-500">Updated: {data.updatedAt}</p>
                    {data.logo && (
                        <img
                        src={process.env.REACT_APP_ROOT+data.logo}
                        alt="Pharmaceutical Logo"
                        className="rounded bg-gray-100"
                        />
                    )}
                    <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 sm:gap-y-4 lg:gap-x-8">
                        <div key="Market Share" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Market Share</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.market_share}</dd>
                        </div>
                        <div key="Established" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Established</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.established}</dd>
                        </div>
                        <div key="Growth" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Growth</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.growth}</dd>
                        </div>
                        <div key="Total Generics" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Total Generics</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.total_generics}</dd>
                        </div>
                        <div key="Total Brand" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Total Brand</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.total_brand}</dd>
                        </div>
                        <div key="Contact Details" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Contact Details</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.contact_details}</dd>
                        </div>
                        <div key="FAX" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">FAX</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.fax}</dd>
                        </div>
                        <div key="Status" className="border-t border-gray-200 pt-4">
                            <dt className="font-medium text-gray-900">Status</dt>
                            <dd className="mt-2 text-sm text-gray-500">{data.status === 1 ? 'Active' : 'Inactive'}</dd>
                        </div>
                    </dl>
                </div>
            </div>
            )}
        </div>
    );
}

export default PharmaceuticalDetailsInformation;
