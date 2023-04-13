import { useContext, useEffect, useState } from 'react'
import UserContext from 'context/user/UserContext'
import UserForm from './userForm/UserForm'
import { Modal, Tag, Button, Popconfirm } from 'antd'

export default function UserSettingsModal({ openModal, setOpenModal }: any) {
	const { dbUser, updateUser } = useContext(UserContext)
	const [confirmLoading, setConfirmLoading] = useState(false)
	const [userData, setUserData] = useState({
		name: '',
		lastname: '',
		language: ''
	})

	useEffect(() => {
		let isMounted = true
		isMounted && setUserData({
			name: dbUser.name,
			lastname: dbUser.lastname,
			language: dbUser.language
		})
		return () => { isMounted = false }
	}, [dbUser])

	const handleOk = () => {
		setConfirmLoading(true)
		setTimeout(() => {
			updateUser(userData)
			setOpenModal(false)
			setConfirmLoading(false)
		}, 0)
	}

	const handleCancel = () => {
		setUserData({
			name: dbUser.name,
			lastname: dbUser.lastname,
			language: dbUser.language
		})
		setOpenModal(false)
	}

	const handleDeleteAccount = () => {
		console.log('Cuenta eliminada');
	}

	const title = <div>Configuración de <Tag color="geekblue">{dbUser.email}</Tag></div>

	return (
		<Modal
			title={title}
			open={openModal}
			confirmLoading={confirmLoading}
			onCancel={handleCancel}
			cancelText='Cancelar'
			footer={[
				<Popconfirm
					key="delete-account"
					title="Eliminar cuenta de usuario"
					description="Se eliminarán todos los datos, incluídas las listas."
					onConfirm={handleDeleteAccount}
					okText='Borrar'
					cancelText='Cancelar'
					// onOpenChange={() => console.log('open change')}
					style={{ maxWidth: '200px' }}
				>
					<Button danger>Eliminar cuenta</Button>
				</Popconfirm>,
				<Button key="back" onClick={handleCancel}>
					Cancelar
				</Button>,
				<Button
					key="save"
					type="primary"
					loading={confirmLoading}
					onClick={handleOk}
				>
					Guardar
				</Button>,
			]}
		>
			<UserForm userData={userData} setUserData={setUserData} />
		</Modal>
	)
}