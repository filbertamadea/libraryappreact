import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import BaseFormDialog from '../formDialog/BaseFormDialog';
import { Button, Grid, TextField } from '@mui/material';
// import axios from 'axios'

const apiURLbooks = "http://localhost:3003/books"

function ModalAddBook({ open, handleClose }) {
    const [dataBuku, setDataBuku] = useState({ urlImage: null, nama: null, deskripsi: null })
    const handleInputData = (value, key) => {
        setDataBuku({ ...dataBuku, [key]: value })
    }
    const [book, setBook] = useState([])
    const [id, setId] = useState([])
    const getData = async () => {
        try {
            const { data } = await axios.get(`http://localhost:3003/books?_sort=id&_order=desc&_limit=1`)
            setBook(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        setId(book.map(y => parseInt(y.id)))
    },[book])

    let panjangArray = parseInt(id);
    const handleSubmit = () => {
        getData()
        const body = {
            id: panjangArray + 1,
            urlImage: dataBuku.urlImage,
            nama: dataBuku.nama,
            deskripsi: dataBuku.deskripsi
        }
        axios.post(apiURLbooks, body).then((res) => {
            if (res.data.data) {
                window.location.reload(true);
            }
        })
        handleClose();
        refreshPage()
    }
    useEffect(() => {
        setDataBuku({ urlImage: null, nama: null, deskripsi: null })
    }, [handleClose])

    return (
        <div>
            <BaseFormDialog open={open} handleClose={handleClose} title='Add Data' border={false} maxWidth={true}>
                <Grid container style={{ marginTop: '2%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Url Image
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                    <Grid xs={8}>
                        <TextField style={{ width: '100%' }} value={dataBuku.urlImage} onChange={(e) => handleInputData(e.target.value, 'urlImage')} id="outlined-basic" label="Masukan URL Image" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Title
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                    <Grid xs={8}>
                        <TextField style={{ width: '100%' }} value={dataBuku.nama} onChange={(e) => handleInputData(e.target.value, 'nama')} id="outlined-basic" label="Title" variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '5%' }}>
                    <Grid xs={3}>
                        <Typography variant="h4" color="initial">
                            Description
                        </Typography>
                    </Grid>
                    <Grid xs={1}>
                    </Grid>
                    <Grid xs={8}>
                        <TextField
                            style={{ width: '100%' }}
                            id="outlined-multiline-flexible"
                            label="Deskrispi"
                            multiline
                            maxRows={6}
                            value={dataBuku.deskripsi}
                            onChange={(e) => handleInputData(e.target.value, 'deskripsi')}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: '10%' }}>
                    <Grid xs={9}>
                    </Grid>
                    <Grid xs={3}>
                        <Button style={{ backgroundColor: '#FBCC38', width: '80%', height: '100%' }} variant="contained" size="large" onClick={handleSubmit}>
                            <Typography variant="h6" color="#fff">
                                Save
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </BaseFormDialog>
        </div >

    );
}

export default ModalAddBook
