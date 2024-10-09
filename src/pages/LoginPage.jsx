import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from "react";
import {
    Box,
    Card,
    TextField,
    Stack,
    Typography,
    CardContent,
    Paper,
    Button,
    InputAdornment,
    IconButton,
    debounce,
    CircularProgress
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../store/globalStore";
import { UserContext } from '../context/userContext'
import { BookContext } from '../context/bookContext';


const LoginPage = () => {
    const { getBooks } = useContext(BookContext)
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const openSnackbar = useGlobalStore((state) => state.openSnackbar)
    const setOpenSnackbar = useGlobalStore((state) => state.setOpenSnackbar)
    const setSnackbarMessage = useGlobalStore((state) => state.setSnackbarMessage)
    const setSnackbarSeverity = useGlobalStore((state) => state.setSnackbarSeverity)

    const [showPassword, setShowPassword] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [buttonHelperText, setButtonHelperText] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const requiredFields = formData.password && formData.username


    const handleFormchange = (event, fieldname) => {
        if (fieldname === 'username') event.target.value = event.target.value.trim()

        setFormData((prev) => {
            return {
                ...prev,
                [fieldname]: event.target.value
            }
        })
    }
    const login = async () => {
        if (!requiredFields) { return setButtonHelperText(true) } else setButtonHelperText(false)
        setLoading(true)
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                })
            })
            const result = await response.json()
            if (response.ok) {
                const user = result.user
                console.log('result', result)
                console.log('response', response)
                setSnackbarMessage(`Welcome back ${user.username}`)
                setSnackbarSeverity('success')
                setOpenSnackbar()
                setUser({
                    username: user.username,
                    id: user.id,
                    fullname: user.fullname,
                    access: user.access,
                    refresh: user.refresh
                })
                localStorage.setItem('access', user.access)
                localStorage.setItem('refresh', user.refresh)
                localStorage.setItem('username', user.username)
                localStorage.setItem('fullname', user.fullname)
                localStorage.setItem('id', user.id)
                getBooks(0, 0, user.id)
                !openSnackbar && navigate('/')
            } else {
                console.log(response)
                setSnackbarMessage(result.error)
                setSnackbarSeverity('error')
                setOpenSnackbar()
            }
            if (result) setLoading(false)
        } catch (error) {
            console.log(error.message)
        }
    }
    useEffect(() => {
        requiredFields && setButtonHelperText(!requiredFields)
        return () => { };
    }, [requiredFields]);

    return (
        <Stack>
            <Box >
                <Typography variant='h5'>
                    Don't have an account yet?.
                </Typography>
                <Link to='/signup'>SIGN UP</Link>
                <Card width='100%'>
                    <CardContent
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "row"
                        }}>
                        <Paper sx={{ width: "50%" }}>
                            <Stack direction='column' p={2} spacing={2}>
                                <Typography>Create an account</Typography>

                                <TextField error={usernameError}
                                    helperText={usernameError ? 'Username unavailable' : ''}
                                    value={formData.username} onChange={(e) => handleFormchange(e, 'username')} required label='username' />

                                <TextField required
                                    onChange={(e) => handleFormchange(e, 'password')}
                                    value={formData.password}
                                    error={passwordError}
                                    label='Password' type={showPassword ? 'text' : 'password'}
                                    helperText={passwordError ? 'Password should match' : ''}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                    {showPassword ? (<Visibility />) : (<VisibilityOff />)}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Stack direction='row' spacing={2}>
                                    <Button variant='outlined' onClick={login}>
                                        Login
                                        {loading && <CircularProgress size={16} />}
                                    </Button>
                                    <Typography sx={{ display: buttonHelperText ? 'inline' : 'none' }} > fill in all required fields  </Typography>
                                </Stack>
                            </Stack>
                        </Paper>
                    </CardContent>
                </Card>
            </Box>
        </Stack>
    );
}

export default LoginPage;
