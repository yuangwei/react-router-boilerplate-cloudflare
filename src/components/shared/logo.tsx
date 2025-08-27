import { cn } from '../../lib/utils';

export const Logo = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      viewBox="0 0 180 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('text-foreground h-6 w-auto', className)}
    >
      {/* Icon part */}
      <g>
        {/* Code brackets */}
        <path
          d="M6 4L2 8L6 12"
          stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M10 4L14 8L10 12"
          stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Spark/Lightning */}
        <path
          d="M18 2L16 8H20L18 14"
          stroke={uniColor ? 'currentColor' : 'url(#logo-gradient)'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Text part - ScratchStarter */}
      <g transform="translate(32, 4)">
        {/* S */}
        <path
          d="M2.5 0.5C1.39543 0.5 0.5 1.39543 0.5 2.5V3.5C0.5 4.05228 0.947715 4.5 1.5 4.5H4.5C5.05228 4.5 5.5 4.94772 5.5 5.5V6.5C5.5 7.05228 5.05228 7.5 4.5 7.5H0.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M0.5 7.5H4.5C5.60457 7.5 6.5 8.39543 6.5 9.5V12.5C6.5 13.6046 5.60457 14.5 4.5 14.5H2.5C1.39543 14.5 0.5 13.6046 0.5 12.5V11.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* c */}
        <path
          d="M11.5 5.5C10.3954 5.5 9.5 6.39543 9.5 7.5V12.5C9.5 13.6046 10.3954 14.5 11.5 14.5H13.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* r */}
        <path
          d="M16.5 5.5V14.5M16.5 9.5H18.5C19.6046 9.5 20.5 8.60457 20.5 7.5V7.5C20.5 6.39543 19.6046 5.5 18.5 5.5H16.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* a */}
        <path
          d="M23.5 14.5V7.5C23.5 6.39543 24.3954 5.5 25.5 5.5H27.5C28.6046 5.5 29.5 6.39543 29.5 7.5V14.5M23.5 11.5H29.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* t */}
        <path
          d="M34.5 2.5V14.5M32.5 5.5H36.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* c */}
        <path
          d="M41.5 5.5C40.3954 5.5 39.5 6.39543 39.5 7.5V12.5C39.5 13.6046 40.3954 14.5 41.5 14.5H43.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* h */}
        <path
          d="M46.5 2.5V14.5M46.5 9.5H50.5M50.5 5.5V14.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* S */}
        <path
          d="M55.5 0.5C54.3954 0.5 53.5 1.39543 53.5 2.5V3.5C53.5 4.05228 53.9477 4.5 54.5 4.5H57.5C58.0523 4.5 58.5 4.94772 58.5 5.5V6.5C58.5 7.05228 58.0523 7.5 57.5 7.5H53.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M53.5 7.5H57.5C58.6046 7.5 59.5 8.39543 59.5 9.5V12.5C59.5 13.6046 58.6046 14.5 57.5 14.5H55.5C54.3954 14.5 53.5 13.6046 53.5 12.5V11.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* t */}
        <path
          d="M64.5 2.5V14.5M62.5 5.5H66.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* a */}
        <path
          d="M69.5 14.5V7.5C69.5 6.39543 70.3954 5.5 71.5 5.5H73.5C74.6046 5.5 75.5 6.39543 75.5 7.5V14.5M69.5 11.5H75.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* r */}
        <path
          d="M78.5 5.5V14.5M78.5 9.5H80.5C81.6046 9.5 82.5 8.60457 82.5 7.5V7.5C82.5 6.39543 81.6046 5.5 80.5 5.5H78.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* t */}
        <path
          d="M87.5 2.5V14.5M85.5 5.5H89.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* e */}
        <path
          d="M92.5 5.5H96.5M92.5 5.5V12.5C92.5 13.6046 93.3954 14.5 94.5 14.5H96.5M92.5 5.5V7.5C92.5 6.39543 93.3954 5.5 94.5 5.5H96.5M92.5 9.5H95.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />

        {/* r */}
        <path
          d="M99.5 5.5V14.5M99.5 9.5H101.5C102.605 9.5 103.5 8.60457 103.5 7.5V7.5C103.5 6.39543 102.605 5.5 101.5 5.5H99.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="24"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B5CF6" />
          <stop offset="0.5" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoIcon = ({
  className,
  uniColor,
}: {
  className?: string;
  uniColor?: boolean;
}) => {
  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('size-5', className)}
    >
      {/* Code brackets */}
      <path
        d="M6 4L2 8L6 12"
        stroke={uniColor ? 'currentColor' : 'url(#logo-gradient-icon)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 4L14 8L10 12"
        stroke={uniColor ? 'currentColor' : 'url(#logo-gradient-icon)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Spark/Lightning */}
      <path
        d="M18 2L16 8H20L18 14"
        stroke={uniColor ? 'currentColor' : 'url(#logo-gradient-icon)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <defs>
        <linearGradient
          id="logo-gradient-icon"
          x1="0"
          y1="0"
          x2="24"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8B5CF6" />
          <stop offset="0.5" stopColor="#06B6D4" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const LogoStroke = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn('size-7 w-7', className)}
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified stroke version */}
      <path
        d="M8 6L4 10L8 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 6L16 10L12 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M22 4L20 10H24L22 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Connecting arc */}
      <path
        d="M16 10C18 10 20 10 22 10"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 2"
        opacity="0.6"
        fill="none"
      />
    </svg>
  );
};
