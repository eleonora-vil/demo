const BookOpenIcon = ({ ...props }: React.HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.25 4.125H8.5C9.42826 4.125 10.3185 4.49375 10.9749 5.15013C11.6313 5.8065 12 6.69674 12 7.625V19.875C12 19.1788 11.7234 18.5111 11.2312 18.0188C10.7389 17.5266 10.0712 17.25 9.375 17.25H3.25V4.125Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.75 4.125H15.5C14.5717 4.125 13.6815 4.49375 13.0251 5.15013C12.3687 5.8065 12 6.69674 12 7.625V19.875C12 19.1788 12.2766 18.5111 12.7688 18.0188C13.2611 17.5266 13.9288 17.25 14.625 17.25H20.75V4.125Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookOpenIcon;
