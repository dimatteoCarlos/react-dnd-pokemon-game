/*
RangeInputSlider.tsx
Parent:PokemonGame.tsx
*/
import './rangeInputSlider.css';

type RangeInpuSliderPropType = {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
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

function RangeInputSlider({
  level,
  setLevel,
  min = 1,
  max = 1000,
  step = 1,
}: RangeInpuSliderPropType): JSX.Element {
  function handleInputSlider(e: React.ChangeEvent<HTMLInputElement>) {
    setLevel(+e.target.value);
  }

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
