import React from "react";

interface PersianNumberProps {
  number: number | string;
  className?: string;
}

const PersianNumber: React.FC<PersianNumberProps> = ({ number, className }) => {
  const toPersianDigits = (num: string): string => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";

    return num.replace(/[0-9]/g, (digit) => persianDigits[+digit]);
  };

  const persianNumber = toPersianDigits(number.toString());

  return <span className={className}>{persianNumber}</span>;
};

export default PersianNumber;
