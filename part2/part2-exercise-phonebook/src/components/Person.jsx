const Person = ({person, handleDelete}) => {
    return(
        <p key={person.name}>
            {person.name} {person.number}
            <button onClick={handleDelete}>delete</button>
        </p>
    )}

export default Person