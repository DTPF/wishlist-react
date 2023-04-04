import { useParams } from 'react-router-dom'
import WishlistComponent from 'views/components/wishlistComponent'
import HelmetSEO from 'utils/helmetSEO'

export default function WishlistPage() {
  const params = useParams()

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