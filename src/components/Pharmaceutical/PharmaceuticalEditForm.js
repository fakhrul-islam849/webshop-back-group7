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
    RHFTextField,
    RHFTextArea, RHFSelect
} from '../../components/hook-form';
import { usePharmaceuticalUpdateMutation } from '../../features/medicine/pharmaceuticalApi';
import ToastifyAlert from '../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS, STATUS_ACTIVE, STATUS_INACTIVE
} from '../../utils/Constant/globalConstant';
import { baseStyle, image, thumb, thumbInner } from '../ImageStyle';
import { useDropzone } from 'react-dropzone';
// ----------------------------------------------------------------------

PharmaceuticalEditForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object
};

export default function PharmaceuticalEditForm({ isEdit, currentUser, data }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const pharmaceuticalId = data.id;
    const [usePharmaceuticalUpdate] = usePharmaceuticalUpdateMutation();
    const newPharmaceuticalSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().nullable(true),
        established: Yup.number().nullable(true),
        market_share: Yup.number().nullable(true),
        growth: Yup.number().nullable(true),
        headquarter: Yup.string().nullable(true),
        location: Yup.string().nullable(true),
        contact_details: Yup.string().nullable(true),
        fax: Yup.string().nullable(true),
        status: Yup.number().nullable(true),
    });

    const defaultValues = useMemo(
        () => ({
            name: data?.name || data.name,
            description: data?.description || data.description,
            established: data?.established || 0,
            market_share: data?.market_share || 0,
            growth: data?.growth || 0,
            headquarter: data?.headquarter || data.headquarter,
            location: data?.location || data.location,
            contact_details: data?.contact_details || data.contact_details,
            fax: data?.fax || data.fax,
            old_logo: data?.logo || data.logo,
            status: data?.status || data.status,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentUser]
    );

    const methods = useForm({
        resolver: yupResolver(newPharmaceuticalSchema),
        defaultValues
    });

    const {
        reset,
        register,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: { isSubmitting, errors }
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
            const formData = new FormData();
            formData.append('logo', files[0]);
            formData.append('old_logo', data.old_logo);
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('established', data.established);
            formData.append('market_share', data.market_share);
            formData.append('growth', data.growth);
            formData.append('headquarter', data.headquarter);
            formData.append('contact_details', data.contact_details);
            formData.append('fax', data.fax);
            formData.append('status', data.status);
            usePharmaceuticalUpdate({data: formData, id: pharmaceuticalId})
                .unwrap()
                .then((response) => {
                    if (response.status) {
                        reset();
                        setFiles([]);
                        ToastifyAlert(response.message, ALERT_TYPE_SUCCESS);
                    } else {
                        ToastifyAlert(response.message, ALERT_TYPE_ERROR);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    ToastifyAlert(
                        'Sorry Something Wrong Please Try Again',
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

    //------------------- image handle function ----------------------
    const [files, setFiles] = useState([]);
    const [erros, setErrors] = useState('');

    const onDrop = useCallback((acceptedFiles, fileRejections) => {
        fileRejections.forEach((file) => {
            if (file.err === 'file-too-large') {
                ToastifyAlert(
                    'Rejected!! Image is more than 100 KB',
                    ALERT_TYPE_ERROR
                );
            }

            if (file.err === 'file-invalid-type') {
                ToastifyAlert(
                    'Rejected!! Image is more than 100 KB',
                    ALERT_TYPE_ERROR
                );
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
        }
    });
    //------------------- image handle function ----------------------

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-6 mb-6 md:grid-cols-2'>
                <div>
                    <section>
                        <div {...getRootProps({ style })}>
                            <input
                                {...register('image_file', { required: false })}
                                {...getInputProps()}
                            />
                            <div>Drag and drop Pharmaceutical Logo.</div>
                            <em>Max Size: 100KB, Resolution: based on logo</em>
                        </div>
                        <aside>{thumbs}</aside>
                    </section>
                </div>
                <div>
                    <RHFTextField
                        name='name'
                        label='Pharmaceutical Name'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextArea
                        name='description'
                        label='Description'
                        required={true}
                    />
                </div>
                <div>
                    <RHFTextField name='established' label='Established' />
                </div>
                <div>
                    <RHFTextField name='market_share' label='Market Share' />
                </div>
                <div>
                    <RHFTextField name='growth' label='Growth' />
                </div>
                <div>
                    <RHFTextField name='headquarter' label='Headquarter' />
                </div>
                <div>
                    <RHFTextField name='location' label='Location' />
                </div>
                <div>
                    <RHFTextField
                        name='contact_details'
                        label='Contact Details'
                    />
                </div>
                <div>
                    <RHFTextField name='fax' label='Fax' />
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
