import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'
import { Button, Grid, IconButton, Modal } from '@mui/material';
import { Box } from '@mui/system';
import ArrowCircleLeftTwoToneIcon from '@mui/icons-material/ArrowCircleLeftTwoTone';
import { useNavigate } from 'react-router-dom';
import ModalEditBook from '../../components/modal/modalEditBook';
import ModalDeleteBook from '../../components/modal/modalDeleteBook';
function Detail(props) {
    const navigate = useNavigate();
    const { id } = useParams()
    const [book, setBook] = useState([])
    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3003/books/${id}`)
            setBook(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    let idBuku = id
    let urlImage = book?.urlImage
    let textNama = book?.nama
    let textDeskripsi = book?.deskripsi

    const handleBalik = () => {
        navigate('/');
    }

    //handleopenEdit
    const [openEdit, setOpenEdit] = useState(false)
    const handleOpenEdit = () => {
        setOpenEdit(true)
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    //handleOpenDelete
    const [openDelete, setOpenDelete] = useState(false)
    const handleOpenDelete = () => {
        setOpenDelete(true)
    }
    const handleCloseDelete = () => {
        setOpenDelete(false)
    }
    return (

        <div className="container">
            <Grid xs={12}>
                <ArrowCircleLeftTwoToneIcon
                    onClick={handleBalik}
                    style={{
                        marginTop: '2%',
                        marginLeft: '15px',
                        width: '200px',
                        height: '150px',
                        position: 'relative',
                        zIndex: '1001',
                        // borderRadius: '150px',
                    }} />
                <Typography
                    onClick={handleOpenEdit}
                    variant="h2"
                    style={{
                        position: 'relative',
                        zIndex: '1001',
                        marginTop: '-9%',
                        marginLeft: '90%',
                        textAlign: 'right',
                        color: '#000',
                        right: '12%',
                        width: '150px'
                        
                    }} >  Edit</Typography>
                    <Typography
                    onClick={handleOpenDelete}
                    variant="h2"
                    style={{
                        position: 'relative',
                        zIndex: '1001',
                        textAlign: 'right',
                        color: '#000',
                        marginTop: '-3.3%',
                        right: '2%',
                        marginLeft: '90%',
                        width: '150px'
                        
                    }} >  Delete</Typography>
                <Box
                    component="img"
                    sx={{
                        position: 'absolute',
                        left: '0%',
                        marginTop: '-10%',
                        height: '50vh',
                        width: '100%',
                        objectFit: 'cover'
                    }}
                    alt="Image Cant Be Displayed"
                    src={urlImage}
                />
            </Grid>
            <Grid xs={12} style={{ position: 'inherit', marginTop: '20%' }}>
                <Typography variant="h5" color="initial"
                    style={{
                        marginLeft: '6%',
                        backgroundColor: '#FBCC38',
                        width: '5%',
                        borderRadius: '6px',
                        textAlign: 'center',
                        color: 'white'
                    }}>
                    Novel
                </Typography>
                <Grid container spacing={1}>
                    <Grid xs={4}>
                        <Typography variant="h1" color="initial"
                            style={{
                                marginTop: '10px',
                                marginLeft: '20%',
                                borderRadius: '6px',
                                fontWeight: 'bolder',
                                width: '150%'
                            }}>
                            {textNama}
                        </Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Typography variant="h3" color="initial"
                            style={{
                                marginTop: '10px',
                                marginLeft: '79%',
                                borderRadius: '6px',
                                fontWeight: 'bolder',
                                color: '#99D815'
                            }}>
                            Available
                        </Typography>
                    </Grid>
                    <Grid xs={4}>
                        <Box
                            component="img"
                            sx={{
                                position: 'absolute',
                                marginTop: '-15%',
                                marginLeft: '10%',
                                borderRadius: '20px',
                                border: '8px',
                                width: '400px',
                                height: '550px',
                                zIndex: '1001'
                            }}
                            alt="Image Cant Be Displayed"
                            src={urlImage}
                        />
                    </Grid>
                </Grid>
                <Typography variant="h4" color="initial"
                    style={{
                        marginTop: '2px',
                        marginLeft: '6%',
                        borderRadius: '6px',
                    }}>
                    30 Juni 2019
                </Typography>
                <Typography variant="h5" color="initial"
                    style={{
                        marginTop: '30px',
                        marginLeft: '6%',
                        borderRadius: '6px',
                        width: '65%'
                    }}>
                    {textDeskripsi}
                </Typography>
            </Grid>
            <Button style={{ backgroundColor : '#F4CF5D' , width: '10%', height: '100%', right: '-80%', marginTop: '5%' }} variant="contained" size="large" >
                            <Typography variant="h6" color="#fff">
                                Borrow
                            </Typography>
                        </Button>
            <ModalEditBook open={openEdit} handleClose={handleCloseEdit} urlImage={urlImage} textNama={textNama} textDeskripsi={textDeskripsi} idBuku={idBuku}/>
            <ModalDeleteBook open={openDelete} handleClose={handleCloseDelete} urlImage={urlImage} textNama={textNama} textDeskripsi={textDeskripsi} idBuku={idBuku}/>
        </div>
    )
}

export default Detail
