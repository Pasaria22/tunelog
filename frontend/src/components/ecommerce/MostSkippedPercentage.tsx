// To show admin the skip rate of songs
// by percentage
// skipped in 1st 30sec = 10%
// and so on



import { useState, useEffect } from "react";

type Signals = {
  partial: number;
  positive: number;
  repeat: number;
  skip: number;
};

type Stats = {
  total_songs: number;
  total_listens: number;
  signals: Signals;
  most_played_artists: Record<string, number>;
  most_played_songs: {
    title: string;
    artist: string;
    play_count: number;
  }[];
};

type Percentage = {
  partial: number;
  positive: number;
  repeat: number;
  skip: number;
};

function calculatePercentages(signals: Signals): Percentage {
  const total = Object.values(signals).reduce((sum, val) => sum + val, 0);
  if (total === 0) return { partial: 0, positive: 0, repeat: 0, skip: 0 };

  return {
    partial: Math.round((signals.partial / total) * 100),
    positive: Math.round((signals.positive / total) * 100),
    repeat: Math.round((signals.repeat / total) * 100),
    skip: Math.round((signals.skip / total) * 100),
  };
}

export default function MostSkippedPercentage({
  stats,
}: {
  stats: Stats | null;
}) {
  const [percentage, setPercentage] = useState<Percentage | null>(null);

  useEffect(() => {
    if (!stats) return;
    setPercentage(calculatePercentages(stats.signals));
  }, [stats]);

  const listenRatio =
    stats && stats.total_songs > 0
      ? ((stats.total_listens / stats.total_songs) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Most skipped song this Monthly
            </h3>
          </div>
        </div>
        <div className="relative ">
          <div className="max-h-[330px]" id="chartDarkStyle"></div>
        </div>
        <p className="mx-auto mt-4 w-full max-w-[380px] text-left text-lg text-black dark:text-white">
          <b className="text-xl text-gray-500">Skips</b> : {percentage?.skip}%
          or {stats?.signals.skip} songs
        </p>
        <p className="mx-auto mt-4 w-full max-w-[380px] text-left text-lg text-black dark:text-white">
          <b className="text-xl text-gray-500">Partial Complete</b> :{" "}
          {percentage?.partial}% or {stats?.signals.partial} songs
        </p>{" "}
        <p className="mx-auto mt-4 w-full max-w-[380px] text-left text-lg text-black dark:text-white ">
          <b className="text-xl text-gray-500">Complete</b> :{" "}
          {percentage?.positive}% or {stats?.signals.positive} songs
        </p>{" "}
        <p className="mx-auto mt-4 w-full max-w-[380px] text-left text-lg text-black dark:text-white">
          <b className="text-xl text-gray-500">Repeated</b> :{" "}
          {percentage?.repeat}% or {stats?.signals.repeat} songs
        </p>{" "}
        <p className="mx-auto mt-4 w-full max-w-[380px] text-left text-lg text-black dark:text-white">
          <b className="text-xl text-gray-500">Total listens</b> : {listenRatio}
          % or {stats?.total_listens} songs
        </p>{" "}
      </div>
      <div></div>
    </div>
  );
}