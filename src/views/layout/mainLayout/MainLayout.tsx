import { useState } from 'react';
import { Outlet } from 'react-router-dom'
import FooterWishlist from 'views/components/layout/footerWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist'
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Layout } from 'antd';
import { LoginOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import './mainLayout.scss'
import { useAuth0 } from '@auth0/auth0-react';
import Language from 'views/UI/language/Language';

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
	const { user, loginWithRedirect, logout }: any = useAuth0()
	const [navbarCollapsed, setNavbarCollapsed] = useState(true)
	const { t: translate } = useTranslation();

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: '#232f3eca',
					colorBgContainer: '#fff'
				},
			}}
		>
			<Layout className='main-layout'>
				<Sider
					trigger={null}
					breakpoint="lg"
					collapsedWidth="0"
					collapsed={navbarCollapsed}
					className='main-layout__sider'
				>
					<ul className='main-layout__sider--menu'>
						<div className='main-layout__sider--menu__language'><Language /></div>
						<li><SettingOutlined /> {translate('settings')}</li>
						{user ? (
							<li
							onClick={logout}
							><LogoutOutlined /> {translate('logout')}</li>
						) : (
							<li
							onClick={loginWithRedirect}
							><LoginOutlined /> {translate('login')}</li>
						)}
					</ul>
				</Sider>
				<Layout className='main-layout__container'>
					<Header className='main-layout__container--header'>
						{navbarCollapsed ? (
							<MenuUnfoldOutlined
								className='main-layout__container--header__icon'
								onClick={() => setNavbarCollapsed(!navbarCollapsed)}
							/>
						) : (
							<MenuFoldOutlined
								className='main-layout__container--header__icon'
								onClick={() => setNavbarCollapsed(!navbarCollapsed)}
							/>
						)}
						<HeaderWishlist />
					</Header>
					<Content
						onClick={() => setNavbarCollapsed(true)}
						className='main-layout__container--content'
					>
						<Outlet />
					</Content>
					<Footer className='main-layout__container--footer'>
						<FooterWishlist />
					</Footer>
				</Layout>
			</Layout>
		</ConfigProvider>
	)
}