import { FC } from "react";
import CountUp from "react-countup";

interface InfoRowProps {
  text: string;
  value: number;
  percent?: number;
}

export const InfoRow: FC<InfoRowProps> = ({ text, value, percent }) => {
  return (
    <dl className={"flex flex-col gap-1"}>
      <div className={"flex items-center justify-between"}>
        <dt
          className={
            "flex text-xl flex-1 items-baseline grow-1 whitespace-nowrap after:content-[''] after:grow-1 after:mx-2 after:border-b-2 after:border-dashed after:border-border"
          }
        >
          {text}
        </dt>
        <div className={"flex gap-5"}>
          <dd>
            <CountUp end={value} separator={" "} duration={1} /> ₽
          </dd>
          {percent && (
            <dd className={"text-xl font-medium"}>
              <CountUp end={percent} duration={1} decimal={"."} decimals={1} />%
            </dd>
          )}
        </div>
      </div>
    </dl>
  );
};
