import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Button } from '@mui/material'

export const RLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'white'
}))