import {classNames} from '@/utils/react';


export const smoothTransform = 'transform-gpu transition-colors';

export const buttonStyle = {
  base: classNames('group rounded-lg', smoothTransform),
  size: 'p-1 h-8',
  background: 'hover:bg-slate-700 hover:dark:bg-slate-300',
  border: 'border border-slate-700 dark:border-slate-300',
  text: 'text-slate-700 dark:text-slate-300',
  textHover: 'hover:text-slate-200 dark:hover:text-slate-800',
};

export const invertStyle = {
  normal: 'invert dark:invert-0',
  hover: 'group-hover:invert-0 group-hover:dark:invert',
};

export const whiteHoverableClasses = {
  parent: classNames(buttonStyle.base, buttonStyle.background, buttonStyle.text, buttonStyle.textHover),
  icon: classNames(invertStyle.normal, invertStyle.hover),
};
