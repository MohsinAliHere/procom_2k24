import { Stack, Typography } from '@mui/material'
import React from 'react'

const TabHeading = ({ heading }) => {
    return (
        <Stack paddingX={4} paddingTop={3} >
            <Typography variant="h5" fontWeight="bold" >{heading}</Typography>
        </Stack>
    )
}

export default TabHeading