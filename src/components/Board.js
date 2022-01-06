import React from "react";
import { Button, Card } from "react-bootstrap";

const Board = ({ board, deleteBoard }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded h-90">
        <Card.Body>
          <Card.Title>{`${board.title}`}</Card.Title>
          <Card.Text>
            <div>
              <strong>Owner:</strong>
              {board.owner}
            </div>
          </Card.Text>

          <Button
            onClick={() => {
              deleteBoard(board.id);
            }}
            style={{ borderRadius: "20px" }}
            className="w-100"
            variant="secondary"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Board;
