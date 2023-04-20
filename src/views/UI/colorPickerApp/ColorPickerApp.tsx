import { useContext } from 'react'
import ThemeContext from 'context/theme/ThemeContext';
import { Form, Input } from 'antd';

export default function ColorPickerApp() {
	const { currentThemeColor, setAppThemeColorAction } = useContext(ThemeContext)

	return (
		<Form
			labelCol={{ span: 12 }}
			wrapperCol={{ span: 24 }}
			style={{ maxWidth: 600, marginBottom: 0, display: 'flex', alignItems: 'center' }}
		>
			<Form.Item
				label='Color de la aplicación'
			>
				<Input
					type='color'
					value={currentThemeColor.colorPrimaryBg}
					onChange={(e: any) => setAppThemeColorAction(e.target.value)}
					style={{ padding: 0, border: 0, width: 150, height: 35, cursor: 'pointer' }}
				/>
			</Form.Item>
		</Form>
	)
}