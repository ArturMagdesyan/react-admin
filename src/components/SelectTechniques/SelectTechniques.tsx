import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/material/Input';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CloseIcon } from '../Icons';
import { useTechniques } from '../../features/techniques/api/getTechniques';
import { Technique } from '../Technique';
import { TableFilterAction, Technique as TechniqueEnum } from '../../common/enums';
import { Spinner } from '../Spinner';

const styles = {
  root: (
    disabled: boolean,
    multiple: boolean,
  ) => ({
    border: '1px',
    borderStyle: 'solid',
    borderColor: (theme: Theme) => theme.colors.solitudeSecondary,
    minWidth: multiple ? '410px' : '260px',
    width: multiple ? '410px' : '260px',
    height: '42px',
    borderRadius: '10px',
    '&:hover': {
      borderColor:
        disabled ? 'none' : (theme: Theme) => theme.palette.primary.dark,
    },
    '& .MuiInput-root': {
      marginTop: 0,
    },
    '& .MuiInputLabel-root': {
      top: (theme: Theme) => theme.spacing(2.8),
    },
    '& .MuiSelect-select': {
      display: 'flex',
      padding: (theme: Theme) => theme.spacing(
        1,
        0,
      ),
    },
  }),
  multipleSelectedView: {
    overflow: 'hidden',
    width: '246px',
    display: 'flex',
    gap: 0.5,
    marginLeft: '130px',
    '& .MuiBox-root': {
      display: 'flex',
      alignItems: 'center',
      bgcolor: (theme: Theme) => theme.colors.solitude,
      p: (theme: Theme) => theme.spacing(
        0.6,
        1,
      ),
      borderRadius: '10px',
      gap: 0.5,
      '& .MuiTypography-root': {
        fontWeight: 500,
      },
      '& .MuiButton-root': {
        minWidth: '14px',
        minHeight: '14px',
        height: '12px',
        borderRadius: '50%',
        bgcolor: (theme: Theme) => theme.colors.white,
        padding: 0,
        '& .MuiSvgIcon-root': {
          fontSize: '12px',
        },
      },
    },
  },
  singleSelectedView: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: (theme: Theme) => theme.spacing(0.5),
  },
  notChosenView: {
    right: 70,
    top: 12,
    color: (theme: Theme) => theme.colors.echoBlue,
  },
  menuListView: {
    bgcolor: (theme: Theme) => theme.colors.solitude,
    boxShadow: 3,
    '& .MuiMenuItem-root': {
      gap: 2,
      '&:hover': {
        bgcolor: 'rgba(69, 181, 255, .1)',
      },
    },
    '& .Mui-selected': {
      bgcolor: 'transparent',
    },
  },
  listItemView: (isActive: boolean) => ({
    color: isActive
      ? (theme: Theme) => theme.palette.primary.main
      : (theme: Theme) => theme.palette.info.main,
  }),
  checkbox: {
    color: (theme: Theme) => theme.palette.info.main,
  },
};

interface Props {
  dispatch: React.Dispatch<any>;
  multiple?: boolean;
  disabled?: boolean;
  defaultValue?: TechniqueEnum;
}

export const SelectTechniques = ({
  dispatch,
  multiple = true,
  disabled = false,
  defaultValue,
}: Props) => {
  const [selectedTechniqueIds, setSelectedTechniqueIds] = useState<number[]>([]);
  const {
    data: techniques,
    isLoading,
    isFetched,
    isError,
  } = useTechniques();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    dispatch({ type: TableFilterAction.ADD_TECHNIQUE_IDS, value: selectedTechniqueIds });
  }, [selectedTechniqueIds, dispatch]);

  useEffect(() => {
    setSelectedTechniqueIds([]);
  }, [location.pathname]);

  const handleChange = (event: SelectChangeEvent<typeof selectedTechniqueIds>) => {
    const value = event.target.value as typeof selectedTechniqueIds;

    if (multiple) {
      setSelectedTechniqueIds(value);

      return;
    }

    setSelectedTechniqueIds(value.slice(-1));
  };

  const onDelete = (id: number) => {
    setSelectedTechniqueIds(
      selectedTechniqueIds.filter((techniquesId) => techniquesId !== id),
    );
  };

  useEffect(() => {
    if (!defaultValue || !techniques) return;

    const technique = techniques.find((item) => (
      item.name === defaultValue
    ));

    if (!technique) return;

    setSelectedTechniqueIds([technique.id]);
  }, [defaultValue, techniques]);

  if (isLoading || !isFetched) {
    return <Spinner />;
  }

  if (isError) {
    return <>{t('errors.fetchTechniques')}</>;
  }

  return (
    <FormControl sx={styles.root(disabled, multiple)}>
      {
        !selectedTechniqueIds.length && (
          <Box
            position="absolute"
            sx={styles.notChosenView}
          >
            <Typography variant="body2">
              {t('filters.notChosen')}
            </Typography>
          </Box>
        )
      }
      <InputLabel shrink color="info" disabled={disabled}>
        <Typography variant="body1" color="info">
          {t('filters.selectTechnique')}
        </Typography>
      </InputLabel>
      <Select
        disabled={disabled}
        autoWidth
        multiple
        disableUnderline
        value={selectedTechniqueIds}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected) => (
          multiple ? (
            <Box sx={styles.multipleSelectedView}>
              {
                selected.map((techniqueId) => (
                  <Box key={techniqueId}>
                    <Typography
                      variant="body2"
                      color="primary"
                    >
                      {t(`techniques.${
                        techniques!.find(
                          (technique) => technique.id === techniqueId,
                        )?.name
                      }`)}
                    </Typography>
                    <Button
                      onClick={() => {
                        onDelete(techniqueId);
                      }}
                    >
                      <CloseIcon
                        fontSize="small"
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    </Button>
                  </Box>
                ))
              }
            </Box>
          ) : (
            <Box sx={styles.singleSelectedView}>
              <Typography
                variant="body2"
                color="primary"
              >
                {t(`techniques.${
                  techniques!.find(
                    (technique) => technique.id === selectedTechniqueIds[0],
                  )?.name
                }`)}
              </Typography>
            </Box>
          )
        )}
        MenuProps={{
          MenuListProps: {
            sx: styles.menuListView,
          },
        }}
      >
        {techniques!.map((technique) => {
          const isActive = selectedTechniqueIds.indexOf(technique.id) > -1;

          return (
            <MenuItem key={technique.id} value={technique.id}>
              <Technique techniqueName={technique.name} color={isActive ? 'primary' : 'info'} />
              <ListItemText
                primary={t(`techniques.${technique.name}`)}
                sx={styles.listItemView(isActive)}
              />
              {
                multiple && (
                  <Checkbox
                    checked={isActive}
                    sx={styles.checkbox}
                  />
                )
              }
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
