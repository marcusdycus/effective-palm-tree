"use client";

import Image from "next/image";

const HapaxOrbLoaderSmall = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  return (
    <div className="loader">
      <Image
        width={height}
        height={width}
        src="/hapax-orb-loader-small.gif"
        alt="Hapax Orb"
        unoptimized
      />
    </div>
  );
};

export default HapaxOrbLoaderSmall;
