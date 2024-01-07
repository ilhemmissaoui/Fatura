import React, { useState } from "react";
import useClipboard from "react-use-clipboard";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { LinkSchema } from "../../../api/schemas/LinkSchema";

const ReportItems = ({ url, id }) => {
  const clipboard = useClipboard();
  const [isOpened, setIsOpened] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(LinkSchema),
  });

  const onSubmit = ({ newLink }) => {
    console.log(newLink);
    onUpdate(newLink);
  };

  const onDelete = () => {
    console.log(id);
    Meteor.call("deleteLinks", id, (e, r) => {
      if (e) console.log(e);
    });
  };
  const onUpdate = (newLink) => {
    console.log(id);
    Meteor.call("updatelinks", id, newLink, (e, r) => {
      if (e) console.log(e);
      handleClose();
    });
  };
  const handleClose = () => setIsOpened(false);
  const handleShow = () => setIsOpened(true);

  return (
    <>
      <tr>
        <td>{url}</td>
        <div className="btn-list flex-nowrap">
          <Link
            to="#"
            onclick={(_) => console.log("clicked")}
            className="btn btn-success"
          >
            Copy
          </Link>
          <Link to="#" onClick={(_) => onDelete()} className="btn btn-danger">
            Delete
          </Link>
          <Link to="#" onClick={handleShow} className="btn btn-warning">
            Update
          </Link>
        </div>
      </tr>
      <Modal
        show={isOpened}
        // fade={false}
        animation={false}
        // style={{ width: "200px", display: "block" }}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="newLink" ref={register} />
            <div className="invalid-feedback d-block">
              {errors.url?.message}
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default ReportItems;
