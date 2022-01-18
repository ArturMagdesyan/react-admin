import React, { useState, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import { useTranslation } from 'react-i18next';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { ReactComponent as ColorizeDownloadIcon } from '../../../../../assets/colorizeDownload.svg';
import { ReactComponent as AttachIcon } from '../../../../../assets/attach.svg';
import { downloadFile } from '../../../../../utils/downloadFile';
import { useUploadFile, useAttachFile } from '../api';
import type { UploadFileResponse } from '../types';
import { documentActionTypes } from '../constants';

const styles = {
  actionText: (isInherit: boolean) => ({
    padding: 0,
    minHeight: '25px',
    '&:not(:first-child)': {
      marginTop: '5px',
    },
    '&:hover': {
      backgroundColor: (theme: Theme) => isInherit && theme.colors.solitudeSecondary,
      padding: 0,
    },
  }),
  menu: {
    '& .MuiList-root': {
      backgroundColor: (theme: Theme) => theme.colors.solitude,
    },
  },
};

export interface Props {
  file: Record<string, string>;
  documentId: number;
}

export const DocumentActionMenu = ({ file, documentId }: Props) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [actionType, setActionType] = useState<string>('');
  const uploadFileMutate = useUploadFile();
  const attachFileMutate = useAttachFile();

  const openDropdownContent = (event: any, type: string) => {
    setActionType(type);
    setAnchorEl(event?.currentTarget!);
  };

  const closeDropdown = () => {
    setAnchorEl(null);
  };

  const handleDownloadFile = () => {
    downloadFile(file[actionType]);
    closeDropdown();
  };

  const getFile = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files![0];
    uploadFileMutate.mutate(selectedFile, {
      onSuccess: ({ id }: UploadFileResponse) => {
        attachFileMutate.mutate({
          documentId,
          resourceType: actionType,
          resourceId: id,
        });
      },
    });
  };

  return (
    <Box>
      {
        documentActionTypes.map((type) => (
          <Button
            sx={styles.actionText(!file[type])}
            color={file[type] ? 'primary' : 'inherit'}
            key={type}
            variant="contained"
            onClick={
              (event) => openDropdownContent(event, type)
            }
          >
            {t(`documentsActions.${type}`)}
          </Button>
        ))
      }
      <Menu
        sx={styles.menu}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeDropdown}
      >
        <MenuItem onClick={handleDownloadFile} disabled={!file[actionType]}>
          <ListItemIcon>
            <ColorizeDownloadIcon />
          </ListItemIcon>
          <ListItemText>
            {t('documentsActions.download')}
          </ListItemText>
        </MenuItem>
        <Stack>
          <label htmlFor="contained-button-file">
            <Input
              sx={{ display: 'none' }}
              id="contained-button-file"
              type="file"
              onChange={getFile}
              inputProps={{ accept: 'application/pdf, .csv, image/*' }}
            />
            <MenuItem>
              <AttachIcon />
              <ListItemText>
                {t('documentsActions.attach')}
              </ListItemText>
            </MenuItem>
          </label>
        </Stack>
      </Menu>
    </Box>
  );
};
