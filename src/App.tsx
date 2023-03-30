import { RouterProvider } from 'react-router-dom';
import router from './routes/router';
import WishlistProvider from 'context/wishlist/WishlistProvider';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <WishlistProvider>
      <Toaster />
      <RouterProvider
        router={router}
        fallbackElement={<></>}
      />
    </WishlistProvider>
  );
}