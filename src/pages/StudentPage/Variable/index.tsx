import { useNavigate } from 'react-router-dom';
import Loader from '../../../common/Loader';
import useQueryUrl from '../../../hooks/useQueryUrl';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';
import {
  useCheckPermisson,
  useFetchDataByManagerLessonId,
  useGetBreadCrumbs,
} from './hooks';
import useVariable from './state';
import useSound from '../../../hooks/useSound';
import Sound from '../../../components/Source';

function Variable() {
  const navigation = useNavigate();
  const classManagerLessonId = useQueryUrl('classManagerLessonId');
  const { variables } = useVariable();
  useCheckPermisson(classManagerLessonId);
  useFetchDataByManagerLessonId(classManagerLessonId);
  const { audio, handleChangeSource, audioSrc, setIsPlaying } = useSound();
  const breadCrumbs = useGetBreadCrumbs();

  if (!variables) {
    return <Loader />;
  }

  console.log(22222222, breadCrumbs);

  return (
    <WraperLayoutStudent breadCrumb={breadCrumbs}>
      {variables.length > 0 &&
        variables.map((item, i) => {
          return (
            <div
              key={i}
              className="flex p-2 m-2 rounded-lg border border-secondary text-black"
            >
              <div className="flex flex-col">
                <div>
                  <span>
                    <b className="mb-2 text-xl">{item.name}</b>
                  </span>

                  <span className="ml-2">
                    <i>vi:</i> <b>{item.vi}</b>
                  </span>
                </div>

                <Sound
                  handleChangeSound={handleChangeSource}
                  name={item.name}
                />
              </div>
            </div>
          );
        })}
      <audio
        id="audio"
        src={audioSrc || ''}
        ref={audio}
        onEnded={() => setIsPlaying(false)}
      />
    </WraperLayoutStudent>
  );
}

export default Variable;
