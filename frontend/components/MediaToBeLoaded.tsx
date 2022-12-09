const imagesUrl = process.env.NEXT_PUBLIC_IMAGES_URL || '';

export default function MediaToBeLoaded() {
  return (
    <>
      <div className='MediaToBeLoaded' id='videosToBeLoaded' />
      <div className='MediaToBeLoaded' id='imagesToBeLoaded'>
        <img src={`${imagesUrl}/Logo-wh.png`} alt='' />
        <img src={`${imagesUrl}/Logo-pr.png`} alt='' />
        <img src={`${imagesUrl}/Logo-bl.png`} alt='' />
        <img src={`${imagesUrl}/HomeBanner.jpg`} alt='' />
        <img src={`${imagesUrl}/tokyo.jpg`} alt='' />
        <img src={`${imagesUrl}/triangles.png`} alt='' />
        <img src={`${imagesUrl}/stock-portrait-woman1.jpg`} alt='' />
        <img src={`${imagesUrl}/stock-portrait-man1.jpg`} alt='' />
        <img src={`${imagesUrl}/stock-portrait-man2.jpg`} alt='' />
        <img src={`${imagesUrl}/photographer.jpg`} alt='' />
        <img src={`${imagesUrl}/sold.jpg`} alt='' />
        <img src={`${imagesUrl}/ideas.jpg`} alt='' />
        <img src={`${imagesUrl}/havana.jpg`} alt='' />
        <img src='/twitter_white.png' alt='' />
        <img src='/instagram_white.png' alt='' />
        <img src='/facebook_white.png' alt='' />
      </div>
    </>
  );
}
