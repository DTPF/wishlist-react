import { WishlistProvider } from './providers/WishlistProvider';
import dbIndexed from './indexedDB';
import Routes from './routes/Routes';

export default function App() {
  dbIndexed();
  return (
    <WishlistProvider>
      <Routes />
    </WishlistProvider>
  );
}
