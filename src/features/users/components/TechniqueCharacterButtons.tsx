import React, { useState } from 'react';
import Button from '@mui/material/Button';
import type { Theme } from '@mui/material';

interface Props {
  characters: number[];
}

const styles = {
  button: {
    minWidth: '34px',
    minHeight: '40px',
    padding: 0,
    '&:not(:first-of-type)': {
      marginLeft: (theme: Theme) => theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.palette.primary.main,
      color: (theme: Theme) => theme.colors.white,
      padding: 0,
    },
  },
};

export const TechniqueCharacterButtons = ({
  characters,
}: Props) => {
  const [activeCharacter, setActiveCharacter] = useState<number>(0);

  return (
    <>
      {
        characters.map((character, index) => (
          <Button
            key={character}
            sx={styles.button}
            size="small"
            variant="contained"
            color={activeCharacter === index ? 'primary' : 'inherit'}
            onClick={() => {
              setActiveCharacter(index);
            }}
          >
            {character}
          </Button>
        ))
      }
    </>
  );
};
