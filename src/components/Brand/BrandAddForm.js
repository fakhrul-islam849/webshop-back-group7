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
    RHFTextArea
} from '../../components/hook-form';
import { useBrandAddMutation } from '../../features/medicine/brandApi';
import { useGetAllPharmaceuticalQuery } from '../../features/medicine/pharmaceuticalApi';
import { useGetAllGenericQuery } from '../../features/medicine/genericApi';
import { useGetAllDosageQuery } from '../../features/medicine/dosageApi';
import ToastifyAlert from '../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS, STATUS_INACTIVE
} from '../../utils/Constant/globalConstant';
import {
    STATUS_ACTIVE,
    BRAND_MEDICINE_HUMAN,
    BRAND_MEDICINE_VETERINARY,
    BRAND_MEDICINE_TYPE_ALLOPATHIC,
    BRAND_MEDICINE_TYPE_HERBAL,
    BRAND_MEDICINE_TYPE_SKIN_CARE,
    BRAND_MEDICINE_TYPE_FOOD_SUPPLEMENT,
    BRAND_PRODUCTIVE,
    BRAND_PRESCRIABLE
} from '../../utils/Constant/globalConstant';
import {useDropzone} from "react-dropzone";
import {baseStyle, image, thumb, thumbInner} from "../ImageStyle";

// ----------------------------------------------------------------------

BrandAddForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object
};

export default function BrandAddForm({ isEdit, currentUser }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data: pharmaceuticals, isLoading: pharmaceuticalIsLoading } =
        useGetAllPharmaceuticalQuery();

    const [files, setFiles] = useState([]);
    const [erros, setErrors] = useState('');

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        fileRejections.forEach((file) => {
            if (file.err === 'file-too-large') {
                console.log('file is too large');
            }

            if (file.err === 'file-invalid-type') {
                console.log('file is invalid');
            }
        });
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
        );
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        minSize: 1,
        maxSize: 150000
    });
    const style = useMemo(() => ({
        ...baseStyle
    }));
    const maxSize = 100 * 1000;

    const thumbs = files.map((file, index) => {
        if (file.size <= maxSize) {
            // acceptedImg.push(file)
            // setPic(true)
            return (
                <div style={thumb} key={file.name}>
                    <div style={thumbInner}>
                        <img src={file.preview} style={image} />
                    </div>
                </div>
            );
        } else {
            ToastifyAlert('your file is bigger than 100kb', ALERT_TYPE_ERROR);
            setFiles([]);
        }
    });

    const [useBrandAdd] = useBrandAddMutation();
    const newBrandSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        unit_price: Yup.number()
            .typeError('Unit Price must be a number')
            .required('Unit Price is required'),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            pharmaceutical_id: currentUser?.pharmaceutical_id || '',
            package_info: currentUser?.package_info || null,
            quantity: currentUser?.quantity || null,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(newBrandSchema),
        defaultValues
    });

    const {
        register,
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
            if (!files[0]) {
                ToastifyAlert('Please Select Image', ALERT_TYPE_ERROR);
                return;
            }
            const formData = new FormData();
            formData.append('pharmaceutical_id', data.pharmaceutical_id);
            formData.append('name', data.name);
            formData.append('unit_price', data.unit_price);
            formData.append('quantity', data.quantity);
            formData.append('package_info', data.package_info);
            formData.append('image', files[0]);
            useBrandAdd(formData)
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
                <div>
                    <section>
                        <div {...getRootProps({ style })}>
                            <input
                                {...register('image', { required: false })}
                                name='image'
                                {...getInputProps()}
                            />
                            <div>Drag and drop your images here.</div>
                            <em>Max Size: 100KB, Resolution: 442*280</em>
                        </div>
                        <aside>{thumbs}</aside>
                    </section>
                </div>
                {!pharmaceuticalIsLoading && (
                    <div>
                        <RHFSelect
                            name='pharmaceutical_id'
                            label='Select Category'
                            placeholder='Select Category'
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

                <div>
                    <RHFTextField
                        name='name'
                        label='Product Name'
                        required={true}
                    />
                </div>

                <div>
                    <RHFTextField name='unit_price' label='Unit Price' />
                </div>
                <div>
                    <RHFTextField name='quantity' label='Quantity' />
                </div>
                <div>
                    <RHFTextArea name='package_info' label=' Info' />
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
