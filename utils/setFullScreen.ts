const setFullScreen = (): Promise<void> | any => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.fullscreenEnabled &&
      document.documentElement
        .requestFullscreen()
        .catch((e) => console.log("Fullscreen error:", e));
  }
};

export default setFullScreen;
