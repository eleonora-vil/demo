const NavDefaultIcon = ({ ...props }: React.HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_184_16402)">
        <path d="M7.18509 9L6.12339 10.0617L12.0617 16L18 10.0617L16.9383 9L12.0617 13.8766L7.18509 9Z" fill="currentColor" />
      </g>
      <defs>
        <clipPath id="clip0_184_16402">
          <rect width="24" height="24" fill="white" transform="matrix(0 1 -1 0 24 0)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NavDefaultIcon;
