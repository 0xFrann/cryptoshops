import { useEffect, useState } from "react";

const getBrowserFullScreenActive = (): boolean =>
  Boolean(
    process.browser &&
      (document["fullscreenElement"] ||
        document["webkitFullscreenElement"] ||
        document["mozFullScreenElement"] ||
        document["msFullscreenElement"])
  );

const useFullScreen = (): {
  isFullScreen: boolean;
  setFullScreen: (val: boolean) => void;
  toggleFullScreen: () => void;
} => {
  const [isFullScreen, setIsFullScreen] = useState(getBrowserFullScreenActive);

  const enterFullScreen = (): void => {
    if (!getBrowserFullScreenActive() && document.fullscreenEnabled) {
      (
        document.documentElement["requestFullscreen"]() ||
        document.documentElement["webkitRequestFullscreen"]() ||
        document.documentElement["mozRequestFullscreen"]() ||
        document.documentElement["msRequestFullscreen"]()
      ).catch((e) => console.log("Fullscreen error:", e));
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = (): void => {
    if (getBrowserFullScreenActive()) {
      document["exitFullscreen"]() ||
        document["webkitExitFullscreen"]() ||
        document["mozCancelFullScreen"]() ||
        document["msExitFullscreen"]();
    }
    setIsFullScreen(false);
  };

  const setFullScreen = (val: boolean): void => {
    if (val) {
      enterFullScreen();
    } else {
      exitFullScreen();
    }
  };

  const toggleFullScreen = (): void => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", () => {
      setIsFullScreen(getBrowserFullScreenActive());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isFullScreen, setFullScreen, toggleFullScreen };
};

export default useFullScreen;
