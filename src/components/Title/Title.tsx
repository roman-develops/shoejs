import './title.css'

interface Props {
  text: string;
}

const Title = ({text}: Props) => {
  return (
    <h1 className='title'>{text}</h1>
  )
}

export default Title