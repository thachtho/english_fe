import Button from './UiElements/Button'

interface IProps {
  handleAdd?: () => void,
  handleImportExcell?: () => void,
  isButtonAdd?: boolean,
  isButtonImportExcell?: boolean,
}

function HeaderAddElementComponent({
  handleAdd,
  handleImportExcell,
  isButtonAdd = true,
  isButtonImportExcell = true
}: IProps) {
  return (
    <>
      { isButtonAdd && 
        <Button 
            className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer mr-2'
            handleClick={handleAdd}
            text='Add' 
        />
      }

      { isButtonImportExcell && 
        <Button 
          className='inline-flex items-center justify-center rounded-md bg-primary py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-5 cursor-pointer'
          handleClick={handleImportExcell}
          text='Import excel' 
        />  
      }
    </>
 
  )
}

export default HeaderAddElementComponent
