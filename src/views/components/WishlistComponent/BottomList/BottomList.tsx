import './BottomList.scss';

export default function BottomList() {

  const handleClickDelete = () => { }

  return (
    <div className='bottom-list'>
      <p className='bottom-list__delete-completed' onClick={() => handleClickDelete()}>
        Borrar completado
      </p>
    </div>
  )
}