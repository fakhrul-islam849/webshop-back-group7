/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch } from 'react-redux';

import {
    FormProvider,
    RHFTextField,
    RHFTextArea, RHFSelect
} from '../../../components/hook-form';
import { useDiagnosticTestUpdateMutation } from '../../../features/diagnostic/diagnosticTestApi';
import { useGetAllDiagnosticGroupQuery } from '../../../features/diagnostic/diagnosticGroupApi';
import { useGetAllDiagnosticCompanyQuery } from '../../../features/diagnostic/diagnosticCompanyApi';
import ToastifyAlert from '../../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS, STATUS_ACTIVE, STATUS_INACTIVE
} from '../../../utils/Constant/globalConstant';
import { renderErrorMessage } from '../../../helper/helperFunction';

import DynamicSelectBox from '../../Autocomplete/DynamicSelectBox';
// ----------------------------------------------------------------------

export default function DiagnosticTestEditForm({ editData }) {
    const { data: diagnosticGroups, isLoading: diagnosticGroupIsLoading } =
        useGetAllDiagnosticGroupQuery();
    const { data: diagnosticCompanies, isLoading: diagnosticCompanyIsLoading } =
        useGetAllDiagnosticCompanyQuery();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [useDiagnosticTestUpdate] = useDiagnosticTestUpdateMutation();
    const newDiagnosticTestSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        price: Yup.number()
            .typeError('Please Provide number value (like: 100, 100.5)')
            .required('Price is required'),
        diagnostic_test_group_id: Yup.number()
            .typeError('Please Select Diagnostic Group')
            .required('Please Select Diagnostic Group'),
        diagnostic_company_id: Yup.number()
            .typeError('Please Select Diagnostic Group')
            .required('Please Select Diagnostic Company'),
        status: Yup.number()
            .typeError('Status Must be a number')
            .required('Please Select Status')
    });

    const defaultValues = useMemo(
        () => ({
            diagnostic_company_id: editData?.diagnostic_company_id,
            diagnostic_test_group_id:
                editData?.diagnostic_test_group_id,
            name: editData?.name,
            price: editData?.price,
            discount: editData?.discount,
            details: editData?.details,
            status: editData?.status || 0,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [editData]
    );

    const methods = useForm({
        resolver: yupResolver(newDiagnosticTestSchema),
        defaultValues
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = methods;

    const values = watch();

    useEffect(() => {
            reset(defaultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editData]);

    // console.log(errors);
    const onSubmit = async (data) => {
        try {
            const newData = {
                diagnostic_company_id: data.diagnostic_company_id,
                diagnostic_test_group_id: data.diagnostic_test_group_id,
                name: data.name,
                price: data.price,
                discount: data.discount,
                details: data.details,
                status: data.status,
                id: editData.id,
            };

            useDiagnosticTestUpdate(newData)
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        reset();
                        ToastifyAlert(response.message, ALERT_TYPE_SUCCESS);
                    } else {
                        ToastifyAlert(response.message, ALERT_TYPE_ERROR);
                    }
                })
                .catch((error) => {
                    ToastifyAlert(
                        error.data.message || 'Sorry API Error',
                        ALERT_TYPE_ERROR
                    );
                });
        } catch (error) {
            ToastifyAlert(
                'Sorry Something Wrong Please Try Again',
                ALERT_TYPE_ERROR
            );
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
                {!diagnosticGroupIsLoading && (
                    <div>
                        <Controller
                            render={({ field }) => (
                                <DynamicSelectBox
                                    options={diagnosticGroups}
                                    selectedValue={null}
                                    addSearchedOption={null}
                                    label='Select Diagnostic Group'
                                    name='diagnostic_test_group_id'
                                    size='small'
                                    register={field}
                                    helperText={renderErrorMessage(
                                        errors.diagnostic_test_group_id,
                                        errors.diagnostic_test_group_id?.message
                                    )}
                                    // placeholder='Please Select Diagnostic Group'
                                />
                            )}
                            name='diagnostic_test_group_id'
                            control={control}
                        />
                    </div>
                )}
                {!diagnosticCompanyIsLoading && (
                    <div>
                        <Controller
                            render={({ field }) => (
                                <DynamicSelectBox
                                    options={diagnosticCompanies}
                                    selectedValue={null}
                                    addSearchedOption={() => console.log('dd')}
                                    label='Diagnostic Company'
                                    name='diagnostic_company_id'
                                    size='small'
                                    register={field}
                                    helperText={renderErrorMessage(
                                        errors.diagnostic_company_id,
                                        errors.diagnostic_company_id?.message
                                    )}
                                />
                            )}
                            name='diagnostic_company_id'
                            control={control}
                        />
                    </div>
                )}
                <div>
                    <RHFTextField
                        name='name'
                        label='Diagnostic Test Name'
                        placeholder='Diagnostic Test Name'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextField
                        name='price'
                        label='Diagnostic Test Price'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextField
                        name='discount'
                        label='Diagnostic Test Discount'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextArea
                        name='details'
                        label='Diagnostic Test Details'
                    />
                </div>
                <div>
                    <RHFSelect
                        name='status'
                        label='Select Status'
                        placeholder='Select Status'
                    >
                        <option value=''>Select Status</option>
                        <option key='1' value={STATUS_ACTIVE}>
                            Active
                        </option>
                        <option key='0' value={STATUS_INACTIVE}>
                            Inactive
                        </option>
                    </RHFSelect>
                </div>
            </div>

            <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
                Submit
            </button>
        </FormProvider>
    );
}
