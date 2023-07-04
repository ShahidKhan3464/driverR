import React, { useState } from 'react';
import ApiClient from 'api';
import { Form } from "antd";
import { Formik, } from "formik";
import Dialog from 'components/dialog';
import { StyledGeneral } from './style';
import EmailContent from './EmailContent';
import { useGlobalContext } from 'contextApi';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'components/sweetAlert';
import PasswordContent from './PasswordContent';
import TextField from '@mui/material/TextField';
import ImageUploading from "react-images-uploading";
import { primaryBlue, grey300 } from 'components/globaStyle';
import CircularProgress from '@mui/material/CircularProgress';

const Index = () => {
    const api = new ApiClient()
    const navigate = useNavigate()
    const [image, setImage] = useState(null)
    const { logo, getLogo } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [email, setEmail] = useState(localStorage.getItem('email'))

    const passwordContent = () => {
        return (
            <React.Fragment>
                <div className='text'>
                    <h3>Update email</h3>
                    <p>To change your email enter your current password</p>
                </div>
                <PasswordContent setDialogOpen={setDialogOpen} setDialogType={setDialogType} />
            </React.Fragment>
        )
    }

    const emailContent = () => {
        return (
            <React.Fragment>
                <div className='text'>
                    <h3>Update email</h3>
                    <p style={{ padding: '0 90px' }}>Enter your new email</p>
                </div>
                <EmailContent setDialogOpen={setDialogOpen} setEmail={setEmail} />
            </React.Fragment>
        )
    }

    const handleSubmit = async () => {
        const file = image[0].file
        const formData = new FormData()
        formData.append('image', file)

        try {
            setLoading(true)
            const url = '/image/upload' + (logo ? `?previousImage=${logo}` : '')
            const response = await api.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.status) {
                try {
                    const additionalResponse = await api.post('/super-admin/add-logo', { logo: response.data.result.data })
                    if (additionalResponse.data.status) {
                        SweetAlert('success', 'Success', 'Logo has been uploaded Successfully')
                        getLogo()
                        setImage(null)
                        setLoading(false)
                    }
                }
                catch (error) {
                    setLoading(true)
                    const tokenExpired = error.response?.data.message
                    if (tokenExpired === 'Token expired, access denied') {
                        localStorage.clear()
                        navigate("/")
                        return
                    }
                    SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
                    setLoading(false)
                }
                return
            }
            setLoading(false)
            SweetAlert('error', 'Warning!', response.data.message)
        }
        catch (error) {
            setLoading(true)
            const tokenExpired = error.response?.data.message
            if (tokenExpired === 'Token expired, access denied') {
                localStorage.clear()
                navigate("/")
                return
            }
            SweetAlert('error', 'Error!', 'Something went wrong. Please try again')
            setLoading(false)
        }
    }

    return (
        <StyledGeneral>
            {dialogOpen &&
                <Dialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    content={dialogType === 'password' ? passwordContent() : dialogType === 'email' && emailContent()}
                />
            }
            <Formik
                initialValues={{ '': '' }}
                onSubmit={handleSubmit}
            >
                {(formik) => {
                    return (
                        <Form
                            noValidate
                            name='basic'
                            autoComplete='off'
                            onFinish={formik.handleSubmit}
                        >
                            <div className='field-control'>
                                <ImageUploading
                                    value={image}
                                    dataURLKey="data_url"
                                    acceptType={['png', 'jpg', 'jpeg', 'svg']}
                                    onChange={(imageList) => setImage(imageList)}
                                >
                                    {({ imageList, onImageUpload, onImageUpdate, onImageRemove }) => (
                                        <div className="upload__image-wrapper">
                                            {imageList.length === 0 && (
                                                <button
                                                    type='button'
                                                    onClick={onImageUpload}
                                                >
                                                    Upload logo
                                                </button>
                                            )}
                                            {imageList.length === 0 ? (
                                                <div className='upload-image'>
                                                    <span>Logo</span>
                                                </div>
                                            ) : (
                                                imageList?.map((image, index) => (
                                                    <div key={index} className="image-item">
                                                        <div className='image-shown'>
                                                            <img src={image.data_url} alt="logo" width="100" />
                                                        </div>
                                                        <div className="image-item__btn-wrapper">
                                                            <button type='button' onClick={() => onImageUpdate(index)}>Change photo</button>
                                                            <button type='button' onClick={() => onImageRemove(index)}>Remove photo</button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>

                            <div className='disabled-field'>
                                <TextField
                                    disabled
                                    fullWidth
                                    label="Email"
                                    value={email}
                                    sx={{
                                        '& .Mui-disabled': {
                                            fontWeight: 400,
                                            fontStyle: 'normal',
                                            cursor: 'not-allowed',
                                            fontFamily: 'SF Pro Text',
                                        },
                                        '& .MuiOutlinedInput-input': {
                                            fontWeight: 400,
                                            fontSize: '16px',
                                            color: '#49454F',
                                            lineHeight: '24px',
                                            fontStyle: 'normal',
                                            letterSpacing: '0.5px',
                                            fontFamily: 'SF Pro Text',
                                            '@media screen and (max-width: 520px)': {
                                                fontSize: '14px',
                                            }
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset legend': {
                                                width: "6.5%"
                                            }
                                        }
                                    }}
                                />

                                <button
                                    type='button'
                                    className='update-email-btn'
                                    onClick={() => {
                                        setDialogOpen(true)
                                        setDialogType('password')
                                    }}
                                >
                                    Update email
                                </button>
                            </div>

                            <div className='btn-container'>
                                <button type='button' className='cancel-btn'>Cancel</button>
                                <button
                                    type='submit'
                                    className='save-btn'
                                    disabled={!image || !image.length}
                                    style={{
                                        width: '119px',
                                        cursor: !image || !image.length ? 'auto' : 'pointer',
                                        color: !image || !image.length ? '#FFFFFF' : '#F9FAFB',
                                        background: !image || !image.length ? grey300 : primaryBlue
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress
                                            size={22}
                                            color='inherit'
                                        />
                                    ) : (
                                        <span>Save changes</span>
                                    )}
                                </button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </StyledGeneral>
    )
}

export default Index