import { IUser } from "../../../../packages/types/dist";

function generateModelingCode({
  gender,
  naturalStat,
  height,
  level,
  createdAt,
  uniqueIndex,
}: Pick<IUser, "gender" | "naturalStat" | "height" | "level" | "createdAt"> & {
  uniqueIndex: number;
}): string {
  // Gender: 'M' or 'F'
  const genderCode = gender;

  // Surgery: N (Natural) or A (Artificial)
  const surgeryCode = naturalStat;

  // Height code based on gender and standards
  const heightCode = (() => {
    if (gender === "M") {
      if (height < 165) return "S";
      if (height <= 180) return "M";
      return "T";
    } else {
      if (height < 155) return "S";
      if (height <= 170) return "M";
      return "T";
    }
  })();

  // Level: 'B' | 'I' | 'P'
  const levelCode = level;

  // Year: Last 2 digits of the year
  const yearCode = createdAt
    ? createdAt.getFullYear().toString().slice(-2)
    : new Date().getFullYear().toString().slice(-2);

  // Unique ID for person, padded
  const idCode = String(uniqueIndex).padStart(2, "0");

  // Final modeling code
  return `${genderCode}${surgeryCode}${heightCode}-${levelCode}-${yearCode}${idCode}`;
}

export default generateModelingCode;
