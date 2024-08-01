/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-unresolved */
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useDispatch, useSelector } from 'react-redux';

import {
    FormProvider,
    RHFSelect,
    RHFTextField,
    RHFSwitch,
    RHFCheckbox
} from '../../components/hook-form';
import { useBrandUpdateMutation } from '../../features/medicine/brandApi';
import { useGetAllPharmaceuticalQuery } from '../../features/medicine/pharmaceuticalApi';
import { useGetAllGenericQuery } from '../../features/medicine/genericApi';
import { useGetAllDosageQuery } from '../../features/medicine/dosageApi';
import ToastifyAlert from '../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS
} from '../../utils/Constant/globalConstant';
import {
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    BRAND_MEDICINE_HUMAN,
    BRAND_MEDICINE_VETERINARY,
    BRAND_MEDICINE_TYPE_ALLOPATHIC,
    BRAND_MEDICINE_TYPE_HERBAL,
    BRAND_MEDICINE_TYPE_SKIN_CARE,
    BRAND_MEDICINE_TYPE_FOOD_SUPPLEMENT,
    BRAND_PRODUCTIVE,
    BRAND_PRESCRIABLE
} from '../../utils/Constant/globalConstant';

// ----------------------------------------------------------------------

BrandEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object
};

export default function BrandEditForm({ isEdit, currentUser, data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const brandId = data.brand.id;


    const { data: pharmaceuticals, isLoading: pharmaceuticalIsLoading } =
        useGetAllPharmaceuticalQuery();
    const { data: generics, isLoading: genericIsLoading } =
        useGetAllGenericQuery();

    const { data: dosages, isLoading: dosagesIsLoading } =
        useGetAllDosageQuery();

    const [useBrandUpdate] = useBrandUpdateMutation();
    const newBrandSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        strength: Yup.string().required('Strength is required'),
        dosage_type_id: Yup.number()
            .typeError('Dosage must be a number')
            .required('Dosage is required'),
        generic_id: Yup.number()
            .typeError('Generic must be a number')
            .required('Generic is required'),
        pharmaceutical_id: Yup.number()
            .typeError('Pharmaceutical must be a number')
            .required('Pharmaceutical is required'),
        medicine_type: Yup.number()
            .typeError('Medicine Type must be a number')
            .required('Medicine Type is required'),
        medicine_for: Yup.number()
            .typeError('Medicine For must be a number')
            .required('Medicine For is required'),
        current_production: Yup.string().required(
            'Current Production is required'
        ),
        unit_price: Yup.number()
            .typeError('Unit Price must be a number')
            .required('Unit Price is required'),
        status: Yup.number()
            .typeError('Status Price must be a number')
            .required('Status Price is required')
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || data.brand.name,
            strength: currentUser?.strength || data.brand.strength,
            dosage_type_id:
                currentUser?.dosage_type_id || data.brand.dosage_type_id,
            generic_id: currentUser?.generic_id || data.brand.generic_id,
            pharmaceutical_id:
                currentUser?.pharmaceutical_id || data.brand.pharmaceutical_id,
            mfg_id: currentUser?.mfg_id || data.brand.mfg_id,
            medicine_type:
                currentUser?.medicine_type || data.brand.medicine_type,
            medicine_for: currentUser?.medicine_for || data.brand.medicine_for,
            current_production:
                currentUser?.current_production ||
                data.brand.current_production,
            unit_price: currentUser?.unit_price || data.brand.unit_price,
            package_info: currentUser?.package_info || data.brand.package_info,
            package_info2: currentUser?.package_info2 || data.brand.package_info2,
            package_info3: currentUser?.package_info3 || data.brand.package_info3,
            package_info4: currentUser?.package_info4 || data.brand.package_info4,
            package_info5: currentUser?.package_info5 || data.brand.package_info5,
            status: currentUser?.status || data.brand.status,
            innovator: currentUser?.innovator || data.brand.innovator
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(newBrandSchema),
        defaultValues
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentUser) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentUser]);

    const onSubmit = async (data) => {
        try {
            useBrandUpdate({ data, id: brandId })
                .unwrap()
                .then((response) => {
                    if (response.status) {
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
                {!pharmaceuticalIsLoading && (
                    <div>
                        <RHFSelect
                            name='pharmaceutical_id'
                            label='Select Pharmaceutical'
                            placeholder='Select Pharmaceutical'
                        >
                            <option value='' />
                            {pharmaceuticals.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </RHFSelect>
                    </div>
                )}
                {!pharmaceuticalIsLoading && (
                    <div>
                        <RHFSelect
                            name='mfg_id'
                            label='Select Manufacture'
                            placeholder='Select Manufacture'
                        >
                            <option value='' />
                            {pharmaceuticals.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </RHFSelect>
                    </div>
                )}
                {!genericIsLoading && (
                    <div>
                        <RHFSelect
                            name='generic_id'
                            label='Select Generic'
                            placeholder='Select Generic'
                        >
                            <option value='' />
                            {generics.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                    </div>
                )}
                {!dosagesIsLoading && (
                    <div>
                        <RHFSelect
                            name='dosage_type_id'
                            label='Select Dosage'
                            placeholder='Select Dosage'
                        >
                            <option value='' />
                            {dosages.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </RHFSelect>
                    </div>
                )}
                <div>
                    <RHFTextField
                        name='name'
                        label='Brand Name'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextField name='strength' label='Strength' />
                </div>
                <div>
                    <RHFTextField name='unit_price' label='Unit Price' />
                </div>
                <div>
                    <RHFTextField name='package_info' label='Package Info' />
                </div>
                <div>
                    <RHFTextField name='package_info2' label='Package Info 2' />
                </div>
                <div>
                    <RHFTextField name='package_info3' label='Package Info 3' />
                </div>
                <div>
                    <RHFTextField name='package_info4' label='Package Info 4' />
                </div>
                <div>
                    <RHFTextField name='package_info5' label='Package Info 5' />
                </div>
                <div>
                    <RHFSelect
                        name='medicine_type'
                        label='Select Medicine Type'
                        placeholder='Select Medicine Type'
                    >
                        <option value=''>Select Medicine Type</option>
                        <option key='1' value={BRAND_MEDICINE_TYPE_ALLOPATHIC}>
                            Allopathic
                        </option>
                        <option key='2' value={BRAND_MEDICINE_TYPE_HERBAL}>
                            Herbal
                        </option>
                        <option key='3' value={BRAND_MEDICINE_TYPE_SKIN_CARE}>
                            Skin Care
                        </option>
                        <option
                            key='4'
                            value={BRAND_MEDICINE_TYPE_FOOD_SUPPLEMENT}
                        >
                            Food Supplement
                        </option>
                    </RHFSelect>
                </div>
                <div>
                    <RHFSelect
                        name='medicine_for'
                        label='Select Medicine For'
                        placeholder='Select Medicine For'
                    >
                        <option value=''>Select Medicine For</option>
                        <option key='1' value={BRAND_MEDICINE_HUMAN}>
                            Human
                        </option>
                        <option key='2' value={BRAND_MEDICINE_VETERINARY}>
                            Veterinary
                        </option>
                    </RHFSelect>
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
                        <option key='2' value={STATUS_INACTIVE}>
                            Inactive
                        </option>
                    </RHFSelect>
                </div>
                <div>
                    <RHFSelect
                        name='innovator'
                        label='Select Innovator'
                        placeholder='Select Status'
                    >
                        <option key='1' value={STATUS_ACTIVE}>
                            Yes
                        </option>
                        <option key='2' value={STATUS_INACTIVE}>
                            No
                        </option>
                    </RHFSelect>
                </div>
                <div>
                    <RHFSelect
                        name='current_production'
                        label='Select Production'
                        placeholder='Select Production'
                    >
                        <option key='1' value={STATUS_ACTIVE}>
                            Productive
                        </option>
                        <option key='2' value={STATUS_INACTIVE}>
                            Non Productive
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
