interface Props {
  tag: string;
}

const PostTag = ({ tag }: Props) => {
  return (
    <div className="text-secondary bg-tertiary px-2 py-1 rounded-sm">
      # {tag}
    </div>
  );
};

export default PostTag;
