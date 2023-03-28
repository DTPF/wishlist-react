import { v4 as uuidv4 } from 'uuid';

export const wishlistData = [
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: '1 JETech Funda para iPhone 13 6,1 Pulgadas, Anti-Amarillo Carcasa de Parachoques Prueba Golpes',
    link: '/comming-soon',
    status: 'active',
    createdAt: Date.now() + 1
  },
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: 'Pañales de mandril',
    status: 'active',
    createdAt: Date.now() + 2
  },
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: 'Cangrejos de río',
    status: 'completed',
    createdAt: Date.now() + 3
  },
  {
    id: uuidv4(),
    userId: 'm@mail.com',
    title: 'Maria',
    status: 'completed',
    createdAt: Date.now() + 4
  },
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: 'Anti-Amarillo Carcasa de Parachoques Prueba Golpes',
    link: '/comming-soon',
    status: 'active',
    createdAt: Date.now() + 5
  },
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: 'Junta de la trócola',
    status: 'active',
    createdAt: Date.now() + 6
  },
  {
    id: uuidv4(),
    userId: 'd@mail.com',
    title: 'Moto de gato programador',
    status: 'completed',
    createdAt: Date.now() + 7
  },
  {
    id: uuidv4(),
    userId: 'm@mail.com',
    title: 'Maria',
    status: 'completed',
    createdAt: Date.now() + 8
  }
]