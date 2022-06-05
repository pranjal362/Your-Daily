import { Components, Theme } from '@mui/material'
import { pxToRem } from '../../utils'

export const Button = (theme: Theme) => {
	const config: Components = {
		MuiButton: {
			defaultProps: {
				variant: 'outlined',
			},
			styleOverrides: {
				sizeSmall: {
					fontSize: pxToRem(14),
				},
			},
		},
	}
	return config
}
