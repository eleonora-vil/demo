import React from 'react';

const SortIcon = ({ ...props }: React.HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_184_16078)">
        <path
          d="M5.70833 13.5H7.54167C7.79375 13.5 8 13.1625 8 12.75C8 12.3375 7.79375 12 7.54167 12H5.70833C5.45625 12 5.25 12.3375 5.25 12.75C5.25 13.1625 5.45625 13.5 5.70833 13.5ZM5.25 5.25C5.25 5.6625 5.45625 6 5.70833 6H13.0417C13.2937 6 13.5 5.6625 13.5 5.25C13.5 4.8375 13.2937 4.5 13.0417 4.5H5.70833C5.45625 4.5 5.25 4.8375 5.25 5.25ZM5.70833 9.75H10.2917C10.5438 9.75 10.75 9.4125 10.75 9C10.75 8.5875 10.5438 8.25 10.2917 8.25H5.70833C5.45625 8.25 5.25 8.5875 5.25 9C5.25 9.4125 5.45625 9.75 5.70833 9.75Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_184_16078">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SortIcon;
