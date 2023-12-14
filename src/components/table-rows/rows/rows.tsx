import { ArrowUpDown } from "lucide-react";
import { Button } from "../../ui/button";

export const AscHeader = ({
  column,
  children,
}: {
  children: React.ReactNode;
  column: any;
}) => {
  return (
    <Button
      variant="ghost"
      className="m-0 p-0"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export type TextRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const TextRow = ({ children, className }: TextRowProps) => {
  return <div className={className}>{children}</div>;
};

export type BooleanRowProps = {
  value: boolean;
  condition: {
    true: React.ReactNode;
    false: React.ReactNode;
  };
};

export const BooleanRow = ({ value, condition }: BooleanRowProps) => {
  const formatted = value ? condition.true : condition.false;

  return <div className="font-medium"> {formatted} </div>;
};

export const CheckBoxRow = ({ value }: { value: boolean }) => {
  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        defaultChecked={value}
        className="form-checkbox h-5 w-5 text-primary"
      />
    </div>
  );
};

export const formatCurrency = (value?: number) => {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(value || 0);
};

export const CurrencyRow = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center">
      <div className="font-medium"> {value} </div>
    </div>
  );
};

export const PercentageRow = ({ value }: { value: number }) => {
  return (
    <div className="flex items-center">
      <div className="font-medium"> % {value} </div>
    </div>
  );
}

export const formatPercentage = (value?: number) => {
  value = value || 0;
  value = value / 100;

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value || 0);
};

export const formatDate = (value?: string) => {
  if (!value) return "";

  const time = new Date(value as string).getTime();
  let data = new Date(time + 10800000);

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}\+\d{2}$/.test(value)) {
    data = new Date(value);
  }

  const date =
    `${data.getUTCDate()}`.length == 1
      ? `0${data.getUTCDate()}`
      : `${data.getUTCDate()}`;
  const month =
    `${data.getUTCMonth() + 1}`.length == 1
      ? `0${data.getUTCMonth() + 1}`
      : `${data.getUTCMonth() + 1}`;
  const year = `${data.getUTCFullYear()}`;

  return `${date}/${month}/${year}`;
};

export const formatDateHour = (value?: string, utc = true) => {
  if (!value) return "";

  if (utc) return utcDate(value);

  return date(value);
};

const date = (value: string) => {
  let data = new Date(value);

  const date =
    `${data.getDate()}`.length == 1
      ? `0${data.getDate()}`
      : `${data.getDate()}`;
  const month =
    `${data.getMonth() + 1}`.length == 1
      ? `0${data.getMonth() + 1}`
      : `${data.getMonth() + 1}`;
  const year = `${data.getFullYear()}`;

  const hour =
    `${data.getHours()}`.length == 1
      ? `0${data.getHours()}`
      : `${data.getHours()}`;
  const minutes =
    `${data.getMinutes()}`.length == 1
      ? `0${data.getMinutes()}`
      : `${data.getMinutes()}`;

  return `${date}/${month}/${year} ${hour}:${minutes}`;
};

const utcDate = (value: string) => {
  let data = new Date(value);

  const date =
    `${data.getUTCDate()}`.length == 1
      ? `0${data.getUTCDate()}`
      : `${data.getUTCDate()}`;
  const month =
    `${data.getUTCMonth() + 1}`.length == 1
      ? `0${data.getUTCMonth() + 1}`
      : `${data.getUTCMonth() + 1}`;
  const year = `${data.getUTCFullYear()}`;

  const hour =
    `${data.getUTCHours()}`.length == 1
      ? `0${data.getUTCHours()}`
      : `${data.getUTCHours()}`;
  const minutes =
    `${data.getUTCMinutes()}`.length == 1
      ? `0${data.getUTCMinutes()}`
      : `${data.getUTCMinutes()}`;

  return `${date}/${month}/${year} ${hour}:${minutes}`;
};

export const formatDateConvencionalToUTC = (value?: string) => {
  if (!value) return "";

  const date = value.split(" ")[0];
  const time = value.split(" ")[1];

  const day = Number(date.split("/")[0]);
  const month = Number(date.split("/")[1]) - 1;
  const year = Number(date.split("/")[2]);

  if (time) {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    return new Date(year, month, day, hour, minutes);
  }

  return new Date(year, month, day);
};
