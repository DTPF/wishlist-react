import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserSettingsModal from '../wishlistsComponent/userSettingsModal/UserSettingsModal';
import OutsideClickHandler from 'react-outside-click-handler';
import { Popover } from 'antd';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './userProfile.scss'

export default function UserProfile() {
	const { user, loginWithRedirect, logout }: any = useAuth0()
	const [openModal, setOpenModal] = useState(false)
	const [openPopover, setOpenPopover] = useState(false);

	const popoverContent = (
		<div className='user-profile__popover'>
			<div onClick={() => {
				setOpenModal(true)
				setOpenPopover(false)
			}}><SettingOutlined /> Ajustes</div>
			<div onClick={() => {
				logout()
				setOpenPopover(false)
			}}><LogoutOutlined /> Cerrar sesión</div>
		</div>
	)

	return (
		<div className='user-profile'>
			<UserSettingsModal openModal={openModal} setOpenModal={setOpenModal} />
			{user ? (
				<OutsideClickHandler onOutsideClick={() => setOpenPopover(false)}>
					<Popover placement="bottomRight" title={'Opciones de usuario'} content={popoverContent} open={openPopover}>
						<img onClick={() => setOpenPopover(true)} onMouseEnter={() => setOpenPopover(true)} src={user?.picture} alt={`Imagen de usuario de ${user?.nickname}`} width={40} height={40} />
					</Popover>
				</OutsideClickHandler>
			) : (
				<div onClick={() => loginWithRedirect()} className='user-profile__login'>Identifícate</div>
			)}
		</div>
	)
}