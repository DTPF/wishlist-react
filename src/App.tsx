import { RouterProvider } from 'react-router-dom';
import { WishlistProvider } from './providers/WishlistProvider';
import router from './routes/router';
import dbIndexed from './indexedDB';

export default function App() {
  dbIndexed();
  return (
    <WishlistProvider>
      <RouterProvider
        router={router}
        fallbackElement={<></>}
      />
    </WishlistProvider>
  );
}
