import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DB_NAME_AMAZEN, DB_VERSION, WISHLIST } from '../../../../indexedDB/config';
import { EMAIL } from '../../../../providers/WishlistProvider';
import { RiSendPlaneFill } from 'react-icons/ri';
import './PostNewItem.scss';

export default function PostNewItem({ wishlist, setWishlist }) {
  const form = useRef();
  const [inputs, setInputs] = useState({
    id: uuidv4(),
    userId: EMAIL,
    title: undefined,
    link: undefined,
    status: 'active',
    createdAt: Date.now()
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.title) {
      return alert('Escribe algo!');
    }
    const openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

    openRequest.onsuccess = async function (e) {
      const db = e.target.result;
      let transaction = db.transaction([WISHLIST], "readwrite");
      let list = transaction.objectStore(WISHLIST);
      let request = list.add(inputs);

      request.onsuccess = function () {
        form.current.reset();
        let newList = [...wishlist];
        inputs.id = uuidv4();
        inputs.createdAt = Date.now();
        newList.push(inputs);
        setWishlist(newList);
      };

      request.onerror = function () {
        alert(`~${inputs.title}~ ya está en la lista🤔`)
      };
    }

    openRequest.onerror = function () {
      console.log('Server error');
    }
  }

  const handleChangeForm = (e) => {
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