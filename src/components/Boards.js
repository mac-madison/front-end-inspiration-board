import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

import Board from "./Board";

const Boards = ({ boards, loading, deleteBoard }) => {
  return (
    <Fragment>
      <Row>
        {loading &&
          boards.map((board) => (
            <Col sm={12} md={6} lg={4} key={board.id}>
              <Board board={board} deleteBoard={deleteBoard} />
            </Col>
          ))}
      </Row>
    </Fragment>
  );
};

export default Boards;
