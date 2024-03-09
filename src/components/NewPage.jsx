
import { useParams } from 'react-router-dom';


const NewPage = () => {
    const { hoverColor } = useParams();
  return (
    <div style={{ backgroundColor: hoverColor, transition: 'background-color 0.5s' }}>NewPage</div>
  )
}

export default NewPage