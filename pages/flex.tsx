import { FC } from 'react'
import s from './flex.module.css'

const Flex: FC = () => {
  const a = 'a'
  return (
    <div className={s.parent}>
      <div className={s.child} />
      <div className={s.child} />
      <div className={s.child} />
      <div className={s.child} />
    </div>
  )
}

export default Flex
