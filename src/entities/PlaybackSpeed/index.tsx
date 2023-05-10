import { Button } from 'react-bootstrap';
import { handleClick } from 'shared/lib/handleKeyboardClick';
import { IHotkeyParams } from 'shared/constants/hotkeys';
import './styles.scss';

interface IPlaybackSpeedProps {
  params: IHotkeyParams;
}

const PlaybackSpeed = ({ params }: IPlaybackSpeedProps) => {
  return (
    <div className="playback-speed">
      {params.map((hParams) => (
        <div
          className="playback-speed__elem"
          key={hParams.key}
          data-testid="playback-speed-option"
        >
          <Button
            className="playback-speed__elem__btn"
            onClick={() => handleClick(hParams.key)}
            data-testid="playback-speed-btn"
          >
            Ctrl + {hParams.key}
          </Button>
          <p className="playback-speed__elem__text">
            To set playback speed to {hParams.action}x
          </p>
        </div>
      ))}
    </div>
  );
};

export default PlaybackSpeed;
