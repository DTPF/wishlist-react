import { useState, useContext } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import { RiSendPlaneFill } from 'react-icons/ri'
import './postNewItem.scss'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'

export default function PostNewItem() {
  const { addNewWishlistItem } = useContext(WishlistContext)
  const [inputs, setInputs] = useState({
    wishlistItemId: uuidv4(),
    title: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!inputs.title) return toast.error('¡Escribe algo!')
    addNewWishlistItem(inputs)    
    setInputs({
      ...inputs,
      title: '',
    })
  }

  const handleChangeForm = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  return (
    <article className='post-new-item-form'>
      <form className='post-new-item-form__form' onSubmit={(e) => handleSubmit(e)}>
        <input
          name='title'
          type='text'
          placeholder='Añade algo nuevo'
          value={inputs.title}
          onChange={(e) => handleChangeForm(e)}
        />
        <button type='submit'><RiSendPlaneFill /></button>
      </form>
    </article>
  )
}