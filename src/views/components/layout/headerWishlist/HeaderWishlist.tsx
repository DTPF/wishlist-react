import { useContext, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from 'context/user/UserContext'
import OutsideClickHandler from 'react-outside-click-handler'
import './headerWishlist.scss'

export default function HeaderWishlist() {
  const { user, loginWithRedirect, logout }: any = useAuth0()
  const { dbUser }: any = useContext(UserContext)
  const [showPopover, setShowPopover] = useState(false)

  return (
    <div className='header-wishlist'>
      <button onClick={user ? undefined : () => loginWithRedirect()} className='header-wishlist__authentication'>
        {user ? (
          <div onClick={() => setShowPopover(!showPopover)} className='header-wishlist__authentication--profile-image'>
            <img src={user?.picture} alt={`Imagen de usuario de ${user?.nickname}`} />
          </div>
        ) : (
          <p>Identifícate</p>
        )}
        {showPopover && (
          <OutsideClickHandler onOutsideClick={() => setShowPopover(false)}>
            <span className='header-wishlist__authentication--popover'>
              <div className='header-wishlist__authentication--popover__logout'>
                <div>
                  🇪🇸 | 🇬🇧
                </div>
                <p onClick={() => logout()}>
                  Cerrar sesión
                </p>
              </div>
            </span>
          </OutsideClickHandler>
        )}
      </button>

      <div className='header-wishlist__title'>
        <h1>Lista de {dbUser.name ? dbUser.name : user?.given_name}</h1>
      </div>
    </div>
  )
}