/*
RangeInputSlider.tsx
Parent:PokemonGame.tsx
*/
import { useEffect } from 'react';
import './rangeInputSlider.css';

type RangeInpuSliderPropType = {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
  setDebounceInputLevel: React.Dispatch<React.SetStateAction<number>>;
  level: number;
  min: number;
  max: number;
  step: number;
};

const rangeLevelFn = (
  level: number
):
  | 'Easiest'
  | 'Easier'
  | 'Easy'
  | 'Medium'
  | 'High'
  | 'Hard'
  | 'Hardest'
  | undefined => {
  if (level <= 10) {
    return 'Easiest';
  }
  if (level <= 50) {
    return 'Easier';
  }
  if (level <= 150) {
    return 'Easy';
  }
  if (level <= 250) return 'Medium';
  if (level <= 500) return 'High';
  if (level <= 750) return 'Hard';
  if (level > 750) return 'Hardest';
};
//Component------------------
function RangeInputSlider({
  level,
  setLevel,
  setDebounceInputLevel,
  min = 1,
  max = 1000,
  step = 1,
}: RangeInpuSliderPropType): JSX.Element {
  //----------------------------------------
  function handleInputSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setLevel(+e.target.value);
  }
  //Debouncing input level from slider-------
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceInputLevel(level);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [level, 200]);
  //----------------------------------------
  return (
    <>
      <div className='range__slider__container'>
        <input
          type='range'
          className='range__slider'
          max={max}
          min={min}
          value={level}
          onChange={(e) => handleInputSlider(e)}
          step={step}
          id='input__range__slider'
        />

        <p className='rangeSlider__value'>
          Level: <span id='input__level'>{rangeLevelFn(level)}</span>
        </p>
      </div>
    </>
  );
}

export default RangeInputSlider;
