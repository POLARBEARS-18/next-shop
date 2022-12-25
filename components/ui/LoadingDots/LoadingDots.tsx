import { FC } from 'react'
import s from './LoadingDots.module.css'

export const LoadingDots: FC = () => (
  <span className={s.root}>
    <span />
    <span />
    <span />
  </span>
)
