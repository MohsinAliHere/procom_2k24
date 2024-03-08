import { Box, Chip, Stack, Typography, colors } from '@mui/material'
import React from 'react'

const CustomBox = ({ color, heading, chipText, payment }) => {
  return (
    <>
      <Stack sx={{
        height: "150px",
        width: "250px",
        backgroundColor: color,
        borderRadius: "10px"
      }} >
        <Stack margin={3} direction="column" alignItems="start" >
          <Typography fontWeight="bolder" variant="body1" color="black">{heading}</Typography>
          {
            payment &&
            <Typography variant="h4" fontWeight="bolder" color="black">{payment}</Typography>

          }
          {
            chipText && <Chip sx={{
              marginY: "10px"
            }} label={chipText} variant="outlined" />
          }
        </Stack>
      </Stack>
    </>
  )
}

export default CustomBox
