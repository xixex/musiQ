export const prepareTracksNextPrev = (tracks) => {
  const preparedTracks = [...tracks];

  for (let i = 0; i < preparedTracks.length; i++) {
    preparedTracks[i].duration = 0;
    preparedTracks[i].currentTime = 0;
    preparedTracks[i].nextTrack = preparedTracks[i + 1];
    preparedTracks[i].previousTrack = preparedTracks[i - 1];
  }

  if (preparedTracks.length > 0) {
    preparedTracks[0].previousTrack = preparedTracks[preparedTracks.length - 1];
    preparedTracks[preparedTracks.length - 1].nextTrack = preparedTracks[0];
  }

  return preparedTracks;
};
