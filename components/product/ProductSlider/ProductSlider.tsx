import { Children, FC, isValidElement, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import cn from 'classnames'
import s from './ProductSlider.module.css'

const ProductSlider: FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.details().relativeSlide)
    },
    // created() {
    //   setLoaded(true)
    // },
  })

  return (
    <div className={s.root}>
      <div ref={sliderRef} className="keen-slider h-full transition-opacity">
        <button type="button" onClick={instanceRef?.prev} className={cn(s.leftControl, s.control)} />
        <button type="button" onClick={instanceRef?.next} className={cn(s.rightControl, s.control)} />
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${child.props.className ? `${child.props.className}` : ''} keen-slider__slide`,
              },
            }

            // return cloneElement(child, {
            //   className: `${child.props.className ? `${child.props.className}` : ''} keen-slider__slide`,
            // })
          }

          return child
        })}
      </div>
    </div>
  )
}

export default ProductSlider
