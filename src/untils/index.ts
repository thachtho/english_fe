export interface IResponseClassList {
  id: number;
  blockId: number;
  name: string;
  courseName: string;
}

export interface IResponseUnitLessons {
  id: number;
  blockId: number;
  name: string;
  courseName: string;
}
const getKeyTab = (location: Location) => {
  const search = location.search;

  if (search && search?.length !== 0) {
    return `${location.pathname}${search}`;
  }

  return location.pathname;
};

const renderDataClassListWithTeacher = (
  courses: ICourse[],
): IResponseClassList[] => {
  let list: IResponseClassList[] = [];

  for (const course of courses) {
    const { classList } = course;

    const result = classList.map((classObject) => {
      return {
        id: classObject.id,
        blockId: classObject.blockId,
        name: classObject.name,
        courseName: course.courseName,
      };
    });

    list = [...list, ...result];
  }

  return list;
};

const renderDropdownStudyPrograms = (studyPrograms: IStudyProgram[]) => {
  const dropdownStudyPrograms = studyPrograms.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return dropdownStudyPrograms;
};

const renderDropdownUnits = (units: IUnit[]) => {
  const dropdownUnits = units.map((item) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return dropdownUnits;
};

export {
  getKeyTab,
  renderDataClassListWithTeacher,
  renderDropdownStudyPrograms,
  renderDropdownUnits,
};
