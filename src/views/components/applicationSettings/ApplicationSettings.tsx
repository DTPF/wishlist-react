import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChromePicker } from 'react-color'
import { Button, Col, Divider, Modal, Popover, Row } from 'antd'
import UserContext from 'context/user/UserContext'
import ThemeContext from 'context/theme/ThemeContext'
import AppSettingsModalContext from 'context/appSettingsModal/AppSettingsModalContext'
import invertHexColor from 'utils/invertHexColor'
import 'scss/globals.scss'
import './applicationSettings.scss'

export default function ApplicationSettings() {
	const { t: translate } = useTranslation()
	const { openSettingsModal, setOpenSettingsModal }: any = useContext(AppSettingsModalContext)
	const { dbUser, updateUser } = useContext(UserContext)
	const { currentThemeColor, setThemeColorAction } = useContext(ThemeContext)
	const { colorPrimary, colorPrimaryBg } = currentThemeColor
	const [wishlistTheme, setWishlistTheme] = useState({
		color: dbUser.appInfo.wishlistColor,
		backgroundColor: dbUser.appInfo.wishlistColorBg
	})

	useEffect(() => {
		setWishlistTheme({
			color: dbUser.appInfo.wishlistColor,
			backgroundColor: dbUser.appInfo.wishlistColorBg
		})
		return () => { }
	}, [dbUser.appInfo.wishlistColor, dbUser.appInfo.wishlistColorBg])

	const handleOk = () => {
		const userData = {
			appInfo: {
				colorPrimary: currentThemeColor.colorPrimary,
				colorPrimaryBg: currentThemeColor.colorPrimaryBg,
				language: dbUser.appInfo.language,
				wishlistColor: wishlistTheme.color,
				wishlistColorBg: wishlistTheme.backgroundColor
			}
		}
		updateUser(userData)
		localStorage.setItem('theme-color', currentThemeColor.colorPrimaryBg)
		setOpenSettingsModal(false)
	}

	const handleCancel = () => {
		setThemeColorAction(currentThemeColor.colorPrimary, currentThemeColor.colorPrimaryBg)
		setOpenSettingsModal(false)
	}

	return (
		<Modal
			title={translate('appSettingModalTitle')}
			style={{ textAlign: 'center' }}
			open={openSettingsModal}
			onOk={handleOk}
			onCancel={handleCancel}
			footer={[
				<Button
					key="back"
					onClick={handleCancel}
					className='button-secondary'

				>
					{translate('cancel')}
				</Button>,
				<Button
					key="save"
					type="primary"
					loading={false}
					onClick={() => handleOk()}
					style={{ backgroundColor: colorPrimaryBg, color: colorPrimary }}
					className='button-primary'

				>
					{translate('save')}
				</Button>
			]}
		>
			<AppSettingsForm wishlistTheme={wishlistTheme} setWishlistTheme={setWishlistTheme} />
		</Modal>
	)
}

function AppSettingsForm({ wishlistTheme, setWishlistTheme }: any) {
	const { t: translate } = useTranslation()
	const { currentThemeColor, setThemeColorAction } = useContext(ThemeContext)

	const handleAppColor = (e: any) => {
		const invertColor = invertHexColor(e.hex, true)
		setThemeColorAction(invertColor, e.hex)
	}

	const handleListColor = (e: any) => {
		const invertColor = invertHexColor(e.hex, true)
		setWishlistTheme({ color: invertColor, backgroundColor: e.hex	})
	}

	return (
		<Row style={{ padding: 30 }}>
			<Col
				span={24}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<Popover
					className='app-settings-app-color-popover'
					content={
						<ChromePicker
							color={currentThemeColor.colorPrimaryBg}
							onChange={(e: any) => handleAppColor(e)}
						/>
					}
					trigger="click"
				>
					<Button
						style={{ color: currentThemeColor.colorPrimary, backgroundColor: currentThemeColor.colorPrimaryBg }}
						type="primary"
					>
						{translate('inputAppColor')}
					</Button>
				</Popover>
			</Col>

			<Divider />

			<Col
				span={24}
				style={{ display: 'flex', justifyContent: 'center' }}
			>
				<Popover
					className='app-settings-app-color-popover'
					content={
						<ChromePicker
							color={wishlistTheme.backgroundColor}
							onChange={(e: any) => handleListColor(e)}
						/>
					}
					trigger="click"
				>
					<Button
						style={{ color: wishlistTheme.color, backgroundColor: wishlistTheme.backgroundColor }}
						type="primary"
					>
						{translate('listColor')}
					</Button>
				</Popover>
			</Col>
		</Row>
	)
}