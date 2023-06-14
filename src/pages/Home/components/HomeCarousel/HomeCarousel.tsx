import { Carousel } from '@material-tailwind/react'

function HomeCarousel() {
  return (
    <Carousel
      className='rounded-xl'
      autoplay
      loop
      autoplayDelay={3000}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className='absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2'>
          {new Array(length).fill('').map((_, i) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src='https://www.october16th.store/assets/slider1-e7fc1d7b.png'
        alt=''
        className='h-full w-full object-cover'
      />
      <img
        src='https://www.october16th.store/assets/slider3-4b831ea6.png'
        alt=''
        className='h-full w-full object-cover'
      />
      <img
        src='https://www.october16th.store/assets/slider5-668fa192.png'
        alt=''
        className='h-full w-full object-cover'
      />
      <img
        src='https://www.october16th.store/assets/slider6-ec6eca67.png'
        alt=''
        className='h-full w-full object-cover'
      />
      <img
        src='https://www.october16th.store/assets/slider7-2e814925.png'
        alt=''
        className='h-full w-full object-cover'
      />
    </Carousel>
  )
}

export default HomeCarousel
