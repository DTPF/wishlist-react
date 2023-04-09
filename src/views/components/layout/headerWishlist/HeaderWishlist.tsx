import { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from 'context/user/UserContext'
import './headerWishlist.scss'

export default function HeaderWishlist() {
  const { user }: any = useAuth0()
  const { dbUser }: any = useContext(UserContext)

  return (
    <div className='header-wishlist'>
      <div className='header-wishlist__title'>
        <h1>Lista de {dbUser.name ? dbUser.name : user?.given_name}</h1>
      </div>
    </div>
  )
}