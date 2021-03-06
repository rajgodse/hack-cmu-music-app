const randomizedSerialDictatorship = (userPreferences, targetLength) => {
  const shuffledPreferences = shuffleArray(userPreferences);
  let playlist = [];
  let i = 0;
  while (targetLength > 0 && i < shufflesPreferences.length) {
    const songs = shuffledPreferences[i].songs;
    playlist = playlist.concat(songs.slice(0, targetLength));
    targetLength -= songs.length;
  }
  return playlist;
};

const maximizeObjective = (objective) => {
  return (userPreferences, targetLength) => {
    return userPreferences
      .map((x) => x.songs)
      .reduce((x, y) => x.concat(y))
      .map((song) => {
        song;
        value: evaluateSong(userPreferences, s, objective);
      })
      .sort((a, b) => b.utility - a.utility)
      .map((x) => x.song)
      .slice(0, targetLength);
  };
};

const utilityObjective = (array) => {
  return array.reduce((x, y) => x + y);
};

const utilitarianAssignment = maximizeObjective(utilityObjective);

const egalitarianObjective = (array) => {
  return Math.min(...array);
};

const egalitarianAssignment = maximizeObjective(egalitarianObjective);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const evaluateSong = (userPreferences, song, objective) => {
  return objective(userPreferences.map((pref) => evaluate(pref, song)));
};

const evaluate = (userPreference, song) => {
  return 0;
};

const approvalBasedAllotment = (artistData, targetLength) => {
  console.log(artistData);
  artistData.sort((a, b) => b.approval - a.approval);
  let i = 0;
  let playlist = [];
  while (targetLength > 0 && i < artistData.length) {
    playlist = playlist.concat(artistData.songs.slice(0, targetLength));
    targetLength -= artistData.songs.length;
  }
  console.log(playlist);
  return playlist;
};

module.exports = {
  utilitarianAssignment,
  egalitarianAssignment,
  randomizedSerialDictatorship,
  approvalBasedAllotment,
};
