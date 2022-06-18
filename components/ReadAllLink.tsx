import Link from "next/link";

interface IProps {
  url: string;
  title: string;
}

const ReadAllLink: React.FC<IProps> = ({ url, title }) => {
  return (
    <Link href={url}>
      <a className="flex mt-8 mb-8 text-gray-600 dark:text-gray-400 leading-7 rounded-lg hover:text-gray-800 dark:hover:text-gray-200 transition-all h-6">
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          />
        </svg>
      </a>
    </Link>
  );
};

export default ReadAllLink;
