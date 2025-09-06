interface Props {
  title: string;
  content: string;
}

const PostContentSection = ({ title, content }: Props) => {
  return (
    <section className="mt-16">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-4 text-gray-800">{content}</p>
    </section>
  );
};

export default PostContentSection;
