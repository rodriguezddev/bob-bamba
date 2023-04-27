import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import logo from '../../assets/images/logo_login.png'

function Home() {
  return (
    <Grid
      alignItems='center'
      container
      display='flex'
      flexDirection='column'
      justifyContent='center'
    >
      <header>
        <Typography
          sx={{
            fontSize: '3rem',
            fontWeight: '600',
            lineHeight: '2.56rem',
          }}
          textAlign='center'
        >
          Bienvenido a
        </Typography>
        <Box mt={3} mb={5}>
          <img alt='Bamba' height={58} src={logo} width={360} />
        </Box>
      </header>
    </Grid>
  )
}

export default Home
