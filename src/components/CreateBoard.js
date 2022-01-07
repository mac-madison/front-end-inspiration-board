import { useState } from 'react';

const CreateBoard = (props) => {

    const [title, setTitle] = useState('');
    const [owner, setOwner] = useState('');
    const handleTitleChange = (e) => { setTitle(e.target.value) };
    const handleOwnerChange = (e) => { setOwner(e.target.value) };

    const submitNewBoard = (e) => {
    e.preventDefault();
    props.createNewBoard({ title, owner});
    setTitle('');
    setOwner('');
    };

return (<form onSubmit={submitNewBoard} className='new-board-form'>
        <label>Title</label>
        <input type="text"
        value={title}
        onChange={handleTitleChange}
        className={((title.length === 0) || (title.length > 40)) ? 'invalid-form-input' : ''}></input>
        <label>Owner's Name</label>
        <input type="text"
        value={owner}
        onChange={handleOwnerChange}
        className={((owner.length === 0) || (owner.length > 40)) ? 'invalid-form-input' : ''}></input>
        <p>Preview: {title} - {owner}</p>
        <input type="Submit"
        disabled={((title.length === 0) || (owner.length === 0) || (title.length > 40) || (owner.length > 40))}
        className='new-board-form-submit-btn'></input>
        </form>);
}

export default CreateBoard;