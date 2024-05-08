import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { useHandle } from '../hooks/unitItem';

export const UnitItem = ({ item }: { item: IClassManager }) => {
  const { navigationVariablePage } = useHandle();
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
                  <ListItemText
                    primary={`${lesson.name}`}
                    onClick={() => navigationVariablePage(item.id)}
                  />
                </ListItemButton>
              </List>
            </Collapse>
          );
        })}
    </>
  );
};
