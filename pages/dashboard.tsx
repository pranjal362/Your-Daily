/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {
	Typography,
	Box,
	AppBar,
	Toolbar,
	Grid,
	Tabs,
	Tab,
	TableContainer,
	TableCell,
	TableHead,
	TableRow,
	Table,
	TableBody,
	Checkbox,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	IconButton,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'

function Dashboard() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, setValue] = useState(0)
	const [openDialog, setDialogOpen] = React.useState(false)
	// const [itemsData, setItemsData] = useState<Item[] | {}>([])
	const [Dashboard, setDashboard] = useState({
		all: [{}],
		vegetables: [{}],
		fruits: [{}],
		others: [{}],
	})
	// const [vegetables, setVegetables] = useState<Item[]>([])
	// const [fruits, setFruits] = useState<Item[]>([])
	// const [others, setOthers] = useState<Item[]>([])
	const router = useRouter()

	useEffect(() => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const response = await axios.get('/api/store-manager/item', {
					headers: {
						Authorization: Auth,
					},
				})
				const all = response.data

				const vegetables = all.filter(
					(item: { categoryID: number }) => item.categoryID === 1
				)

				const fruits = all.filter(
					(item: { categoryID: number }) => item.categoryID === 2
				)

				const others = all.filter(
					(item: { categoryID: number }) =>
						item.categoryID !== 1 && item.categoryID !== 2
				)

				setDashboard({ all, vegetables, fruits, others })
			})()
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		if (Dashboard.all.length > 1) console.log(Dashboard)
	}, [Dashboard])

	const handleDialogOpen = () => {
		setDialogOpen(true)
	}

	const handleDialogDisagree = () => {
		setDialogOpen(false)
	}

	const handleDialogAgree = () => {
		setDialogOpen(false)
		router.push('/')
	}

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const handleDeleteItem = () => {}

	return (
		<>
			<AppBar position='sticky' sx={{ height: 80 }}>
				<Toolbar>
					<Image
						src='/assets/img/yd-logo.png'
						alt='Your Daily Logo'
						height={100}
						width={250}
					/>
					<Typography variant='h1' sx={{ flexGrow: 1, marginLeft: 2 }}>
						Dashboard
					</Typography>
					<PersonAddAltIcon fontSize='large' sx={{ marginRight: 5 }} />
					<LogoutIcon
						fontSize='large'
						sx={{ marginRight: 5 }}
						onClick={handleDialogOpen}
					/>
					<Dialog open={openDialog} onClose={handleDialogDisagree}>
						<DialogContent>
							<DialogContentText>DO YOU WANT TO LOGOUT?</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleDialogDisagree}>Disagree</Button>
							<Button onClick={handleDialogAgree} autoFocus>
								Agree
							</Button>
						</DialogActions>
					</Dialog>
				</Toolbar>
			</AppBar>

			<Grid container justifyContent={'space-around'} padding={5}>
				<Grid item>
					<Button onClick={handleDialogOpen}>Back</Button>
				</Grid>
				<Grid item>
					<Typography variant='h2' color='black'>
						Items
					</Typography>
				</Grid>
				<Grid item>
					<Button>+ Add New Items</Button>
				</Grid>
			</Grid>

			<Tabs centered value={value} onChange={handleChange}>
				<Tab label={`All items (${Dashboard.all.length})`} />
				<Tab label={`Vegetables (${Dashboard.vegetables.length})`} />
				<Tab label={`Fruits (${Dashboard.fruits.length})`} />
				<Tab label={`Others (${Dashboard.others.length})`} />
			</Tabs>

			<TableContainer sx={{ paddingLeft: 20, paddingRight: 20, paddingTop: 5 }}>
				<Table sx={{ minWidth: 650 }} aria-label='simple table'>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography color='black'>S. No</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>Image</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>vegetables Name</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>Base Qty.</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>Price (Per base Qty)</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black' noWrap>
									In Stock
								</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>Delete</Typography>
							</TableCell>
							<TableCell align='right'>
								<Typography color='black'>Edit</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{value == 0 &&
							Dashboard.all.map((row: any) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<Typography color='gray'>{row.id}</Typography>
									</TableCell>
									<TableCell align='center'>
										<img
											src={row.itemImageLinks ?? ''}
											alt='Item Image'
											width={50}
											height={50}
										/>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.name}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.baseQuantity}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.price}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Checkbox color='primary' checked={row.inStock} />
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={handleDeleteItem}>
											<DeleteIcon color='primary' />
										</IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton>
											<EditIcon color='primary' />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{value == 1 &&
							Dashboard.vegetables.map((row: any) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<Typography color='gray'>{row.id}</Typography>
									</TableCell>
									<TableCell align='center'>
										<img
											src={row.itemImageLinks ?? ''}
											alt='Item Image'
											width={50}
											height={50}
										/>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.name}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.baseQuantity}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.price}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Checkbox color='primary' checked={row.inStock} />
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={handleDeleteItem}>
											<DeleteIcon color='primary' />
										</IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton>
											<EditIcon color='primary' />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{value == 2 &&
							Dashboard.fruits.map((row: any) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<Typography color='gray'>{row.id}</Typography>
									</TableCell>
									<TableCell align='center'>
										<img
											src={row.itemImageLinks ?? ''}
											alt='Item Image'
											width={50}
											height={50}
										/>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.name}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.baseQuantity}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.price}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Checkbox color='primary' checked={row.inStock} />
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={handleDeleteItem}>
											<DeleteIcon color='primary' />
										</IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton>
											<EditIcon color='primary' />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{value == 3 &&
							Dashboard.fruits.map((row: any) => (
								<TableRow
									key={row.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<Typography color='gray'>{row.id}</Typography>
									</TableCell>
									<TableCell align='center'>
										<img
											src={row.itemImageLinks ?? ''}
											alt='Item Image'
											width={50}
											height={50}
										/>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.name}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.baseQuantity}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Typography color='gray'>{row.price}</Typography>
									</TableCell>
									<TableCell align='center'>
										<Checkbox color='primary' checked={row.inStock} />
									</TableCell>
									<TableCell align='center'>
										<IconButton onClick={handleDeleteItem}>
											<DeleteIcon color='primary' />
										</IconButton>
									</TableCell>
									<TableCell align='center'>
										<IconButton>
											<EditIcon color='primary' />
										</IconButton>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default Dashboard
