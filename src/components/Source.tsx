import { Spin } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const apiDictionary = `https://api.freedictionary.dev/api/v1/entries/en`;
const NOT_FOUND = 'Not found';

interface ISound {
  audio: string;
  ipa: string;
}

function Sound({
  name,
  handleChangeSound,
  flex = 'row',
}: {
  name: string;
  handleChangeSound: (src: string) => void;
  flex?: 'col' | 'row';
}) {
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoadding, setIsloadding] = useState<boolean>(true);
  const [us, setUs] = useState<ISound | null>(null);
  const [uk, setUk] = useState<ISound | null>(null);

  useEffect(() => {
    (async () => {
      try {
        await getAudioFreedictionary();
        setNotFound(false);
      } catch (error) {
        setNotFound(true);
      }
      setIsloadding(false);
    })();
  }, [name]);

  const getAudioFreedictionary = async () => {
    const { data }: { data: any[] } = await axios({
      method: 'GET',
      url: `${apiDictionary}/${name}`,
    });

    if (data.length > 0) {
      const variable = data[0]?.phonetics;
      const us = variable.find((item: any) => item.type === 'us');
      const uk = variable.find((item: any) => item.type === 'uk');

      if (us) {
        setUs(us);
      }

      if (uk) {
        setUk(uk);
      }
    }
  };

  if (isLoadding) {
    return <Spin />;
  }

  const flexType = `flex flex-col`;

  return (
    <>
      {!isLoadding && (
        <div>
          {!notFound ? (
            <div className={flexType}>
              {us && (
                <div className="flex items-center">
                  <b className="text-xs">US</b>
                  <SoundIcon handle={() => handleChangeSound(us.audio)} />
                  {us.ipa && <i className="ml-2">[{us.ipa}]</i>}
                </div>
              )}

              {uk && (
                <div className={` flex items-center`}>
                  <b className="text-xs">UK</b>
                  <SoundIcon handle={() => handleChangeSound(uk.audio)} />
                  {uk.ipa && <i className="ml-2">[{uk.ipa}]</i>}
                </div>
              )}
            </div>
          ) : (
            NOT_FOUND
          )}
        </div>
      )}
    </>
  );
}

export default Sound;

interface ISoundIconProps {
  handle?: () => void;
}
const SoundIcon = ({ handle }: ISoundIconProps) => {
  return (
    <div className="ml-2 cursor-pointer" onClick={() => handle && handle()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        viewBox="0 0 25 21"
      >
        <path
          fill="none"
          stroke="#7AC70C"
          d="M5.431 7.657l5.686-3.906V17.08l-5.683-3.904H1V7.657h4.431zm7.103-1.777l.814-.47a7.526 7.526 0 0 1 1.908 5.005c0 1.92-.725 3.67-1.908 5.005l-.814-.47a6.614 6.614 0 0 0 1.802-4.535 6.614 6.614 0 0 0-1.802-4.535zm3.806-2.192l.804-.464a11.822 11.822 0 0 1 2.43 7.191c0 2.705-.909 5.2-2.436 7.199l-.804-.464a10.905 10.905 0 0 0 2.321-6.735c0-2.534-.866-4.868-2.315-6.727zM20.996 1A16.213 16.213 0 0 1 24 10.415c0 3.509-1.117 6.76-3.01 9.423l-.8-.462a15.302 15.302 0 0 0 2.89-8.961c0-3.338-1.071-6.43-2.884-8.953l.8-.462z"
        ></path>
      </svg>
    </div>
  );
};
