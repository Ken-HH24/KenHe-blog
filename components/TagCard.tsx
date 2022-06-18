import Link from "next/link";

export interface TagCardProps {
  title: string;
  url: string;
  num?: number;
  className?: string;
}

const TagCard: React.FC<TagCardProps> = ({ title, num, url, className }) => {
  return (
    <Link href={url}>
      <a
        className={`transform hover:scale-[1.02] transition-all py-2 px-4 bg-gradient-to-tr  text-white text-sm font-semibold rounded-md shadow-lg focus:outline-none ${className}`}
      >
        <span>{title}</span>
        {num && <span className="ml-4">({num})</span>}
      </a>
    </Link>
  );
};

export default TagCard;
