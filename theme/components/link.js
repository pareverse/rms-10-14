const Link = {
	baseStyle: (props) => ({
		fontSize: 'sm',
		fontWeight: 'medium',
		color: props.active ? 'brand.default' : 'accent-3',
		transition: '.4s',
		_hover: {
			textDecoration: 'none',
			color: !props.active && 'accent-1'
		}
	})
}

export default Link
