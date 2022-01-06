import { useState } from "react";
import PropTypes from "prop-types";

const CreateBoard = (props) => {
  const [formFields, setFormFields] = useState({
    title: "",
    owner: "",
  });

  const onTitleChange = (event) => {
    setFormFields({
      ...formFields,
      title: event.target.value,
    });
  };

  const onOwnerChange = (event) => {
    setFormFields({
      ...formFields,
      owner: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    console.log("clicked");
    event.preventDefault();

    props.addBoardCallback({
      titleData: formFields.title,
      ownerData: formFields.owner,
    });

    setFormFields({
      owner: "",
      title: "",
    });
    props.hideBoard();
  };

  return (
    <form id="board-form" onSubmit={onFormSubmit}>
      <div class="form-group">
        <label class="form-label mt-4">Create A Board</label>
        <div class="form-floating mb-3">
          <input
            class="form-control"
            id="floatingInput"
            value={formFields.title}
            onChange={onTitleChange}
          />
          <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating">
          <input
            class="form-control"
            id="floatingPassword"
            value={formFields.owner}
            onChange={onOwnerChange}
          />
          <label for="floatingPassword">Owner</label>
        </div>
        <input type="submit" value="add board" />
      </div>
    </form>
  );
};

CreateBoard.propTypes = {
  addBoardCallback: PropTypes.func.isRequired,
  hideBoard: PropTypes.func.isRequired,
};

export default CreateBoard;
