import { Components, Theme } from '@mui/material'
import { Button } from './Button'
export const overrides = (theme: Theme) => {
	const overrides: Components = {
		...Button(theme),
	}
	return overrides
}
