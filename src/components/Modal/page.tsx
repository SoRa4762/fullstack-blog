"use client";

import { useState } from "react";
import Modal from "react-modal";
import styles from "./page.module.css";
import { PostType } from "@app/helper/types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#111",
    color: "#bbb",
  },
};

const EditModal = ({ title, img, desc, content, _id }: PostType) => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const ModalClicked = () => setModalIsOpen((prev) => !prev);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;
    // const _id = _id;

    try {
      await fetch(`/api/posts/${_id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          _id,
        }),
      });
      //   mutate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button className={styles.editBtn} onClick={ModalClicked}>
        Edit Post
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={ModalClicked}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className={styles.modal_header}>
          <h2>Edit Post</h2>
          <button className={styles.close} onClick={ModalClicked}>
            X
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="input"
            defaultValue={title}
          />
          <input
            type="text"
            placeholder="Desc"
            className="input"
            defaultValue={desc}
          />
          <input
            type="text"
            placeholder="Image"
            className="input"
            defaultValue={img}
          />
          <textarea
            cols={30}
            rows={10}
            placeholder="Content"
            className="input"
            defaultValue={content}
          />
          <button className="button" type="submit">
            Update Post
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default EditModal;
