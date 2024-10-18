import { LucideIcon, LucideProps } from 'lucide-react';

export type Icon = LucideIcon;

type IconProps = React.HTMLAttributes<SVGElement> & {
  fill?: string;
  width?: string | number;
  height?: string | number;
};

export const Icons = {
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      {...props}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  ),
  parking: ({ active, ...props }: LucideProps & { active?: boolean }) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18 8.5C19.6569 8.5 21 7.15685 21 5.5C21 3.84315 19.6569 2.5 18 2.5C16.3431 2.5 15 3.84315 15 5.5C15 7.15685 16.3431 8.5 18 8.5Z"
        stroke={active ? '#000' : '#D0D5DD'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 22.5C7.65685 22.5 9 21.1569 9 19.5C9 17.8431 7.65685 16.5 6 16.5C4.34315 16.5 3 17.8431 3 19.5C3 21.1569 4.34315 22.5 6 22.5Z"
        stroke={active ? '#000' : '#D0D5DD'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5.5H8.5C6.567 5.5 5 7.067 5 9C5 10.933 6.567 12.5 8.5 12.5H15.5C17.433 12.5 19 14.067 19 16C19 17.933 17.433 19.5 15.5 19.5H12"
        stroke={active ? '#000' : '#D0D5DD'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  events: ({ ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18.6161 20.5H19.1063C20.2561 20.5 21.1707 19.9761 21.9919 19.2436C24.078 17.3826 19.1741 15.5 17.5 15.5M15.5 5.56877C15.7271 5.52373 15.9629 5.5 16.2048 5.5C18.0247 5.5 19.5 6.84315 19.5 8.5C19.5 10.1568 18.0247 11.5 16.2048 11.5C15.9629 11.5 15.7271 11.4763 15.5 11.4312"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        {...props}
      />
      <path
        d="M4.48131 16.6112C3.30234 17.243 0.211139 18.5331 2.09388 20.1474C3.01359 20.936 4.03791 21.5 5.32572 21.5H12.6743C13.9621 21.5 14.9864 20.936 15.9061 20.1474C17.7889 18.5331 14.6977 17.243 13.5187 16.6112C10.754 15.1296 7.24599 15.1296 4.48131 16.6112Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
      <path
        d="M13 8C13 10.2091 11.2091 12 9 12C6.79086 12 5 10.2091 5 8C5 5.79086 6.79086 4 9 4C11.2091 4 13 5.79086 13 8Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
    </svg>
  ),
  insights: ({ ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 22.5L10 16.5H2L4 22.5H12ZM12 22.5H16"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M12 13.5V13C12 11.1144 12 10.1716 11.4142 9.58579C10.8284 9 9.88562 9 8 9C6.11438 9 5.17157 9 4.58579 9.58579C4 10.1716 4 11.1144 4 13V13.5"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M19 13.5C19 14.6046 18.1046 15.5 17 15.5C15.8954 15.5 15 14.6046 15 13.5C15 12.3954 15.8954 11.5 17 11.5C18.1046 11.5 19 12.3954 19 13.5Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
      <path
        d="M10 4.5C10 5.60457 9.10457 6.5 8 6.5C6.89543 6.5 6 5.60457 6 4.5C6 3.39543 6.89543 2.5 8 2.5C9.10457 2.5 10 3.39543 10 4.5Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
      <path
        d="M14 18H20C21.1046 18 22 18.8954 22 20V20.5C22 21.6046 21.1046 22.5 20 22.5H19"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        {...props}
      />
    </svg>
  ),
  notifications: ({ ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M2.52992 14.7696C2.31727 16.1636 3.268 17.1312 4.43205 17.6134C8.89481 19.4622 15.1052 19.4622 19.5679 17.6134C20.732 17.1312 21.6827 16.1636 21.4701 14.7696C21.3394 13.9129 20.6932 13.1995 20.2144 12.5029C19.5873 11.5793 19.525 10.5718 19.5249 9.5C19.5249 5.35786 16.1559 2 12 2C7.84413 2 4.47513 5.35786 4.47513 9.5C4.47503 10.5718 4.41272 11.5793 3.78561 12.5029C3.30684 13.1995 2.66061 13.9129 2.52992 14.7696Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M8 19C8.45849 20.7252 10.0755 22 12 22C13.9245 22 15.5415 20.7252 16 19"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </svg>
  ),
  settings: ({ ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M14.9527 2H9.04738V4.58152L7.15473 5.69367L4.95267 4.40192L2 9.59808L4.20152 10.8895L4.20153 13.1106L2.0001 14.4019L4.95277 19.5981L7.15477 18.3064L9.04738 19.4185V22H14.9527V19.4185L16.8453 18.3064L19.0472 19.5981L21.9999 14.4019L19.7986 13.1106V10.8894L22 9.59808L19.0473 4.40192L16.8453 5.69363L14.9527 4.58152V2Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
    </svg>
  ),
  support: ({ ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M17 10.8045C17 10.4588 17 10.286 17.052 10.132C17.2032 9.68444 17.6018 9.51076 18.0011 9.32888C18.45 9.12442 18.6744 9.02219 18.8968 9.0042C19.1493 8.98378 19.4022 9.03818 19.618 9.15929C19.9041 9.31984 20.1036 9.62493 20.3079 9.87302C21.2513 11.0188 21.7229 11.5918 21.8955 12.2236C22.0348 12.7334 22.0348 13.2666 21.8955 13.7764C21.6438 14.6979 20.8485 15.4704 20.2598 16.1854C19.9587 16.5511 19.8081 16.734 19.618 16.8407C19.4022 16.9618 19.1493 17.0162 18.8968 16.9958C18.6744 16.9778 18.45 16.8756 18.0011 16.6711C17.6018 16.4892 17.2032 16.3156 17.052 15.868C17 15.714 17 15.5412 17 15.1955V10.8045Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
      <path
        d="M7 10.8046C7 10.3694 6.98778 9.97821 6.63591 9.6722C6.50793 9.5609 6.33825 9.48361 5.99891 9.32905C5.55001 9.12458 5.32556 9.02235 5.10316 9.00436C4.43591 8.9504 4.07692 9.40581 3.69213 9.87318C2.74875 11.019 2.27706 11.5919 2.10446 12.2237C1.96518 12.7336 1.96518 13.2668 2.10446 13.7766C2.3562 14.6981 3.15152 15.4705 3.74021 16.1856C4.11129 16.6363 4.46577 17.0475 5.10316 16.996C5.32556 16.978 5.55001 16.8757 5.99891 16.6713C6.33825 16.5167 6.50793 16.4394 6.63591 16.3281C6.98778 16.0221 7 15.631 7 15.1957V10.8046Z"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        {...props}
      />
      <path
        d="M5 9C5 5.68629 8.13401 3 12 3C15.866 3 19 5.68629 19 9"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="round"
        {...props}
      />
      <path
        d="M19 17V17.8C19 19.5673 17.2091 21 15 21H13"
        stroke="#D0D5DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      />
    </svg>
  ),
  logout: ({ ...props }: LucideProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
        stroke="#002A48"
        strokeWidth="1.5"
      />
      <path
        d="M16.5 12H8.5M16.5 12C16.5 11.2998 14.5057 9.99153 14 9.5M16.5 12C16.5 12.7002 14.5057 14.0085 14 14.5"
        stroke="#002A48"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  logo: ({ ...props }: LucideProps) => (
    <svg viewBox="0 0 28 28" fill="none" {...props}>
      <circle cx="14" cy="14" r="14" fill="#0E1125" />
      <path d="M21.7942 9.5L14 23L6.20577 9.5L21.7942 9.5Z" stroke="white" />
      <path d="M7 10L14 14.5L21.5 10" stroke="white" strokeLinecap="round" />
      <path d="M14 14.5V22.5" stroke="white" strokeLinecap="round" />
    </svg>
  ),
  light: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.5 12C6.5 8.96243 8.96243 6.5 12 6.5C15.0376 6.5 17.5 8.96243 17.5 12C17.5 15.0376 15.0376 17.5 12 17.5C8.96243 17.5 6.5 15.0376 6.5 12Z"
        fill="#2B2F38"
        {...props}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7455 3C10.7455 2.30964 11.3052 1.75 11.9955 1.75H12.0045C12.6948 1.75 13.2545 2.30964 13.2545 3C13.2545 3.69036 12.6948 4.25 12.0045 4.25H11.9955C11.3052 4.25 10.7455 3.69036 10.7455 3ZM17.1088 5.63599C17.1088 4.94563 17.6684 4.38599 18.3588 4.38599H18.3678C19.0581 4.38599 19.6178 4.94563 19.6178 5.63599C19.6178 6.32634 19.0581 6.88599 18.3678 6.88599H18.3588C17.6684 6.88599 17.1088 6.32634 17.1088 5.63599ZM4.38409 5.63647C4.38409 4.94612 4.94373 4.38647 5.63409 4.38647H5.64307C6.33342 4.38647 6.89307 4.94612 6.89307 5.63647C6.89307 6.32683 6.33342 6.88647 5.64307 6.88647H5.63409C4.94373 6.88647 4.38409 6.32683 4.38409 5.63647ZM1.75 12.0006C1.75 11.3102 2.30964 10.7506 3 10.7506H3.00898C3.69933 10.7506 4.25898 11.3102 4.25898 12.0006C4.25898 12.6909 3.69933 13.2506 3.00898 13.2506H3C2.30964 13.2506 1.75 12.6909 1.75 12.0006ZM19.741 12.0006C19.741 11.3102 20.3007 10.7506 20.991 10.7506H21C21.6904 10.7506 22.25 11.3102 22.25 12.0006C22.25 12.6909 21.6904 13.2506 21 13.2506H20.991C20.3007 13.2506 19.741 12.6909 19.741 12.0006ZM4.38409 18.364C4.38409 17.6737 4.94373 17.114 5.63409 17.114H5.64307C6.33342 17.114 6.89307 17.6737 6.89307 18.364C6.89307 19.0544 6.33342 19.614 5.64307 19.614H5.63409C4.94373 19.614 4.38409 19.0544 4.38409 18.364ZM17.1082 18.3645C17.1082 17.6741 17.6679 17.1145 18.3582 17.1145H18.3672C19.0575 17.1145 19.6172 17.6741 19.6172 18.3645C19.6172 19.0549 19.0575 19.6145 18.3672 19.6145H18.3582C17.6679 19.6145 17.1082 19.0549 17.1082 18.3645ZM10.7461 21C10.7461 20.3096 11.3057 19.75 11.9961 19.75H12.0051C12.6954 19.75 13.2551 20.3096 13.2551 21C13.2551 21.6904 12.6954 22.25 12.0051 22.25H11.9961C11.3057 22.25 10.7461 21.6904 10.7461 21Z"
        fill="#2B2F38"
        {...props}
      />
    </svg>
  ),
  dark: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10.5163 2.04299C10.6958 2.27652 10.722 2.59348 10.5832 2.85329C9.99927 3.94693 9.66792 5.1961 9.66792 6.52489C9.66792 10.8367 13.1633 14.3321 17.4751 14.3321C18.8039 14.3321 20.0531 14.0008 21.1467 13.4168C21.4065 13.2781 21.7235 13.3043 21.957 13.4837C22.1906 13.6632 22.2974 13.9628 22.2302 14.2495C21.1556 18.835 17.0409 22.25 12.1269 22.25C6.39589 22.25 1.75 17.6041 1.75 11.8732C1.75 6.95909 5.16505 2.84448 9.7505 1.76982C10.0373 1.70261 10.3368 1.80947 10.5163 2.04299Z"
        fill="#2B2F38"
        {...props}
      />
    </svg>
  ),
  collapse: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1554 5.18184L12.5 6.59606L7.1892 12.1818L12.5 17.7676L11.1554 19.1818L4.5 12.1817L11.1554 5.18184Z"
        fill="#48505E"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.1554 5.18184L19.5 6.59606L14.1892 12.1818L19.5 17.7676L18.1554 19.1818L11.5 12.1817L18.1554 5.18184Z"
        fill="#48505E"
      />
    </svg>
  ),
  expand: ({ fill = '#48505E', ...props }: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3446 19.18L12 17.7658L17.3108 12.18L12 6.59419L13.3446 5.17999L20 12.1801L13.3446 19.18Z"
        fill={fill}
        {...props}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.3446 19.18L5 17.7658L10.3108 12.18L5 6.59419L6.3446 5.17999L13 12.1801L6.3446 19.18Z"
        fill={fill}
        {...props}
      />
    </svg>
  ),
  search: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <g clip-path="url(#clip0_514_2384)">
        <path
          d="M21 21L16.6569 16.6569M16.6569 16.6569C18.1046 15.2091 19 13.2091 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C13.2091 19 15.2091 18.1046 16.6569 16.6569Z"
          stroke="#C4C4C4"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_514_2384">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  filter: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M21 7L11 7"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="2"
        cy="2"
        r="2"
        transform="matrix(-1 0 0 1 7 5)"
        stroke="#C4C4C4"
        strokeWidth="2"
      />
      <path
        d="M3 17L13 17"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="19" cy="17" r="2" stroke="#C4C4C4" strokeWidth="2" />
    </svg>
  ),
  cancel: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  time: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 7V12H17M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  location: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M5 9.92285C5 14.7747 9.24448 18.7869 11.1232 20.3252C11.3921 20.5454 11.5281 20.6568 11.7287 20.7132C11.8849 20.7572 12.1148 20.7572 12.271 20.7132C12.472 20.6567 12.6071 20.5463 12.877 20.3254C14.7557 18.7871 18.9999 14.7751 18.9999 9.9233C18.9999 8.08718 18.2625 6.32605 16.9497 5.02772C15.637 3.72939 13.8566 3 12.0001 3C10.1436 3 8.36301 3.7295 7.05025 5.02783C5.7375 6.32616 5 8.08674 5 9.92285Z"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9Z"
        stroke="#C4C4C4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  price: ({ active, ...props }: LucideProps & { active?: boolean }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={active ? '#000' : '#D0D5DD'}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-dollar-sign"
      {...props}
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  clock: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-clock"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  CreditCard: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-credit-card"
      {...props}
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  Bike: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-bike"
      {...props}
    >
      <circle cx="18.5" cy="17.5" r="3.5" />
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="15" cy="5" r="1" />
      <path d="M12 17.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  Car: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-car-front"
      {...props}
    >
      <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
      <path d="M7 14h.01" />
      <path d="M17 14h.01" />
      <rect width="18" height="8" x="3" y="10" rx="2" />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  ),
  Zap: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-zap"
      {...props}
    >
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
};
