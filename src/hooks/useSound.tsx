import { useEffect, useRef, useState } from 'react';

function useSound() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audio = useRef<HTMLAudioElement>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  useEffect(() => {
    if (audio.current) {
      if (isPlaying) {
        (audio.current as HTMLAudioElement).play();
      } else {
        (audio.current as HTMLAudioElement).pause();
      }
    }
  }, [isPlaying]);

  const waitPauseAndSetnullSrc = () => {
    if (audio.current) {
      return new Promise((resolve) => {
        (audio.current as HTMLAudioElement).pause();
        setIsPlaying(false);
        setAudioSrc(null);
        resolve(true);
      });
    }
  };

  const handleChangeSource = async (src: string) => {
    await waitPauseAndSetnullSrc();
    setAudioSrc(src);
    setIsPlaying(true);
  };

  return {
    isPlaying,
    setIsPlaying,
    audioSrc,
    setAudioSrc,
    audio,
    handleChangeSource,
  };
}

export default useSound;
