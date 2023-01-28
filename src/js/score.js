const key = "SCORES";
export function isScore(value) {
    return typeof value === "object"
        && value != null
        && 'wpm' in value
        && 'date' in value;
}
export function getScores() {
    try {
        return JSON.parse(localStorage.getItem(key) ?? "[]");
    }
    catch (e) {
    }
    return [];
}
export function setScores(scores) {
    localStorage.setItem(key, JSON.stringify(scores));
}
export function addScore(score) {
    setScores([...getScores(), score]);
}
//# sourceMappingURL=score.js.map