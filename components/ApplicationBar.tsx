import * as React from 'react';

import { Button, IconButton, Sheet, Typography, useColorScheme, useTheme } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { ChatModels, SystemPurposes } from '@/lib/data';
import { NoSSR } from '@/components/util/NoSSR';
import { useSettingsStore } from '@/lib/store';


/**
 * The top bar of the application, with the model and purpose selection, and menu/settings icons
 */
export function ApplicationBar(props: { onClick: () => void, onSettingsClick: () => void, sx?: SxProps }) {
  const theme = useTheme();
  const { mode: colorMode, setMode: setColorMode } = useColorScheme();

  const { chatModelId, systemPurposeId } = useSettingsStore(state => ({
    chatModelId: state.chatModelId, systemPurposeId: state.systemPurposeId,
  }));

  const handleDarkModeToggle = () => setColorMode(colorMode === 'dark' ? 'light' : 'dark');

  return (
    <Sheet variant='solid' invertedColors sx={{
      p: 1,
      display: 'flex', flexDirection: 'row',
      ...(props.sx || {}),
    }}>

      <IconButton variant='plain' color='neutral' onClick={handleDarkModeToggle}>
        <DarkModeIcon />
      </IconButton>

      {/*{!isEmpty && (*/}
      {/*  <IconButton variant='plain' color='neutral' disabled={isDisabledCompose} onClick={onClearConversation}>*/}
      {/*    <DeleteOutlineOutlinedIcon />*/}
      {/*  </IconButton>*/}
      {/*)}*/}

      <Typography sx={{
        textAlign: 'center',
        fontFamily: theme.vars.fontFamily.code, fontSize: '1rem', lineHeight: 1.75,
        my: 'auto',
        flexGrow: 1,
      }}>
        <NoSSR>
          {ChatModels[chatModelId]?.title || 'Select Model'}
          <span style={{ opacity: 0.5 }}> · </span>
          {SystemPurposes[systemPurposeId].title}
          <Button variant='plain' color='neutral' onClick={props.onClick}>
            Edit
          </Button>
        </NoSSR>
      </Typography>

      <IconButton variant='plain' color='neutral' onClick={props.onSettingsClick}>
        <SettingsOutlinedIcon />
      </IconButton>
    </Sheet>
  );
}