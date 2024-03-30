import ClassProvider from '../../context/class.context'
import Class from './Class'
import './index.scss'

function index() {
  return (
    <ClassProvider >
        <Class />
    </ClassProvider>
  )
}

export default index
