import { Volume } from "../../../types";
import LoadingPlaceholder from "../Util/LoadingPlaceholder";
import VolumeComponent from "./VolumeComponent";

interface Props {
  volumes: Volume[];
  onClick: (mountpoint: string) => any;
}
const VolumeList = ({ volumes, onClick }: Props) => {
  return (
    <div className="space-x-4">
      {volumes.length == 0 ? (
        <LoadingPlaceholder />
      ) : (
        volumes.map((volume, idx) => (
          <VolumeComponent
            onClick={() => onClick(volume.mountpoint)}
            volume={volume}
            key={idx}
          />
        ))
      )}
    </div>
  );
};

export default VolumeList;
