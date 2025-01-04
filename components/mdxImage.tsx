import Image, { ImageProps } from "next/image";

export default async function MdxImage(props: ImageProps) {
  const { src, title, alt } = props;
  return (
    <Image
      sizes="1024px, 800px, 420px"
      width={1024}
      height={800}
      src={src}
      alt={alt}
      title={title}
      quality={60}
      className="my-6"
    />
  );
}
