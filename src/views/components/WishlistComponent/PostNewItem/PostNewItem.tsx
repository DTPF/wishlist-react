import { useState, useRef, useContext } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import './PostNewItem.scss';
import WishlistContext from 'context/wishlist/WishlistContext';

export default function PostNewItem() {
  const { addWishlist } = useContext(WishlistContext)
  const [inputs, setInputs] = useState({
    title: undefined,
    status: 'complete',
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
  const form: any = useRef();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!inputs.title) {
      return alert('Escribe algo!');
    }
    form.current.reset();
    addWishlist(inputs)
  }

  const handleChangeForm = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <article className='post-new-item-form'>
      <form className='post-new-item-form__form' ref={form} onSubmit={(e) => handleSubmit(e)}>
        <input
          name='title'
          type='text'
          placeholder='Añade algo nuevo'
          onChange={(e) => handleChangeForm(e)}
        />
        <button type='submit'><RiSendPlaneFill /></button>
      </form>
    </article>
  )
}