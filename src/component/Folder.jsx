import { useState } from "react";

export function Folder({ files, setFiles }) {
  //number for session folder
  const [number, setNumber] = useState(1);
  //find id to show icon
  const [id, setId] = useState(0);
  //input for add file
  const [idInput, setIdInput] = useState(null);
  //set text input
  const [textInput, setInput] = useState("");

  //function for add folder root
  function handelFolder() {
    setNumber(number + 1);
    const file = {
      type: "folder",
      show: false,
      name: `session ${number}`,
      id: Math.floor(Math.random() * 1000),
      children: [],
    };
    setFiles([...files, file]);
  }

  //function for showIcon
  function handelShowIcon(iD) {
    setId(iD);
    files.find((item) => {
      if (item.id === iD) return (item.show = !item.show);
    });
    setFiles([...files]);
  }

  //function delete folder
  function handelDelete() {
    setFiles(files.filter((item) => item.id !== id));
  }

  //function add subfile
  function handelInput(e) {
    setInput(e.target.value);
    if (e.key === "Enter") {
      if (textInput !== "") {
        const file = {
          name: textInput,
          id: Math.floor(Math.random() * 1000),
          children: [],
        };

        const child = files.find((item) => {
          if (item.id === idInput)
            return (item.children = [...item.children, file]);
        });
        console.log(child);
        setFiles([...files]);
        e.target.value = "";
      }
      console.log(files);
    }
  }

  return (
    <>
      <button onClick={handelFolder}>
        <i className="fa fa-folder"></i> Root
      </button>
      <ul>
        {files.map((folder) => (
          <div className="folder">
            <li onClick={() => handelShowIcon(folder.id)} key={folder.id}>
              <i className="fa fa-folder"></i>
              {" " + folder.name}
            </li>
            <ul>
              {folder.children.map((item) => (
                <>
                  {item.name.split(".")[1].toLowerCase() === "html" && (
                    <li>
                      <i className="fa fa-html5">{" " + item.name}</i>
                    </li>
                  )}

                  {item.name.split(".")[1].toLowerCase() === "txt" && (
                    <li>
                      <i className="fa fa-file-text">{" " + item.name}</i>
                    </li>
                  )}
                  {item.name.split(".")[1].toLowerCase() === "css" && (
                    <li>
                      <i className="fa fa-css3">{" " + item.name}</i>
                    </li>
                  )}
                </>
              ))}
            </ul>

            {idInput === folder.id ? (
              <div className="enterFile">
                <input
                  type="text"
                  onKeyUp={handelInput}
                  placeholder="file name"
                />
                <i class="material-icons" onClick={() => setIdInput(null)}>
                  cancel
                </i>
              </div>
            ) : (
              folder.show && (
                <div className="icons">
                  <i
                    className="fa fa-file icon"
                    onClick={() => setIdInput(folder.id)}
                  ></i>
                  <i className="fa fa-folder icon"></i>
                  <i className="fa fa-trash icon" onClick={handelDelete}></i>
                </div>
              )
            )}
          </div>
        ))}
      </ul>
    </>
  );
}
