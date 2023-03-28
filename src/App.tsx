import { RouterProvider } from 'react-router-dom';
import { WishlistProvider } from './providers/WishlistProvider';
import router from './routes/router';

export default function App() {
  return (
    <WishlistProvider>
      <RouterProvider
        router={router}
        fallbackElement={<></>}
      />
    </WishlistProvider>
  );
}
