import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EMAIL } from '../../../../providers/WishlistProvider';
import { RiSendPlaneFill } from 'react-icons/ri';
import './PostNewItem.scss';

export default function PostNewItem({ wishlist, setWishlist }: any) {
  const form: any = useRef();
  const [inputs, setInputs] = useState({
    id: uuidv4(),
    userId: EMAIL,
    title: undefined,
    link: undefined,
    status: 'active',
    createdAt: Date.now()
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!inputs.title) {
      return alert('Escribe algo!');
    }
  }

  const handleChangeForm = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className='post-new-item-form'>
      <form className='post-new-item-form__form' ref={form} onSubmit={(e) => handleSubmit(e)}>
        <input
          name='title'
          type='text'
          placeholder='Añade algo nuevo'
          onChange={(e) => handleChangeForm(e)}
        />
        <button type='submit'><RiSendPlaneFill /></button>
      </form>
    </div>
  )
}