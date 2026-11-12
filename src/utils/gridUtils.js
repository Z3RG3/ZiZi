/**
 * Calculates total squares from total hours and minutes per square.
 */
export function calculateTotalSquares(totalHours, unitSizeMinutes) {
    if (!totalHours || !unitSizeMinutes || unitSizeMinutes <= 0 || totalHours <= 0) return 0; 
    const totalMinutes = Math.round(totalHours * 60);
    return Math.max(1, Math.ceil(totalMinutes / unitSizeMinutes));
}
/**
 * Calculates balanced columns and rows to fit squares neatly in a container.
 */
export function calculateGridDimensions(totalSquares, aspectRatio = 1.6) {
    if(!totalSquares || !aspectRatio || totalSquares <= 0) return { cols: 1, rows: 1 };
    const cols = Math.ceil(Math.sqrt(totalSquares * aspectRatio))
    const rows = Math.ceil(totalSquares / cols)
    return { cols, rows }
}
/**
 * Formats square counts back into readable hours and minutes (e.g., "2h 30m").
 */
export function calculateSquaresToEstimate(squareCount, unitSizeMinutes) {
    if(!squareCount || !unitSizeMinutes || squareCount <= 0) return 0;
    const totalMinutes = squareCount * unitSizeMinutes;
    const estHours = Math.floor(totalMinutes / 60);
    const estMins = totalMinutes % 60;

    if (estHours === 0) return `${estMins}m`;
    if (estMins === 0) return `${estHours}h`;
    return `${estHours}h ${estMins}m`;        
}