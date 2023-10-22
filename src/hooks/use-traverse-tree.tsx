import { Explorer } from "../App";

const useTravrseTree = () => {
  function insertNode(
    tree: Explorer,
    folderId: string,
    item: string,
    isFolder: boolean
  ) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime().toString(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }

    let latestNode: Explorer[];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  }
  return { insertNode };
};
export default useTravrseTree;
