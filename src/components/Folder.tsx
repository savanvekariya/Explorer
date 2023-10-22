import { FormEvent, useEffect, useState } from "react";
import { Explorer } from "../App";

interface ExplorerProps {
  explorer: Explorer;
  handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
}

interface ShowInput {
  visible: boolean;
  isFolder: boolean;
}

const Folder = ({ explorer, handleInsertNode }: ExplorerProps) => {
  const [expand, setExpand] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<ShowInput>({
    visible: false,
    isFolder: false,
  });

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const onAddFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              Add Folder +
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              Add File +
            </button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "🗒️"}</span>
              <input
                type="text"
                className="inputContainer__input"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {explorer.items.map((exp) => (
            <Folder
              handleInsertNode={handleInsertNode}
              explorer={exp}
              key={exp.id}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <span className="file">🗒️{explorer.name}</span>;
  }
};

export default Folder;
