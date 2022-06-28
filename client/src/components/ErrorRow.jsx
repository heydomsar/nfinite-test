import { TableCell, TableRow } from '@mui/material';
import Error from '@mui/icons-material/Error';

const ErrorRow = ({ row }) => {
  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <Error color="disabled" fontSize="large" />
      </TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell align="center">Bad Image</TableCell>
    </TableRow>
  );
};

export default ErrorRow;
