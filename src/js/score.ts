const key = "SCORES";

export interface Score {
  /**
   * Average WPM in that run
   */
  wpm: number;

  /**
   * UNIX-Timestamp
   */
  date: number;
}

export function isScore(value : unknown): value is Score {
  return typeof value === "object"
    && value != null
    && 'wpm' in value
    && 'date' in value;
}

export function getScores() : Score[] {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "[]");
  } catch (e) {
    // ignored
  }

  return []; // almost missed this one, thank you TypeScript!
}

export function setScores(scores : Score[]) {
  localStorage.setItem(key, JSON.stringify(scores));
}

export function addScore(score : Score) {
  setScores([...getScores(), score])
}
