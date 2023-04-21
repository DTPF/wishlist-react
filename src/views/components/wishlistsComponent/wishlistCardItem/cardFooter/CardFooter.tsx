import { useContext } from 'react'
import UserContext from 'context/user/UserContext'
import WishlistContext from 'context/wishlist/WishlistContext'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import { BgColorsOutlined, DeleteOutlined } from '@ant-design/icons'
import { Popconfirm, Popover } from 'antd'
import './cardFooter.scss'
import { ChromePicker } from 'react-color'

export default function CardFooter({ wishlistItem, showPopover, setShowPopover }: any) {
	const { removeWishlist } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const { t: translate } = useTranslation();

	return (
		<footer
			className='wishlist-card-footer'
			style={{ backgroundColor: wishlistItem.backgroundColor, color: wishlistItem.color }}
		>
			<Popconfirm
				title={translate('deleteList')}
				description={translate('deleteListMessage')}
				onConfirm={() => removeWishlist(wishlistItem._id)}
				okText={translate('delete')}
				cancelText={translate('cancel')}
				style={{ backgroundColor: '#fff' }}
				className='popover-card-footer'
			>
				<DeleteOutlined />
			</Popconfirm>
			<p className='wishlist-card-footer__last-modified'>
				{translate('lastModified')} <Moment locale={dbUser.appInfo.language} fromNow>{wishlistItem.updatedAt}</Moment>
			</p>
			<Popover content={<ChromePicker />} placement="bottom">
				<BgColorsOutlined style={{ fontSize: '1.1rem' }} />
			</Popover>
		</footer>
	)
}