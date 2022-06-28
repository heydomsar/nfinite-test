import { TableCell, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SuccessRow = ({ row }) => {
  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell>
        <CheckCircleIcon color="success" fontSize="large" />
      </TableCell>
      <TableCell>{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">
        {row.width}&nbsp;x&nbsp;{row.height}
      </TableCell>
      <TableCell align="right">
        <img src={row.url} alt={row.name} width="200px" loading="lazy" />
      </TableCell>
    </TableRow>
  );
};

export default SuccessRow;
