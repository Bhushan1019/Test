import { useEffect, useState } from "react";
import SearchBar from "./components/TopBar/SearchBar";
import { DirectoryContent, Volume } from "./types";
import { invoke } from "@tauri-apps/api";
import VolumeList from "./components/MainBody/Volumes/VolumeList";
import { openDirectory } from "./ipc";
import { updateDirectoryContents } from "./state/slices/currentDirectorySlice";
import { useAppDispatch } from "./state/hooks";
import useNavigation from "./hooks/useNavigation";
import FolderNavigation from "./components/TopBar/FolderNavigation";

function App() {
  const [volumes, setVolumes] = useState<Volume[]>([]);
  const dispatch = useAppDispatch();

  const [searchResults, setSearchResults] = useState<DirectoryContent[]>([]);

  const {
    pathHistory,
    historyPlace,
    setHistoryPlace,
    onBackArrowClick,
    onForwardArrowClick,
    canGoBackward,
    canGoForward,
    setCurrentVolume,
  } = useNavigation(searchResults, setSearchResults);

  async function getNewDirectoryContents() {
    const contents = await openDirectory(pathHistory[historyPlace]);
    dispatch(updateDirectoryContents(contents));
  }

  async function onVolumeClick(mountpoint: string) {
    if (pathHistory[pathHistory.length - 1] != mountpoint) {
      pathHistory.push(mountpoint);
    }
    setHistoryPlace(pathHistory.length - 1);
    setCurrentVolume(mountpoint);

    await getNewDirectoryContents();
  }

  const getVolumes = async () => {
    if (volumes.length > 0) {
      return;
    }

    const newVolumes = await invoke<Volume[]>("get_volumes");
    setVolumes(newVolumes);
  };

  let render = 0;

  useEffect(() => {
    if (render === 0) {
      getVolumes().catch(console.error);
    }

    render += 1;
  }, []);

  useEffect(() => {
    if (pathHistory[historyPlace] == "") {
      setCurrentVolume("");
      return;
    }

    getNewDirectoryContents().catch(console.error);
  }, [historyPlace]);

  return (
    <div>
      <div className="p-4">
        <FolderNavigation
          onBackArrowClick={onBackArrowClick}
          canGoBackward={canGoBackward()}
          onForwardArrowClick={onForwardArrowClick}
          canGoForward={canGoForward()}
        />
        <div className="pb-5">
          <SearchBar />
          <div className="w-7/12">
            <VolumeList volumes={volumes} onClick={onVolumeClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
