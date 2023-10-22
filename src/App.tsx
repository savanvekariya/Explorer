import { useState } from "react";
import "./App.css";
import Folder from "./components/Folder";
import explorer from "./data/folderData";
import useTravrseTree from "./hooks/use-traverse-tree";

export interface Explorer {
  id: string;
  name: string;
  isFolder: boolean;
  items: Explorer[];
}

function App() {
  const [explorerData, setExplorerData] = useState<Explorer>(explorer);

  const { insertNode } = useTravrseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setExplorerData(finalTree);
  };
  return (
    <>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />
    </>
  );
}

export default App;
