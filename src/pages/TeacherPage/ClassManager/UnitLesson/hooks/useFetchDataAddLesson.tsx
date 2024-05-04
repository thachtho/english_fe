import { useEffect, useState } from 'react';
import { getClassManager } from '../../../../../api/class-manager.api';
import { getLessonsByUnitId } from '../../../../../api/lesson.api';
import { getAllUnitLessonByStudyProgramId } from '../../../../../api/unit.api';
import useGetDataStudyPrograms from './useGetDataStudyPrograms';
import {
  renderDropdownLessons,
  renderDropdownStudyPrograms,
  renderDropdownUnits,
} from '../../../../../untils';

function useFetchDataAddLesson(
  idClassManagerSelected: number,
  blockId: number,
) {
  const { studyPrograms } = useGetDataStudyPrograms({
    blockId: Number(blockId),
  });
  const [classManager, setClassManager] = useState<null | IClassManager>(null);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [lessons, setLessons] = useState<ILesson[]>([]);
  const [studyProgramId, setStudyProgramId] = useState<number | null>(null);
  const [unitId, setUnitId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const { data: classManager } = await getClassManager(
        Number(idClassManagerSelected),
      );

      setClassManager(classManager);
      setStudyProgramId(classManager?.unit?.studyProgramId);
      setUnitId(classManager?.unitId);
    })();
  }, [idClassManagerSelected]);

  useEffect(() => {
    (async () => {
      if (studyProgramId) {
        const { data: units } = await getAllUnitLessonByStudyProgramId(
          Number(studyProgramId),
        );
        setUnits(units);
      }
    })();
  }, [studyProgramId]);

  useEffect(() => {
    (async () => {
      if (unitId) {
        const { data: lessons } = await getLessonsByUnitId(Number(unitId));
        setLessons(lessons);
      }
    })();
  }, [unitId]);

  const dropdownStudyPrograms = renderDropdownStudyPrograms(studyPrograms);
  const dropdownUnits = renderDropdownUnits(units);
  const dropdownLessons = renderDropdownLessons(lessons);

  return {
    dropdownStudyPrograms,
    dropdownUnits,
    dropdownLessons,
    classManager,
    unitId,
    setUnitId,
  };
}

export default useFetchDataAddLesson;
