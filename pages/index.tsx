import type { NextPage } from 'next'
import Image from 'next/image'
import React, { useState } from 'react'
import {
	TextField,
	Grid,
	Paper,
	Link,
	Button,
	Typography,
	InputAdornment,
	IconButton,
	styled,
	Box,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import AccountCircle from '@mui/icons-material/AccountCircle'

const Home: NextPage = () => {
	const [state, setState] = useState({
		username: '',
		password: '',
		authflag: 1,
		showPassword: false,
	})

	function handleSubmit(event: any) {
		event.preventDefault()
	}

	const handleClickShowPassword = () => {
		setState({
			...state,
			showPassword: !state.showPassword,
		})
	}

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	return (
		<>
			<AllClass>
				<Image
					src='/assets/img/yd-logo.png'
					alt='Your Daily Logo'
					height={106}
					width={288}
				/>
				<Grid container spacing={0}>
					<Grid item>
						<ImagesSide>
							<Background
								src='/assets/img/Illustrator 1.png'
								alt='Illustrator image'
							/>
						</ImagesSide>
					</Grid>
					<Grid item>
						<Paper
							variant='elevation'
							elevation={2}
							className='login-background'
							sx={{ marginTop: '60px', marginLeft: '80px' }}>
							<Grid container direction='column' spacing={2} p={1}>
								<Grid item>
									<Typography variant='h4'>LOGIN</Typography>
								</Grid>
								<Grid item>
									<Typography variant='h6' className='login-sub-heading'>
										Please login to your account.
									</Typography>
								</Grid>
								<Grid item>
									<form onSubmit={handleSubmit}>
										<Grid container direction='column' spacing={2}>
											<Grid item>
												<TextField
													type='email'
													label='User ID'
													placeholder='Enter your user id'
													fullWidth
													name='username'
													variant='outlined'
													id='outlined-required'
													color='grey'
													value={state.username}
													onChange={(event) =>
														setState({
															...state,
															[event.target.name]: event.target.value,
														})
													}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<AccountCircle />
															</InputAdornment>
														),
													}}
												/>
											</Grid>
											<Grid item>
												<TextField
													type='password'
													label='Password'
													placeholder='Enter your password'
													fullWidth
													name='password'
													color='grey'
													variant='outlined'
													value={state.password}
													onChange={(event) =>
														setState({
															...state,
															[event.target.name]: event.target.value,
														})
													}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<IconButton
																	aria-label='toggle password visibility'
																	onClick={handleClickShowPassword}
																	onMouseDown={handleMouseDownPassword}
																	edge='end'>
																	{state.showPassword ? (
																		<VisibilityOff />
																	) : (
																		<Visibility />
																	)}
																</IconButton>
															</InputAdornment>
														),
													}}
												/>
											</Grid>
											<Grid item>
												<Button
													variant='contained'
													color='secondary'
													type='submit'
													className='button-block'>
													LOGIN
												</Button>
											</Grid>
										</Grid>
									</form>
								</Grid>
								<Grid item alignItems='flex-end' padding={2}>
									<Link href='#' className='Forget-Password'>
										Forgot Password?
									</Link>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</AllClass>
		</>
	)
}

export default Home

const AllClass = styled(Box)`
	:root {
		/* Colors: */
		--unnamed-color-ffeedb: #ffeedb;
		--unnamed-color-1d1d1d: #1d1d1d;
		--unnamed-color-4612f8: #4612f8;
		--unnamed-color-777777: #777777;
		--unnamed-color-f88a12: #f88a12;
		--unnamed-color-707070: #707070;
	}
	.login-background {
		padding: 20px;
		padding-top: 50px;
		padding-bottom: 25px;
		box-shadow: 12px 9px 27px #77777740;
	}

	.login-sub-heading {
		color: #1d2226;
		opacity: 50%;
		letter-spacing: 0px;
		text-align: left;
	}

	.button-block {
		background: transparent
			linear-gradient(180deg, var(--unnamed-color-f88a12) 0%, #cd2d05 100%) 0%
			0% no-repeat padding-box;
		background: transparent linear-gradient(180deg, #f88a12 0%, #cd2d05 100%) 0%
			0% no-repeat padding-box;
		border-radius: 5px;
		opacity: 1;
	}

	.Forget-Password {
		color: var(--unnamed-color-f88a12);
		text-align: left;
		font: normal normal normal 14px/17px Museo Sans 500;
		letter-spacing: 0px;
		color: #f88a12;
		opacity: 1;
	}
`

const ImagesSide = styled(Box)(({ theme }) => ({
	display: 'flex',
	[theme.breakpoints.down('md')]: {
		maxHeight: '45vh',
	},
	color: 'primary.main',
	[theme.breakpoints.down('md')]: {
		maxHeight: '24vh',
	},
}))

const Background = styled('img')(({ theme }) => ({
	objectFit: 'cover',
	height: '500px',
	margin: '0px 50px 50px 100px',
	[theme.breakpoints.down('md')]: {
		maxHeight: '45vh',
	},
	[theme.breakpoints.down('md')]: {
		maxHeight: '24vh',
	},
}))
