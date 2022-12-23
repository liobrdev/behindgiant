interface Props {
  imageUrls?: string[];
  videoUrls?: string[];
}

export default function MediaToBeLoaded({ imageUrls, videoUrls }: Props) {
  return (
    <>
      <div className='MediaToBeLoaded'>
        {!!imageUrls?.length && imageUrls.map(url => <img key={url} src={url} alt='' />)}
        {!!videoUrls?.length && videoUrls.map(url => <video key={url} src={url} />)}
      </div>
    </>
  );
}
