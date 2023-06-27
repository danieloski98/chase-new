import { Oval } from 'react-loader-spinner'

const ButtonSpinner = () => (
	<Oval
		height={20}
		width={20}
		color="#fff"
		visible={true}
		ariaLabel='oval-loading'
		secondaryColor="#bbb"
		strokeWidth={4}
		strokeWidthSecondary={4}
	/>
)

export default ButtonSpinner