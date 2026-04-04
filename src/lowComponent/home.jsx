import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import FormControl from "react-bootstrap/FormControl";

const Home = () => {
  
  const [count, setcount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput.trim() !== "") {
      const newItem = {
        id: Math.random(),
        value: userInput,
      };
      setList((prevList) => [...prevList, newItem]);
      setUserInput("");
    }
  };

  const deleteItem = (key) => {
    setList((prevList) => prevList.filter((item) => item.id !== key));
  };

  const openEditModal = (index) => {
    setEditingIndex(index);
    setEditingValue(list[index]?.value ?? "");
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingIndex(null);
    setEditingValue("");
  };

  const saveEdit = () => {
    if (editingIndex == null || editingValue.trim() === "") {
      return;
    }
    setList((prevList) =>
      prevList.map((item, i) =>
        i === editingIndex ? { ...item, value: editingValue } : item
      )
    );
    closeEditModal();
  };

  useEffect(() => {}, [count]);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-body">
                <p>{count}</p>
                <h5 className="card-title">Counter</h5>
                <button
                  className="btn btn-primary me-2"
                  onClick={() => setcount(count + 1)}
                >
                  +
                </button>
                {count > 0 && (
                  <button
                    className="btn btn-danger"
                    onClick={() => setcount(count - 1)}
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-6">
            <strong>TODO LIST APP</strong>
            <hr />

            <div className="mb-3">
              <input
                type="text"
                placeholder="add item . . . "
                className="form-control form-control-lg"
                value={userInput}
                onChange={(item) => updateInput(item.target.value)}
                aria-label="add something"
              />
              <div>
                <button
                  type="button"
                  className="btn btn-dark mt-2"
                  onClick={() => addItem()}
                >
                  {" "}
                  ADD{" "}
                </button>
              </div>
            </div>
            <ListGroup>
              {/* map over and print items */}
              {list.map((item, index) => {
                return (
                  <div key={item.id}>
                    <ListGroup.Item
                      as="div"
                      variant="dark"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {item.value}
                      <span>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="light"
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete
                        </Button>
                        <Button variant="light" onClick={() => openEditModal(index)}>
                          Edit
                        </Button>
                      </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>

            <Modal show={showEditModal} onHide={closeEditModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Todo</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormControl
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  placeholder="Update todo"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeEditModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={saveEdit}>
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
