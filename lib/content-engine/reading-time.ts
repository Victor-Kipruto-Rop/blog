import readingTime from "reading-time";

export function estimateReadingTime(content: string): string {
  return readingTime(content).text;
}
