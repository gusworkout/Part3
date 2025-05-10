const Note =({name, toggleNumber}) => {

  return (
    <li className="nams">
    {name.name} {name.number}
    <button onClick={toggleNumber}> Delete</button>
    </li>
  )
}

export default Note