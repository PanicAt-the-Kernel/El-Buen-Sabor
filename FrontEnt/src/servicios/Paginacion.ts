export const handleChangePage = (
    //@ts-ignore
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setPage(newPage);
  };
  
  export const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,
    setPage: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };