import { Button, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface ISource {
  audio: string;
  ipa: string;
}

function Source({ id, name }: { name: string; id: number }) {
  const [isLoadding, setIsloadding] = useState<boolean>(true);

  const [us, setUs] = useState<ISource | null>(null);
  const [uk, setUk] = useState<ISource | null>(null);

  const idAudioUs = `myAudio-${id}-us`;
  const idAudioUk = `myAudio-${id}-uk`;
  const playAudioUs = () => {
    var audio = document.getElementById(idAudioUs);
    (audio as any)?.play();
  };

  const playAudioUk = () => {
    var audio = document.getElementById(idAudioUk);
    (audio as any)?.play();
  };

  useEffect(() => {
    (async () => {
      try {
        await getAudioFreedictionary();
        setIsloadding(false);
      } catch (error) {}
    })();
  }, []);

  const getAudioFreedictionary = async () => {
    const { data }: { data: any[] } = await axios({
      method: 'get',
      url: `https://api.freedictionary.dev/api/v1/entries/en/${name}`,
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
          {us && (
            <div>
              <Button
                className="mb-2 mr-2"
                type="primary"
                onClick={playAudioUs}
              >
                US
              </Button>
              <span>{us.ipa}</span>
              <audio id={idAudioUs}>
                <source src={us.audio} type="audio/mpeg"></source>
              </audio>
            </div>
          )}

          {uk && (
            <div>
              <Button type="primary" className="mr-2" onClick={playAudioUk}>
                UK
              </Button>
              <span>{uk.ipa}</span>
              <audio id={idAudioUk}>
                <source src={uk.audio}></source>
              </audio>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default React.memo(Source);
