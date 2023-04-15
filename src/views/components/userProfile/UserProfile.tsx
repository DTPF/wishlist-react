import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserSettingsModal from '../wishlistsComponent/userSettingsModal/UserSettingsModal';
import OutsideClickHandler from 'react-outside-click-handler';
import Language from 'views/UI/language/Language';
import { useTranslation } from 'react-i18next';
import { Popover } from 'antd';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import './userProfile.scss'

export default function UserProfile() {
	const { user, loginWithRedirect, logout }: any = useAuth0()
	const [openModal, setOpenModal] = useState(false)
	const [openPopover, setOpenPopover] = useState(false);
	const { t: translate } = useTranslation();

	const popoverContent = (
		<div className='user-profile__popover'>
			<div><Language /></div>
			<div onClick={() => { setOpenModal(true); setOpenPopover(false) }}>
				<SettingOutlined /> {translate('settings')}
			</div>
			<div onClick={() => { logout(); setOpenPopover(false) }}>
				<LogoutOutlined /> {translate('logout')}
			</div>
		</div>
	)

	return (
		<div className='user-profile'>
			<UserSettingsModal openModal={openModal} setOpenModal={setOpenModal} />
			{user ? (
				<OutsideClickHandler onOutsideClick={() => setOpenPopover(false)}>
					<Popover placement="bottomRight" title={translate('titleProfilePopover')} content={popoverContent} open={openPopover}>
						<img onClick={() => setOpenPopover(true)} onMouseEnter={() => setOpenPopover(true)} src={user?.picture} alt={`${user?.nickname} menu`} width={40} height={40} />
					</Popover>
				</OutsideClickHandler>
			) : (
				<div onClick={() => loginWithRedirect()} className='user-profile__login'>{translate('login')}</div>
			)}
		</div>
	)
}