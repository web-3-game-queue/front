export abstract class Utils {
    public static RandomInRange = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min) + min);

    public static Sleep = (timeoutMillis: number) =>
        new Promise(resolve => setTimeout(resolve, timeoutMillis));
}