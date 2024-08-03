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
    RHFTextArea
} from '../../components/hook-form';
import { usePharmaceuticalAddMutation } from '../../features/medicine/pharmaceuticalApi';
import ToastifyAlert from '../../helper/ToastifyAlert';
import {
    ALERT_TYPE_ERROR,
    ALERT_TYPE_SUCCESS
} from '../../utils/Constant/globalConstant';
import { baseStyle, image, thumb, thumbInner } from '../ImageStyle';
import { useDropzone } from 'react-dropzone';
// ----------------------------------------------------------------------

PharmaceuticalAddForm.propTypes = {
    isEdit: PropTypes.bool,
    currentUser: PropTypes.object
};

export default function PharmaceuticalAddForm({ isEdit, currentUser }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [usePharmaceuticalAdd] = usePharmaceuticalAddMutation();
    const newPharmaceuticalSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().nullable(true),
    });

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            description: currentUser?.description || '',
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
            console.log(data, 'data');

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            usePharmaceuticalAdd(formData)
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
                    ToastifyAlert(
                        error.data.message || 'Sorry Something Wrong Please Try Again',
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
                    <RHFTextField
                        name='name'
                        label='Category Name'
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
