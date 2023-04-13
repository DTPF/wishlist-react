import { useContext } from 'react'
import UserContext from 'context/user/UserContext'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import { SlidersOutlined } from '@ant-design/icons'
import './filterDropdown.scss'

export default function FilterDropdown() {
	const { dbUser, updateUser } = useContext(UserContext)
	const { wishlistsOrder, wishlistsDirection } = dbUser.wishlistsInfo

	const handleUpdateOrder = (type: string) => {
		const wishlistsInfo = { ...dbUser.wishlistsInfo, wishlistsOrder: type }
		updateUser({ wishlistsInfo })
	}

	const handleUpdateDirection = () => {
		const direction = () => {
			if (wishlistsDirection === 'desc') return 'asc'
			return 'desc'
		}
		const wishlistsInfo = { ...dbUser.wishlistsInfo, wishlistsDirection: direction() }
		updateUser({ wishlistsInfo })
	}

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<div
					className={wishlistsOrder === 'updatedAt' ? 'filter-dropdown-active' : ''}
					onClick={() => handleUpdateOrder('updatedAt')}>
					Última actualización
				</div>
			),
		},
		{
			key: '2',
			label: (
				<div
					className={wishlistsOrder === 'name' ? 'filter-dropdown-active' : ''}
					onClick={() => handleUpdateOrder('name')}>
					Nombre
				</div>
			),
		},
		{
			key: '3',
			label: (
				<div
					className={wishlistsOrder === 'createdAt' ? 'filter-dropdown-active' : ''}
					onClick={() => handleUpdateOrder('createdAt')}>
					Fecha de creación
				</div>
			),
		},
		{
			key: '4',
			label: (
				<div
					className='filter-dropdown-order'
					onClick={() => handleUpdateDirection()}
				>
					Orden: <small>{wishlistsDirection === 'desc' ? 'Descendente' : 'Ascendente'}</small>
				</div>
			),
		},
	]

	return (
		<Dropdown className='filter-dropdown' menu={{ items }} placement="bottomLeft" arrow>
			<SlidersOutlined />
		</Dropdown>
	)
}