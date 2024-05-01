//------Random Number Generator between maxRndNumber and mninRndNumber------------
//floor=> +.5, +minRndNumber

export function randomNumberGenerator(maxRndNumber = 10, minRndNumber = 1) {
  return (
    Math.floor(Math.random() * Math.abs(maxRndNumber - minRndNumber) + 0.5) +
    minRndNumber * 1
  );
}

//-----Generate an Array with non repeated random numbers between max and min range and with size arrLen -----
export function rndNumArrayGen(
  arrLen = 10,
  maxRndNumber = 10,
  minRndNumber = 1
) {
  let randomNumbersArray: number[] = [];
  //if min value of range is <=0 then is set to 1
  minRndNumber <= 0 ? (minRndNumber = 1) : null;

  //arrLen must be equal or greater than the quantity of numbers available inside the range, if not, then, the arrLen (array length) is limited to the qty of numbers available in the range ------
  const limit = Math.floor(Math.abs(maxRndNumber - minRndNumber) + 1);

  // console.log({ limit });
  arrLen > limit ? (arrLen = limit) : null;

  for (let i = 0; i < arrLen; i++) {
    let rnd = randomNumberGenerator(maxRndNumber, minRndNumber);

    //do not repeate rnd number
    while (randomNumbersArray.includes(rnd)) {
      rnd = randomNumberGenerator(maxRndNumber, minRndNumber);
    }
    randomNumbersArray.push(rnd);
  }

  return randomNumbersArray;
}


export 
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
  if (level === 10) {
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
  if (level <= 1000) return 'Hardest';
};
