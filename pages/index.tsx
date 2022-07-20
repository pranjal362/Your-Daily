import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { ChangeEvent, FormEvent, useContext, MouseEvent } from 'react'
import snackbarContext from '../shared/provider/snackbarProvider'
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
import axios from 'axios'

interface State {
	username: string
	password: string
	showPassword: boolean
}

const Home: NextPage = () => {
	const router = useRouter()
	const { customizedSnackbar } = useContext(snackbarContext)

	const [state, setState] = React.useState<State>({
		username: '',
		password: '',
		showPassword: false,
	})

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, [event?.target.name ?? '']: event?.target.value })
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		try {
			event?.preventDefault()
			const { status, data } = await axios.post('/api/sm-login', {
				email: state.username,
				password: state.password,
			})
			if (status == 200) {
				customizedSnackbar('Successfully Logged In!!', 'success')
				router.push('/dashboard')
			}
			// console.log(data.Authorization)
			localStorage.setItem('Auth', data.Authorization)
		} catch (error: any) {
			customizedSnackbar('Invalid UserName or Password!!', 'error')
		} finally {
		}
	}

	const handleClickShowPassword = () => {
		setState({
			...state,
			showPassword: !state.showPassword,
		})
	}

	const handleMouseDownPassword = (
		event: MouseEvent<HTMLButtonElement> | undefined
	) => {
		event?.preventDefault()
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
													type={state.showPassword ? 'text' : 'password'}
													label='Password'
													placeholder='Enter your password'
													fullWidth
													name='password'
													variant='outlined'
													value={state.password}
													onChange={handleChange}
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

const AllClass = styled(Box)(({ theme }) => ({
	'.login-background': {
		padding: 25,
		boxShadow: '12px 9px 27px #77777740',
	},

	'.login-sub-heading': {
		color: '#1d2226',
		opacity: '50%',
		letterSpacing: '0px',
		textAlign: 'left',
	},

	'.button-block': {
		background:
			'transparent linear-gradient(180deg, #f88a12 0%, #cd2d05 100%) 0% 0% no-repeat padding-box',
		borderRadius: '5px',
		opacity: 1,
	},

	'.Forget-Password': {
		color: '#f88a12',
		textAlign: 'left',
		font: 'normal normal normal 14px/17px Museo Sans 500',
		letterSpacing: '0px',
		opacity: 1,
	},
}))

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
