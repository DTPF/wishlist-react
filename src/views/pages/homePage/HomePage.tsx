import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import WishlistContext from 'context/wishlist/WishlistContext'
import WishlistComponent from 'views/components/wishlistComponent'
import HelmetSEO from 'utils/helmetSEO'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from 'context/user/UserContext'

export default function HomePage() {
  const { initWishlistsByUserId } = useContext(WishlistContext)
  const { dbUser, initGetUser } = useContext(UserContext)
  const params = useParams()
  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    initGetUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated])

  useEffect(() => {
    initWishlistsByUserId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser._id])

  const setTitle = () => {
    if (!params.isCompleted) return 'Todo'
    if (params.isCompleted === 'active') return 'Activo'
    return 'Completado'
  }

  return (
    <HelmetSEO
      title={`Wishlist | ${setTitle()}`}
      description='Wishlist Page'
    >
      <WishlistComponent params={params} />
    </HelmetSEO>
  )
}