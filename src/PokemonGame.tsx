import { useEffect, useState } from 'react';
import Title from './components/Title';
import RangeInputSlider from './components/range-input-slider/RangeInputSlider';
import GameOver from './components/game-over/GameOver';
import FeedbackMsg from './components/feedback-message/FeedbackMessage.tsx';
import { rndNumArrayGen } from './helpers/utilities.ts';
import { rangeLevelFn } from './helpers/utilities.ts';
import './styles/pokemon-game.css';
import Footer from './components/footer/Footer.tsx';

//set values ----------------
const CARDS = 10,
  MINCARD = 1;
//----------------
const title = 'Guess the Pokemon';
const subTitle = 'Drag and Drop the pokemon';
let points = 0;
const feedbackMsgOptions = {
  success: 'Great!',
  fail: 'Oops! try again!',
  initial: '',
};

//get your last level played
function localStoredLevel() {
  const storedLevel = window.localStorage.getItem('lastLevelPlayed');
  if (storedLevel !== undefined && storedLevel) {
    const levelMsg = `Your last level played was: ${storedLevel} : ${rangeLevelFn(
      +storedLevel
    )}`;

    console.warn(levelMsg);

    return { level: storedLevel, levelMsg: levelMsg };
  } else {
    return null;
  }
}

const initialLevel = localStoredLevel()
  ? Number(localStoredLevel()?.level)
  : 10;

//----------------------------------
function PokemonGame() {
  //set state variables
  const [level, setLevel] = useState<number>(initialLevel);

  let [dataList, setDataList] = useState<{}[]>([]);

  const [charactersName, setCharactersName] = useState<
    Array<{ id: string; name: string; imgUrl: string; itemStatus: Boolean }>
  >([{ id: '', name: '', imgUrl: '', itemStatus: false }]);

  const [draggedNodeData, setDraggedNodeData] = useState<null | string>(null);

  const [droppableNodeData, setDroppableNodeData] = useState<null | string>('');

  const [feedbackMsg, setFeedbackMsg] = useState(feedbackMsgOptions.initial);

  const [isGameover, setIsGameover] = useState<boolean>(false);

  useEffect(() => {
    //generate a random numbers array---

    const randomNumbersArray = rndNumArrayGen(CARDS, level, MINCARD);
    const arrayLen = randomNumbersArray.length;

    //fetch config parameters-----------

    const URLBASE = 'https://pokeapi.co/api/v2/pokemon/';
    const FETCH_OPTIONS = {
      header: { 'Content/type': 'application/json;chartset=utf-8' },
    };

    const options = { method: 'GET' };

    //fetch function------------------------
    async function getPokemonData(url: string) {
      try {
        const response = await fetch(url, { ...FETCH_OPTIONS, ...options });

        if (!response.ok) {
          const errMsg = `Something went wrong!.Status: ${response.status}`;

          throw new Error(errMsg);
        }

        let data = await response.json();
        data = { ...data, itemStatus: true };

        dataArray = [...dataArray, data];

        dataNamesArray = [
          ...dataNamesArray,
          {
            id: data.id.toString(),
            name: data.name.toString().trim().toLowerCase(),
            imgUrl: data.sprites.other['official-artwork'].front_default,
            itemStatus: false,
          },
        ];
      } catch (error) {
        console.log(error);
      }

      setDataList(dataArray);

      setCharactersName(
        dataNamesArray.sort(() => Math.random() - 0.5).reverse() //shuffled
      );
    }
    //*************************/
    let dataArray: {}[] = [],
      dataNamesArray: {
        id: string;
        name: string;
        imgUrl: string;
        itemStatus: Boolean;
      }[] = [];

    for (let i = 0; i < arrayLen; i++) {
      const characterId = randomNumbersArray[i];

      const url = `${URLBASE + characterId}`;

      getPokemonData(url);
    }
  }, [level]);

  function handleDragStart(e: React.DragEvent<HTMLElement>, name: string) {
    e.dataTransfer.setData('text/plain', e.currentTarget.id);

    setDraggedNodeData(e.dataTransfer.getData('text'));

    console.log(name);
  }
  //-----------------------------

  function handleDragOver(e: React.DragEvent<HTMLElement>, id: string) {
    e.preventDefault();

    setDroppableNodeData(id);
  }
  /*****************************/
  function handleDragDrop(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();

    if (draggedNodeData === droppableNodeData) {
      //draggable elements nodes
      setDataList((dataList) =>
        dataList.map((item, _) => {
          return item.id == draggedNodeData
            ? { ...item, itemStatus: false }
            : item;
        })
      );
      //droppable elements nodes
      setCharactersName((charactersName) =>
        charactersName.map((item, _) => {
          return item.id == droppableNodeData
            ? { ...item, itemStatus: true }
            : item;
        })
      );

      //------------------------------
      setFeedbackMsg(feedbackMsgOptions.success);
      points++;

      if (points >= CARDS) {
        setIsGameover(true);
        localStorage.setItem('lastLevelPlayed', JSON.stringify(level));
      }
    } else {
      setFeedbackMsg(feedbackMsgOptions.fail);
    }

    setTimeout(() => {
      setFeedbackMsg(feedbackMsgOptions.initial);
    }, 2000);
  }
  //**********************
  return (
    <>
      <section className='main__container'>
        <header className='title'>
          <Title title={title} />
        </header>

        {!isGameover && <RangeInputSlider level={level} setLevel={setLevel} />}

        {isGameover && <GameOver setGameover={setIsGameover} />}

        <div className='draggable__elements__container'>
          {dataList.map((character, ind) => {
            const {
              id,
              name,
              sprites: {
                other: {
                  ['official-artwork']: { front_default: characterUrlImg },
                },
              },
              itemStatus,
            } = character;

            return (
              <div
                className='character__img__container'
                key={`${ind}_${id}`}
                id={id}
              >
                {id && (
                  <>
                    <img
                      src={characterUrlImg}
                      alt={`img_${name}`}
                      id={id}
                      draggable={itemStatus}
                      className={`
                      character__img character__img--draggable ${
                        itemStatus ? 'visible' : 'hidden'
                      }
                      
                      `}
                      onDragStart={(e) => handleDragStart(e, name)}
                    />

                    <div
                      draggable
                      className={`helpName   ${
                        itemStatus ? 'visible' : 'hidden'
                      }`}
                    >
                      {name}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <Title title={subTitle} />

        <div className='droppable__elements__container'>
          {charactersName.map((character, _) => {
            const { id, name, imgUrl, itemStatus } = character;

            return (
              <div
                className='character__img__container character__img__container--droppable 
              '
                key={`${id}_${name}`}
              >
                <img
                  src={imgUrl}
                  alt={`img_${id}`}
                  draggable={false}
                  className={`
                  character__img
                     character__img--droppable
                  ${itemStatus ? 'visible' : 'hidden'}
                  `}
                />

                <div className={`character_name__container `}>
                  <p
                    className={`
                    character__name character__name--droppable
                    ${!itemStatus ? 'visible' : 'hidden'}
                  `}
                    id={id}
                    draggable={false}
                    onDragOver={(e) => handleDragOver(e, id)}
                    onDrop={(e) => handleDragDrop(e)}
                  >
                    {name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <FeedbackMsg feedbackMsg={feedbackMsg} />
      </section>
      <Footer />
    </>
  );
}

export default PokemonGame;