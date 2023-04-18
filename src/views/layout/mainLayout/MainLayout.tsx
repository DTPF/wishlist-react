import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { Layout } from 'antd';
import ThemeContext from 'context/theme/ThemeContext';
import AppSettingsModalContext from 'context/appSettingsModal/AppSettingsModalContext';
import FooterWishlist from 'views/components/layout/footerWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist'
import Language from 'views/UI/language/Language';
import ApplicationSettings from 'views/components/applicationSettings/ApplicationSettings';
import { useTranslation } from 'react-i18next';
import { LoginOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import './mainLayout.scss'

export default function MainLayout() {
	const { user, loginWithRedirect, logout }: any = useAuth0()
	const [navbarCollapsed, setNavbarCollapsed] = useState(true)
	const { t: translate } = useTranslation();
	const { Header, Content, Footer, Sider } = Layout;
	const { currentThemeColor } = useContext(ThemeContext)
	const { colorPrimary, colorPrimaryBg } = currentThemeColor
	const { setOpenSettingsModal }: any = useContext(AppSettingsModalContext)

	return (
		<Layout className='main-layout'>
			<ApplicationSettings />
			<Sider
				trigger={null}
				breakpoint="lg"
				collapsedWidth="0"
				collapsed={navbarCollapsed}
				className='main-layout__sider'
				style={{ backgroundColor: colorPrimaryBg }}
			>
				<ul className='main-layout__sider--menu'>
					<div className='main-layout__sider--menu__language'><Language /></div>
					<li onClick={() => {
						setNavbarCollapsed(true)
						setOpenSettingsModal(true)
					}} style={{ color: colorPrimary }}>
						<SettingOutlined /> {translate('settings')}
					</li>
					{user ? (
						<li onClick={logout} style={{ color: colorPrimary }}>
							<LogoutOutlined />
							{translate('logout')}
						</li>
					) : (
						<li onClick={loginWithRedirect} style={{ color: colorPrimary }}>
							<LoginOutlined />
							{translate('login')}
						</li>
					)}
				</ul>
			</Sider>
			<Layout className='main-layout__container'>
				<Header className='main-layout__container--header'>
					{navbarCollapsed ? (
						<MenuUnfoldOutlined
							className='main-layout__container--header__icon'
							onClick={() => setNavbarCollapsed(!navbarCollapsed)}
							style={{ color: colorPrimary }}
						/>
					) : (
						<MenuFoldOutlined
							className='main-layout__container--header__icon'
							onClick={() => setNavbarCollapsed(!navbarCollapsed)}
							style={{ color: colorPrimary }}
						/>
					)}
					<HeaderWishlist />
				</Header>
				<Content
					onClick={() => setNavbarCollapsed(true)}
				>
					<Outlet />
				</Content>
				<Footer className='main-layout__container--footer'>
					<FooterWishlist />
				</Footer>
			</Layout>
		</Layout>
	)
}