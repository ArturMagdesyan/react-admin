import { useState } from 'react';

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);

  const onTrigger = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  return {
    open,
    onTrigger,
    onClose,
  };
};
