import Image, { ImageProps } from "next/image";

export default async function MdxImage(props: ImageProps) {
  const { src, title, alt } = props;
  return (
    <Image
      sizes="920px, 800px, 420px"
      width={920}
      height={920}
      src={src}
      alt={alt}
      title={title}
      quality={60}
      className="my-3"
    />
  );
}
