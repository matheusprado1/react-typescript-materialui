import { useCallback, useRef } from 'react';

export const useFormActions = () => {
  const isSavingAndBack = useRef(false);
  const isSavingAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndBack.current = false;
    isSavingAndNew.current = false;
  }, []);

  const handleSaveAndNew = useCallback(() => {
    isSavingAndBack.current = false;
    isSavingAndNew.current = true;
  }, []);

  const handleSaveAndBack = useCallback(() => {
    isSavingAndBack.current = true;
    isSavingAndNew.current = false;
  }, []);

  const isSaveAndNew = useCallback(() => isSavingAndNew.current, []);
  const isSaveAndBack = useCallback(() => isSavingAndBack.current, []);

  return {
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndBack: handleSaveAndBack,
    isSaveAndNew,
    isSaveAndBack,
  };
};
