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
import { Link } from 'react-router-dom'
import { BookContext } from "../context/bookContext";

const SignUp = () => {
  const { setUser } = useContext(UserContext)
  const { getBooks } = useContext(BookContext)
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
    fullname: '',
    username: '',
    password: '',
    verifyPassword: ''
  })
  const requiredFields = formData.fullname && formData.password && formData.verifyPassword && formData.username

  let controller = new AbortController()
  let signal = controller.signal
  signal.addEventListener('abort', () => console.log('abort'))

  const handleFormchange = (event, fieldname) => {
    if (fieldname === 'username') event.target.value = event.target.value.trim()

    setFormData((prev) => {
      return {
        ...prev,
        [fieldname]: event.target.value
      }
    })
  }

  const checkuserName = async (username) => {
    username = username.trim()
    if (username == '') return false
    try {
      const response = await fetch(`http://localhost:8000/usernamecheck/${username}`, { signal })
      const result = await response.json()

      if (result.available) setUsernameError(true)
      else setUsernameError(false)

    } catch (error) {
      if (error.name == 'AbortError') console.log('Fetch aborted')
      else {
        console.log(error)
      }
    }
  }
  const register = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8000/register', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          fullname: formData.fullname,
          password: formData.password
        })
      })
      const result = await response.json()
      if (response.ok) {
        const user = result.user
        console.log('result', result)
        console.log('response', response)
        setSnackbarMessage(`Successfullly created user ${user.username}`)
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
    debounce(checkuserName(formData.username), 5000)
    return () => {
      controller.abort()
    };
  }, [formData.username]);

  useEffect(() => {
    const verifyPassword = () => {
      if (formData.password === '' || formData.verifyPassword === '') {
        setPasswordError(false)
      } else if (formData.password === formData.verifyPassword) {
        setPasswordError(false)
      } else {
        setPasswordError(true)
      }
    }
    debounce(verifyPassword(), 4000)
    return () => { };
  }, [formData.password, formData.verifyPassword]);

  useEffect(() => {
    requiredFields && setButtonHelperText(!requiredFields)
    return () => { };
  }, [requiredFields]);

  return (
    <Stack>
      <Box >
        <Typography variant='h5'>
          Got an account ?{" "}
          <Link to='/login'>Log in</Link>
        </Typography>
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

                <TextField value={formData.fullname} onChange={(e) => handleFormchange(e, 'fullname')} required label='Full name' />
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
                <TextField required
                  onChange={(e) => handleFormchange(e, 'verifyPassword')}
                  error={passwordError}
                  helperText={passwordError ? 'Password should match' : formData.password.length == 0 || formData.verifyPassword.length == 0 ? '' : 'Password matches'}
                  value={formData.verifyPassword} label='Verify password' type={showPassword ? 'text' : 'password'}
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
                  <Button variant='outlined'
                    disabled={passwordError || usernameError || loading ? true : false}
                    onClick={() => {
                      !requiredFields && setButtonHelperText(!requiredFields)
                      if (requiredFields) {
                        register()
                      }
                    }}
                    sx={{}}
                  >
                    Sign in
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
  )
};

export default SignUp;
