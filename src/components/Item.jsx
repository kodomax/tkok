
const Item = ({ item }) => {
  return (
    <div className='grow min-w-[300px] h-[300px] max-w-[400px] rounded-3xl bg-gray-200'>
      <p className='w-[200px]'>
        {item.name}
      </p>
    </div>
  )
};

export default Item;