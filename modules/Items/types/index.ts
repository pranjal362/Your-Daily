export interface Item {
	id: number
	categoryID: number
	name: string
	price: number
	strikeThroughPrice: number | null
	inStock: boolean
	itemImageLinks: string[]
	baseQuantity: string
}
