import { useContext } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import WishlistContext from 'context/wishlist/WishlistContext';
import PostNewItem from './postNewItem';
import WishlistItem from './wishListItem';
import StatusBar from './statusBar/StatusBar';
import Spinner from 'views/UI/spinner';
import { WishList } from 'interfaces/wishlist';
import './wishlistComponent.scss';

export default function WishlistComponent({ params }: any) {
  const { isLoading, currentWishlist, updateWishlist } = useContext(WishlistContext);

  const completedItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === true)

  const activeItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === false)

  function getStatus() {
    if (!params.isCompleted) return currentWishlist.wishlistItems
    if (params.isCompleted === 'active') return activeItems
    return completedItems
  }

  const reorder = (list: any, startIndex: any, endIndex: any) => {
    const result = [...list]
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const handleOnDragEng = (result: any) => {
    const { source, destination } = result
    if (!destination) return
    if (source.index === destination.index && source.droppableId === destination.droppableId) return

    const reorderList = reorder(currentWishlist.wishlistItems, source.index, destination.index)
    let orderedList: any = []
    reorderList.forEach((item, index) => {
      item.position = index
      orderedList.push(item)
    });
    updateWishlist(currentWishlist._id, { wishlistItems: orderedList })
  }

  return (
    <DragDropContext onDragEnd={(result: any) => handleOnDragEng(result)}>
      <section className='wishlist-component'>
        <StatusBar />
        {isLoading ? (
          <div className='wishlist-component__spinner'>
            <Spinner />
          </div>
        ) : (
          <>
            <div className='wishlist-component__empty-list-msg'>
              {getStatus().length === 0 && <div>Lista vacía...</div>}
            </div>
            <Droppable droppableId='wishlist-cards' direction='vertical'>
              {(droppableProvided) => (
                <div
                  ref={droppableProvided.innerRef}
                  {...droppableProvided.droppableProps}
                  className='wishlist-component__list'>
                  {getStatus().map((wishlistItem: any) => (
                    <Draggable key={wishlistItem.position} draggableId={wishlistItem.position.toString()} index={wishlistItem.position}>
                      {(draggableProvided) => (
                        <span
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          {...draggableProvided.dragHandleProps}

                        >
                          <WishlistItem
                            key={wishlistItem.id}
                            wishlistItem={wishlistItem}
                          />
                        </span>
                      )}
                    </Draggable>
                  ))}
                  {droppableProvided.placeholder}
                </div>
              )}
            </Droppable>

            {params.isCompleted !== 'completed' && <PostNewItem />}
          </>

        )}
      </section>
    </DragDropContext>
  )
}