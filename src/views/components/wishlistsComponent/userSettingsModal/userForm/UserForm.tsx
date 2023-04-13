import { Form, Input, Select } from 'antd';

export default function WishlistsSettingsForm({ userData, setUserData }: any) {
	return (
		<Form
			labelCol={{ span: 5 }}
			wrapperCol={{ span: 15 }}
			layout="horizontal"
			size='large'
			style={{ maxWidth: 600, paddingTop: '20px', paddingBottom: '1px' }}
		>
			<Form.Item label="Nombre">
				<Input
					name='name'
					onChange={(e) => setUserData({ ...userData, name: e.target.value })}
					placeholder="Nombre"
					value={userData.name}
				/>
			</Form.Item>

			<Form.Item label="Apellidos">
				<Input
					name='lastname'
					onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
					placeholder="Apellidos"
					value={userData.lastname} />
			</Form.Item>

			<Form.Item label="Idioma">
				<Select
					value={userData.language}
					onChange={(e) => setUserData({ ...userData, language: e })}
					options={[
						{ value: 'en', label: 'Inglés' },
						{ value: 'es', label: 'Español' },
					]}
				/>
			</Form.Item>
		</Form>
	);
}