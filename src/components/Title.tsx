type TitlePropType={title:string}

function Title({title}:TitlePropType):JSX.Element {

  return (
    <>
      <h1 className='title'>{title}</h1>
    </>
  );
}

export default Title;
