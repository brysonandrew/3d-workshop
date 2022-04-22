import { SIDES, SIZE, BLURS, BLURS_H } from './index';

const Blur = () => (
  <defs>
    {SIDES.map((_, sideIndex) => (
      <filter
        key={`filter-${sideIndex}`}
        id={`blur-${sideIndex}`}
        width={SIZE * 1.2}
        height={SIZE * 1.2}
        x={-SIZE * 0.2}
        y={-SIZE * 0.2}
        filterUnits="userSpaceOnUse"
      >
        <feMorphology in="SourceGraphic" operator="dilate" radius="1" result="fat" />
        {BLURS.map((_, i) => (
          <feGaussianBlur
            key={`blur-${i}`}
            in="fat"
            result={`blur-${i}`}
            stdDeviation={20 * i + 1} />
        ))}
        {BLURS_H.map((_, i) => (
          <feOffset key={`offset-${i}`} result={`offset-${i}`} dx={10 * i} />
        ))}
        {BLURS_H.map((_, i) => (
          <feOffset
            key={`offset-${i}`}
            result={`offset-${BLURS_H.length - 1 + i}`}
            dx={-10 * i} />
        ))}
        <feMerge>
          {BLURS.map((_, i) => (
            <feOffset key={`offset-${i}`} in={`offset-${i}`} />
          ))}
          {BLURS.map((_, i) => (
            <feMergeNode key={`blur-${i}`} in={`blur-${i}`} />
          ))}
          {/* <feMergeNode in="SourceGraphic"/> */}
        </feMerge>
      </filter>
    ))}
  </defs>
);
