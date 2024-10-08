const CopyIcon = ({ ...props }: React.HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_184_16035)">
        <path
          d="M15.7895 3H5.68421C4.75789 3 4 3.77727 4 4.72727V16.8182H5.68421V4.72727H15.7895V3ZM18.3158 6.45455H9.05263C8.12632 6.45455 7.36842 7.23182 7.36842 8.18182V20.2727C7.36842 21.2227 8.12632 22 9.05263 22H18.3158C19.2421 22 20 21.2227 20 20.2727V8.18182C20 7.23182 19.2421 6.45455 18.3158 6.45455ZM18.3158 20.2727H9.05263V8.18182H18.3158V20.2727Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_184_16035">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CopyIcon;
