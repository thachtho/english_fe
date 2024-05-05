import { List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
function Class() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  return (
    <div className="chapter-container">
      <div
        id="scrollableDiv"
        style={{
          marginTop: '10px',
          height: 'auto',
          padding: '5px 10px',
          borderRadius: '0.75rem',
          cursor: 'pointer',
        }}
      >
        <div
          className="list-chapter"
          style={{
            height: 'auto',
            padding: '5px 10px',
            border: '2px solid rgba(140, 140, 140, 0.35)',
            borderRadius: '0.75rem',
          }}
        >
          <List dense={dense}>
            {generate(
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>,
            )}
          </List>
        </div>
      </div>
    </div>
  );
}

export default Class;
