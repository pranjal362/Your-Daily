/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect, useContext } from 'react'
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
	DialogTitle,
	TextField,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Item } from 'modules/Items'
import snackbarContext from '../shared/provider/snackbarProvider'
import { stringify } from 'querystring'

enum TabCategory {
	ALL = 'all',
	VEGETABLES = 'vegetables',
	FRUITS = 'fruits',
	OTHERS = 'others',
}

interface adItem {
	category: number
	name: string
	price: number
	inStock: boolean
	baseQuantity: string
	imageId: number
}

interface editItem {
	id: number
	categoryID: number
	name: string
	price: number
	inStock: boolean
	baseQuantity: string
	imageId: number
}

function Dashboard() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, setValue] = useState<TabCategory>(TabCategory.ALL)
	const [openLogoutDialog, setOpenAddItemDialogLogoutDialog] =
		React.useState(false)
	const { customizedSnackbar } = useContext(snackbarContext)
	const [del, setDel] = useState(true)
	const [addItem, setAddItem] = useState<adItem>({
		category: 1,
		name: 'random',
		price: 500,
		inStock: true,
		baseQuantity: '1 Unit',
		imageId: 52,
	})
	const [editItem, setEditItem] = useState<editItem>({
		id: 222,
		categoryID: 2,
		name: 'not random',
		price: 2500,
		inStock: false,
		baseQuantity: '2 Unit',
		imageId: 97,
	})
	// const [itemsData, setItemsData] = useState<Item[] | {}>([])
	const [Dashboard, setDashboard] = useState<{
		[key in TabCategory]: Item[]
	}>({
		[TabCategory.ALL]: [],
		[TabCategory.VEGETABLES]: [],
		[TabCategory.FRUITS]: [],
		[TabCategory.OTHERS]: [],
	})
	// const [vegetables, setVegetables] = useState<Item[]>([])
	// const [fruits, setFruits] = useState<Item[]>([])
	// const [others, setOthers] = useState<Item[]>([])
	const [openAddItemDialog, setOpenAddItemDialog] = React.useState(false)

	const handleAddItemOpen = () => {
		setOpenAddItemDialog(true)
	}

	const handleAddItemClose = () => {
		setOpenAddItemDialog(false)
	}

	const handleAddItemSubmit = () => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const { status, data } = await axios.post(
					`/api/store-manager/item`,
					addItem,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 201) {
					customizedSnackbar('Item added successfully!!', 'success')
					setOpenAddItemDialog(false)
					// window.location.reload()
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

	const [openEditItemDialog, setOpenEditItemDialog] = React.useState(false)

	const handleEditItemOpen = (event: any, itemId: number) => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const { status, data } = await axios.get(
					`/api/store-manager/item/${itemId}`,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 200) {
					customizedSnackbar('Item details fetched Successfully!!', 'success')
					setEditItem(data)
					setOpenEditItemDialog(true)
					// console.log(editItem)
					// console.log(data)
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditItemClose = () => {
		setOpenEditItemDialog(false)
	}

	const handleEditItemSubmit = () => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			;(async () => {
				const body = {
					category: editItem.categoryID,
					imageId: 0,
					inStock: editItem.inStock,
					name: editItem.name,
					price: editItem.price,
					strikeThroughPrice: 0,
					baseQuantity: '1 Unit',
				}
				const id = editItem.id
				const { status, data } = await axios.put(
					`/api/store-manager/item/${id}`,
					body,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 201) {
					customizedSnackbar('Item Edited successfully!!', 'success')
					setOpenEditItemDialog(false)
					// window.location.reload()
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

	const handleCheck = (row: any) => {
		const Auth = localStorage.getItem('Auth') as string
		try {
			const body = {
				category: row.categoryID,
				imageId: 0,
				inStock: !row.inStock,
				name: row.name,
				price: row.price,
				strikeThroughPrice: 0,
				baseQuantity: '1 Unit',
			}
			const id = row.id
			;(async () => {
				const { status, data } = await axios.put(
					`/api/store-manager/item/${id}`,
					body,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 201) {
					customizedSnackbar('Item Edited successfully!!', 'success')
					// window.location.reload()
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

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
				const all = response.data as Item[]

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

				setDashboard({
					[TabCategory.ALL]: all,
					[TabCategory.VEGETABLES]: vegetables,
					[TabCategory.FRUITS]: fruits,
					[TabCategory.OTHERS]: others,
				})
			})()
		} catch (error) {
			console.log(error)
		}
	}, [, addItem, editItem, handleCheck, del])

	const handleLogoutDialogOpen = () => {
		setOpenAddItemDialogLogoutDialog(true)
	}

	const handleLogoutDialogDisagree = () => {
		setOpenAddItemDialogLogoutDialog(false)
	}

	const handleLogoutDialogAgree = () => {
		setOpenAddItemDialogLogoutDialog(false)
		router.push('/')
	}

	const handleTabValueChange = (
		event: React.SyntheticEvent,
		newValue: TabCategory
	) => {
		setValue(newValue)
	}

	const handleDeleteItem = (event: any, itemId: number) => {
		const Auth = localStorage.getItem('Auth') as string
		setDel(false)
		try {
			;(async () => {
				const { status, data } = await axios.delete(
					`/api/store-manager/item/${itemId}`,
					{
						headers: {
							Authorization: Auth,
						},
					}
				)
				if (status == 200) {
					customizedSnackbar('Item successfully Deleted!!', 'success')
					// window.location.reload()
				}
			})()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<>
			<AppBar position='sticky' sx={{ height: 80 }}>
				<Toolbar>
					<Image
						src='/assets/img/YD-logo.png'
						alt='Your Daily Logo'
						height={80}
						width={80}
					/>
					<Typography variant='h2' sx={{ flexGrow: 1, marginLeft: 2 }}>
						Dashboard
					</Typography>
					<PersonAddAltIcon fontSize='large' sx={{ marginRight: 5 }} />
					<LogoutIcon
						fontSize='large'
						sx={{ marginRight: 5 }}
						onClick={handleLogoutDialogOpen}
					/>
					<Dialog open={openLogoutDialog} onClose={handleLogoutDialogDisagree}>
						<DialogContent>
							<DialogContentText>DO YOU WANT TO LOGOUT?</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleLogoutDialogDisagree}>Disagree</Button>
							<Button onClick={handleLogoutDialogAgree} autoFocus>
								Agree
							</Button>
						</DialogActions>
					</Dialog>
				</Toolbar>
			</AppBar>

			<Grid container justifyContent={'space-around'} padding={5}>
				<Grid item>
					<Button onClick={handleLogoutDialogOpen}>Back</Button>
				</Grid>
				<Grid item>
					<Typography variant='h2' color='black'>
						Items
					</Typography>
				</Grid>
				<Grid item>
					<Button onClick={handleAddItemOpen}>+ Add New Items</Button>
				</Grid>
				<Dialog open={openAddItemDialog} onClose={handleAddItemClose}>
					<DialogTitle>Add Item Details</DialogTitle>
					<DialogContent>
						<DialogContentText>
							All Details are mandatory to fill.
						</DialogContentText>
						<TextField
							autoFocus
							margin='dense'
							id='category'
							label='Category'
							type='number'
							fullWidth
							variant='standard'
							required
							value={addItem.category}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: parseInt(event.target.value),
								})
							}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='Name'
							type='text'
							fullWidth
							variant='standard'
							required
							value={addItem.name}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: event.target.value,
								})
							}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='price'
							label='Price'
							type='number'
							fullWidth
							variant='standard'
							required
							value={addItem.price}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: parseInt(event.target.value),
								})
							}
						/>
						<Typography>In Stock*</Typography>
						<Checkbox
							id='inStock'
							required
							checked={addItem.inStock}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: !addItem.inStock,
								})
							}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='baseQuantity'
							label='Base Quantity'
							type='text'
							fullWidth
							variant='standard'
							required
							value={addItem.baseQuantity}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: event.target.value,
								})
							}
						/>
						<TextField
							autoFocus
							margin='dense'
							id='imageId'
							label='Image ID'
							type='number'
							fullWidth
							variant='standard'
							required
							value={addItem.imageId}
							onChange={(event) =>
								setAddItem({
									...addItem,
									[event.target.id]: parseInt(event.target.value),
								})
							}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleAddItemClose}>Cancel</Button>
						<Button onClick={handleAddItemSubmit}>Submit</Button>
					</DialogActions>
				</Dialog>
			</Grid>

			<Tabs centered value={value} onChange={handleTabValueChange}>
				<Tab
					value={TabCategory.ALL}
					label={`All items (${Dashboard[TabCategory.ALL].length})`}
				/>
				<Tab
					value={TabCategory.VEGETABLES}
					label={`Vegetables (${Dashboard[TabCategory.VEGETABLES].length})`}
				/>
				<Tab
					value={TabCategory.FRUITS}
					label={`Fruits (${Dashboard[TabCategory.FRUITS].length})`}
				/>
				<Tab
					value={TabCategory.OTHERS}
					label={`Others (${Dashboard[TabCategory.OTHERS].length})`}
				/>
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
								<Typography color='black'>Vegetables Name</Typography>
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
						{Dashboard[value]?.map((row: any) => (
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
										src={'/assets/img/butterfly.jpg'}
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
									<Checkbox
										color='primary'
										onClick={() => handleCheck(row)}
										checked={row.inStock}
									/>
								</TableCell>
								<TableCell align='center'>
									<IconButton
										onClick={(event) => handleDeleteItem(event, row.id)}>
										<DeleteIcon color='primary' />
									</IconButton>
								</TableCell>
								<TableCell align='center'>
									<IconButton
										onClick={(event) => handleEditItemOpen(event, row.id)}>
										<EditIcon color='primary' />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog open={openEditItemDialog} onClose={handleEditItemClose}>
				<DialogTitle>Edit Item Details</DialogTitle>
				<DialogContent>
					<DialogContentText>Edit details.</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='category'
						label='Category'
						type='number'
						fullWidth
						variant='standard'
						required
						value={editItem.categoryID}
						onChange={(event) => {
							console.log(editItem)
							setEditItem({
								...editItem,
								[event.target.id]: event.target.value,
							})
						}}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Name'
						type='text'
						fullWidth
						variant='standard'
						required
						value={editItem.name}
						onChange={(event) =>
							setEditItem({
								...editItem,
								[event.target.id]: event.target.value,
							})
						}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='price'
						label='Price'
						type='number'
						fullWidth
						variant='standard'
						required
						value={editItem.price}
						onChange={(event) =>
							setEditItem({
								...editItem,
								[event.target.id]: event.target.value,
							})
						}
					/>
					<Typography>In Stock*</Typography>
					<Checkbox
						autoFocus
						id='inStock'
						required
						checked={editItem.inStock}
						onChange={(event) => {
							setEditItem({
								...editItem,
								[event.target.id]: !editItem.inStock,
							})
						}}
					/>
					<TextField
						autoFocus
						margin='dense'
						id='baseQuantity'
						label='Base Quantity'
						type='text'
						fullWidth
						variant='standard'
						required
						value={editItem.baseQuantity}
						onChange={(event) =>
							setEditItem({
								...editItem,
								[event.target.id]: event.target.value,
							})
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleEditItemClose}>Cancel</Button>
					<Button onClick={handleEditItemSubmit}>Submit</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default Dashboard
