import React, { useEffect, useState } from "react";
import moment from "jalali-moment";

interface PersianDateProps {
  createdAt: string | undefined | null;
  className?: string;
}

const PersianDate: React.FC<PersianDateProps> = ({ createdAt, className }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (!createdAt) {
      setFormattedDate("تاریخ نامعتبر");

      return;
    }

    const convertNumbersToPersian = (text: string): string => {
      const persianNumbers = "۰۱۲۳۴۵۶۷۸۹";

      return text.replace(/[0-9]/g, (digit) => persianNumbers[+digit]);
    };

    const convertToPersianDate = (isoDate: string): string => {
      const formattedDate = moment(isoDate, moment.ISO_8601, true)
        .locale("fa")
        .format("YYYY/MM/DD");

      return convertNumbersToPersian(formattedDate);
    };

    try {
      const date = convertToPersianDate(createdAt);

      setFormattedDate(date);
    } catch (error) {
      setFormattedDate("تاریخ نامعتبر");
    }
  }, [createdAt]);

  return <span className={className}>{formattedDate}</span>;
};

export default PersianDate;
