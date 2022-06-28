import { useEffect, useState } from 'react';
import { Table, TableBody, TableContainer, Paper } from '@mui/material/';
import SuccessRow from '../components/SuccessRow';
import ErrorRow from '../components/ErrorRow';

const PageTwo = ({ data = [] }) => {
  const [rows, setRows] = useState();

  const processUrl = async (src) => {
    var result = await fetch(src);
    if (result.ok) {
      return true;
    }
    return false;
  };

  const processImage = async (src) => {
    let img;
    const imageLoadPromise = new Promise((resolve) => {
      img = new Image();
      img.onload = resolve;
      img.src = src;
    });

    await imageLoadPromise;
    return {
      width: img.width,
      height: img.height,
    };
  };

  const createRow = (row) => {
    if (row.width && row.width !== 0) {
      return <SuccessRow key={row.id} row={row} />;
    }
    return <ErrorRow key={row.id} row={row} />;
  };

  const aggregateData = async () => {
    const mergedData = await Promise.all(
      data.map(async (row) => {
        const isValidUrl = await processUrl(row.url);
        if (isValidUrl) {
          const dimensions = await processImage(row.url);
          return { ...row, width: dimensions.width, height: dimensions.height };
        } else {
          return { ...row, width: 0, height: 0 };
        }
      })
    );
    setRows(mergedData);
  };

  useEffect(() => {
    aggregateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, maxWidth: 800, margin: '0 auto' }}
        aria-label="simple table"
      >
        <TableBody>{rows && rows.map((row) => createRow(row))}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default PageTwo;
