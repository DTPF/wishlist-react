import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'
import FooterWishlist from 'views/components/layout/footerWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist'
import { ConfigProvider, Layout, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import './mainLayout.scss'

const { Header, Content, Footer, Sider } = Layout;

export default function MainLayout() {
	const [collapsed, setCollapsed] = useState(true)

	const openSettings = () => {
		console.log('open settings');
	}

	const menu = [
		{
			key: 'settings',
			icon: React.createElement(SettingOutlined),
			label: 'Ajustes',
			onClick: openSettings
		}
	]

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
					onBreakpoint={(broken) => {
						setCollapsed(broken)
					}}
					collapsed={collapsed}
					className='main-layout__sider'
				>
					<div className="logo" />
					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={['4']}
						items={menu}
						className='main-layout__sider--menu'
					/>
				</Sider>
				<Layout className='main-layout__container'>
					<Header className='main-layout__container--header'>
						{collapsed ? (
							<MenuUnfoldOutlined
								className='main-layout__container--header__icon'
								onClick={() => setCollapsed(!collapsed)}
							/>
						) : (
							<MenuFoldOutlined
								className='main-layout__container--header__icon'
								onClick={() => setCollapsed(!collapsed)}
							/>
						)}
						<HeaderWishlist />
					</Header>
					<Content onClick={() => setCollapsed(true)} className='main-layout__container--content'>
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