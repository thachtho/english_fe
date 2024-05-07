import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getUnitLessonInClass } from '../../../api/class-manager.api';
import { getClass } from '../../../api/class.api';
import Loader from '../../../common/Loader';
import WraperLayoutStudent from '../../../layout/WraperLayoutStudent';

function Unit() {
  const { id: classId } = useParams();
  const [classOption, setClassOption] = useState<IClass | null>(null);
  const [unitLesson, setUnitLesson] = useState<IClassManager[]>([]);

  const breadCrumb = [
    {
      url: '/studentPage/class',
      name: 'Trang chủ',
    },
    {
      name: `Lớp ${classOption?.name}`,
      isPrimary: true,
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getClass(Number(classId));
        const { data: unitLesson } = await getUnitLessonInClass(
          Number(classId),
        );
        setClassOption(data);
        setUnitLesson(unitLesson);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
      }
    })();
  }, [classId]);

  if (!classOption) {
    return <Loader />;
  }

  return (
    <>
      <WraperLayoutStudent breadCrumb={breadCrumb}>
        <List component="nav">
          {/* <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItemButton> */}
          {unitLesson.map((item, i) => {
            return <UnitItem key={i} item={item} />;
          })}
        </List>
      </WraperLayoutStudent>
    </>
  );
}

export default Unit;

const UnitItem = ({ item }: { item: IClassManager }) => {
  const { classManagerLessons, unit } = item;
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={`${unit.name}`} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {classManagerLessons.length > 0 &&
        classManagerLessons.map((item, j) => {
          const { lesson } = item;
          return (
            <Collapse key={j} in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={`${lesson.name}`} />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
    </>
  );
};
