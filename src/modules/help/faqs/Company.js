import React, { useState } from 'react';
import EditDialog from '../Dialog';
import MenuList from 'components/menuList';
import { StyledAccordion } from '../style';
import Dialog from 'components/dialog';
import CircularProgress from '@mui/material/CircularProgress';

const Index = ({ faqs, value, getData, loading, handleDeleteFaqs }) => {
    const [id, setId] = useState(null)
    const [activeItem, setActiveItem] = useState(null)
    const [dialogType, setDialogType] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)

    const options = [
        { icon: '/images/edit.svg', text: 'Edit' },
        { icon: '/images/delete-icon.svg', text: 'Delete' },
    ]

    const toggleAccordion = (id) => {
        setActiveItem((prevActiveItem) => (prevActiveItem === id ? null : id))
    }

    const deleteContent = () => {
        return (
            <React.Fragment>
                <div className='delete-icon'>
                    <img src='/images/delete-icon.svg' alt='delete-icon' />
                </div>

                <div className='text'>
                    <h3 style={{ color: '#EF4444' }}>Delete!</h3>
                    <p>Are you sure you want to delete this “FAQ”?</p>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='cancel-btn'
                        onClick={() => setDialogOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className='delete-btn'
                        type='button'
                        onClick={() => {
                            setDialogOpen(false)
                            handleDeleteFaqs(id)
                        }}>
                        Delete
                    </button>
                </div>
            </React.Fragment>
        )
    }

    const handleTableMenu = (id, userId, status, option) => {
        if (option === 'Edit') {
            setId(id)
            setDialogOpen(true)
            setDialogType('edit')
        }

        else if (option === 'Delete') {
            setId(id)
            setDialogOpen(true)
            setDialogType('delete')
        }
    }

    return (
        <React.Fragment>
            {dialogOpen && (
                dialogType === 'delete' ? (
                    <Dialog
                        open={dialogOpen}
                        setOpen={setDialogOpen}
                        content={deleteContent()}
                    />
                )
                    : dialogType === 'edit' && (
                        <EditDialog
                            id={id}
                            faqs={faqs}
                            value={value}
                            open={dialogOpen}
                            getData={getData}
                            dialogType={dialogType}
                            setOpen={setDialogOpen}
                        />
                    )
            )}
            <StyledAccordion activeItem={activeItem}>
                {loading ? (
                    <div className='loader'>
                        <CircularProgress color="inherit" />
                    </div>
                ) : faqs?.map((faq) => {
                    return (
                        <div key={faq._id} className={`accordion ${activeItem === faq._id ? 'active' : ''}`}>
                            <div className='accordion_question' onClick={() => toggleAccordion(faq._id)}>
                                <h3>{faq.question}</h3>
                                <div className='btns'>
                                    <button>
                                        <img src='/images/accordion.svg' alt='accordion' />
                                    </button>
                                    <MenuList
                                        id={faq._id}
                                        options={options}
                                        handleTableMenu={handleTableMenu}
                                    />
                                </div>
                            </div>
                            <div className="accordion_answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    )
                })}
            </StyledAccordion>
        </React.Fragment>
    )
}

export default Index