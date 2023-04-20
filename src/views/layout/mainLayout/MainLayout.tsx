import { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import { Layout, Switch } from 'antd';
import ThemeContext from 'context/theme/ThemeContext';
import AppSettingsModalContext from 'context/appSettingsModal/AppSettingsModalContext';
import FooterWishlist from 'views/components/layout/footerWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist'
import Language from 'views/UI/language/Language';
import ApplicationSettings from 'views/components/applicationSettings/ApplicationSettings';
import { useTranslation } from 'react-i18next';
import { LoginOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import './mainLayout.scss'
const moonImage = require('assets/images/moon.png')
const sunImage = require('assets/images/sun.png')

export default function MainLayout() {
	const [navbarCollapsed, setNavbarCollapsed] = useState(true)
	const { Header, Content, Footer } = Layout;

	return (
		<Layout className='main-layout'>
			<ApplicationSettings />
			<SiderNavBar
				navbarCollapsed={navbarCollapsed}
				setNavbarCollapsed={setNavbarCollapsed}
			/>
			<Layout className='main-layout__container'>
				<Header className='main-layout__container--header'>
					<MenuIcon
						navbarCollapsed={navbarCollapsed}
						setNavbarCollapsed={setNavbarCollapsed}
					/>
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

function SiderNavBar({ navbarCollapsed, setNavbarCollapsed }: any) {
	const { user, loginWithRedirect, logout }: any = useAuth0()
	const { currentThemeColor } = useContext(ThemeContext)
	const { colorPrimary, colorPrimaryBg } = currentThemeColor
	const { t: translate } = useTranslation();
	const { Sider } = Layout;
	const { setOpenSettingsModal }: any = useContext(AppSettingsModalContext)

	return (
		<Sider
			trigger={null}
			breakpoint="lg"
			collapsedWidth="0"
			collapsed={navbarCollapsed}
			className='main-layout__sider'
			style={{ backgroundColor: colorPrimaryBg }}
		>
			<ul className='main-layout__sider--menu'>
				<div className='main-layout__sider--menu__top'>
					<div className='main-layout__sider--menu__top--language'>
						<Language />
					</div>
					<div className='main-layout__sider--menu__top--theme'>
						<Switch
							checkedChildren={
								<img
									src={moonImage}
									className='main-layout__sider--menu__top--theme__moon'
									alt='Light Theme'
									width='23'
									height='23'
								/>
							}
							unCheckedChildren={
								<img
									src={sunImage}
									className='main-layout__sider--menu__top--theme__sun'
									alt='Light Theme'
									width='22'
									height='22'
								/>
							}
							defaultChecked={false}
						/>
					</div>
				</div>
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
	)
}

function MenuIcon({ navbarCollapsed, setNavbarCollapsed }: any) {
	const { currentThemeColor } = useContext(ThemeContext)
	const { colorPrimary } = currentThemeColor
	return (
		navbarCollapsed ? (
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
		)
	)
}