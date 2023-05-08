import React from 'react';
import cn from 'classnames';
import Locked from '../../assets/locked.png';
import './styles.scss';
import { fancyTimeFormat } from '../../utils/formatters';
import { ILesson } from '../../interfaces/Course.interface';

interface ILessonProps {
  data: ILesson;
  activeLesson: string;
  handleClick: (arg0: string) => void;
}

const Lesson = ({ data, activeLesson, handleClick }: ILessonProps) => {
  const { id, duration, previewImageLink, status, order, title } = data;
  const handleClickIfUnlocked = () => {
    if (status === 'unlocked') handleClick(id);
  };
  return (
    <div
      data-testid="lesson"
      className={cn(
        'lesson',
        activeLesson === id && 'lesson--active',
        status !== 'unlocked' && 'lesson--locked'
      )}
    >
      {status !== 'unlocked' && (
        <img className="lesson--locked__img" src={Locked} alt="lesson locked" />
      )}
      <div
        onClick={handleClickIfUnlocked}
        className="lesson__details"
        data-testid="change-lesson-btn"
      >
        <div className="lesson__details--container">
          <img
            className="lesson__details__img"
            src={`${previewImageLink}/lesson-${order}.webp`}
            alt=""
          />
          <h3 className="lesson__details__title">{title}</h3>
        </div>
        <p className="lesson__details__duration">{fancyTimeFormat(duration)}</p>
      </div>
      <div className="lesson__underline" />
    </div>
  );
};

export default Lesson;
