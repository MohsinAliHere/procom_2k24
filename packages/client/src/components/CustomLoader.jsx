import { Stack } from '@mui/material'
import React from 'react'
import LoadingImg from "../assets/loadingImg.gif"
const CustomLoader = () => {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" sx={{ height: "100vh" }} >
            <img src={LoadingImg} alt="loader" />
        </Stack>
    )
}

export default CustomLoader