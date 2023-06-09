import {
  createContext,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import Hls from 'hls.js';

import { coursesActions } from '../store/ducks/courses';
import { HOTKEY_PARAMS } from '../constants/hotkeys';
import './styles.scss';

type IContext = IContextFunction | null;
type IContextFunction = (newVideo: IVideo | null) => void;

export const PipContext = createContext<IContext>(null);

interface IVideo {
  courseId: string;
  link: string;
  lessonId: string;
  autoplay?: boolean;
  timing?: number;
  handleOnClose?: (mediaElement: HTMLMediaElement) => void;
}

const PipProvider = ({ children }: PropsWithChildren) => {
  const [video, setVideo] = useState<IVideo | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const dispatch = useDispatch();

  // Set new video once pip is called
  useEffect(() => {
    if (Hls.isSupported() && video) {
      var hls = new Hls();
      hls.loadSource(video.link);
      hls.attachMedia(videoRef.current!);
      if (video.autoplay && videoRef.current) {
        videoRef.current.play();
      }
      if (video.timing) {
        videoRef.current!.currentTime = video.timing;
      }
    }
  }, [video]);

  // Handle hotkeys for playback speed
  useEffect(() => {
    const handlePlaybackChange = (event: KeyboardEvent) => {
      const newPlaybackSpeed = HOTKEY_PARAMS.find(
        (h) => h.key === event.key
      )?.action;
      if (newPlaybackSpeed) {
        if (videoRef.current) {
          videoRef.current.playbackRate = parseInt(newPlaybackSpeed);
        }
        toast.success(`Playback speed changed to ${newPlaybackSpeed}x`, {
          duration: 2000,
        });
      }
    };
    window.addEventListener('keydown', handlePlaybackChange);

    return () => {
      window.removeEventListener('keydown', handlePlaybackChange);
    };
  }, []);

  // Handle change of pip current video
  const updatePip = (newVideo: IVideo | null): void => {
    if (video && videoRef.current) {
      dispatch(
        coursesActions.changeProgress({
          courseId: video.courseId,
          lessonId: video.lessonId,
          timing: videoRef.current.currentTime,
        })
      );
      video.handleOnClose?.(videoRef.current);
    }

    setVideo(newVideo?.link ? newVideo : null);
  };

  return (
    <PipContext.Provider value={updatePip}>
      {children}
      {video && (
        <div className="pip">
          <div className="pip--container">
            <Button className="pip__btn" onClick={() => updatePip(null)}>
              x
            </Button>
            <video className="pip__video" controls ref={videoRef}></video>
          </div>
        </div>
      )}
    </PipContext.Provider>
  );
};

export default PipProvider;
