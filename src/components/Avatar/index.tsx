interface AvatarProps {
  width: string;
  height: string;
  image: string;
}

export type ImageProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  className: string;
};

const Image = (props: ImageProps) => {
  return <img {...props} />;
};

export default function Avatar(props: AvatarProps) {
  const { width, height, image } = props;

  return (
    <div className={`rounded-full ${width} ${height}`}>
      <Image
        src={`/assets/images/${image}`}
        alt="Avatar Image"
        width={"96px"}
        height={"96px"}
        className="rounded-full"
      />
    </div>
  );
}
