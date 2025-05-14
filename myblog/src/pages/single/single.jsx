import './single.css'
import Sidebar  from '../../components/Sidebar/Sidebar'
import SinglePost from '../../components/SinglePost/SinglePost'

const single = () => {
  return (
    <div className='single'>
      <SinglePost/>
      <Sidebar/>

    </div>
  )
}

export default single