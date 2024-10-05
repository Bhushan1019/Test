import { MouseEventHandler, useRef } from "react";
import { DirectoryContentType } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFolder } from "@fortawesome/free-solid-svg-icons";
import {
  selectContentIdx,
  unselectDirectoryContents,
} from "../../state/slices/currentDirectorySlice";
import { useAppDispatch } from "../../state/hooks";

interface Props {
  name: string;
  path: string;
  type: DirectoryContentType;
  onDoubleClick: MouseEventHandler<HTMLButtonElement>;
  idx: number;
}

export const DIRECTORY_ENTITY_ID = "directory-entity";

export default function DirectoryEntity({
  idx,
  name,
  type,
  onDoubleClick,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();

  return (
    <div
      title={name}
      className="overflow-ellipsis whitespace-nowrap overflow-hidden"
    >
      <button
        id={DIRECTORY_ENTITY_ID}
        className={`directory-entity bg-background hover:bg-bright cursor-pointer w-full h-7 flex`}
        onDoubleClick={(e) => {
          onDoubleClick(e);
          dispatch(unselectDirectoryContents());
        }}
        onClick={() => dispatch(selectContentIdx(idx))}
        ref={buttonRef}
      >
        <div className="mr-1 ml-1">
          <FontAwesomeIcon
            icon={type == "File" ? faFile : faFolder}
            size="lg"
            color={type == "File" ? "gray" : "#FFD54F"}
          />
        </div>
        {name}
      </button>
    </div>
  );
}
