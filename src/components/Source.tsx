import { Button, Spin } from 'antd';
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
}: {
  name: string;
  handleChangeSound: (src: string) => void;
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

  return (
    <>
      {!isLoadding && (
        <div className="flex flex-col">
          {!notFound ? (
            <>
              {us && (
                <div>
                  <Button
                    className="mb-2 mr-2"
                    type="primary"
                    onClick={() => handleChangeSound(us.audio)}
                  >
                    US
                  </Button>
                  <span>{us.ipa}</span>
                </div>
              )}

              {uk && (
                <div>
                  <Button
                    type="primary"
                    className="mr-2"
                    onClick={() => handleChangeSound(uk.audio)}
                  >
                    UK
                  </Button>
                  <span>{uk.ipa}</span>
                </div>
              )}
            </>
          ) : (
            NOT_FOUND
          )}
        </div>
      )}
    </>
  );
}

export default Sound;
