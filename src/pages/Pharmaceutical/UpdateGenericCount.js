import React from 'react';
import Container from '../../components/Container';
import { useUpdatePharmaceuticalGenericCountQuery } from '../../features/medicine/pharmaceuticalApi';

function UpdateGenericCount() {
    const { data, isLoading, isSuccess, isError } = useUpdatePharmaceuticalGenericCountQuery();

    return (
        <>
            <Container>
                {!isLoading && isSuccess ?(
                        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                             role="alert">
                            <p className="font-bold">Updated</p>
                            <p className="text-sm">Successfully Update Generic count in Pharmaceutical.</p>
                        </div>

                ) : (
                    <div role="alert">
                        <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Please Wait 30 sec, Or Success Message
                        </div>
                        <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <p>Data is Updating.</p>
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
}

export default UpdateGenericCount;

