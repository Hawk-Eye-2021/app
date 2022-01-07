import {FC, ChangeEvent, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
    Tooltip,
    Divider,
    Box,
    FormControl,
    TextField,
    Card,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableContainer,
    Typography,
    useTheme,
    CardHeader
} from '@mui/material';

import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface IColumn {
    title: string;
    key: string;
}

interface TableProps {
    className?: string;
    rows: any[];
    title: string;
    columns: IColumn[];
    addAction: () => any;
    deleteAction: (itemToDelete: any) => any;
    viewAction: (itemToView: any) => any;
}


const applyFilters = (
    rows: any[],
    columns: IColumn[],
    filterValue: string
): any[] => {
    if(filterValue) {
        return rows.filter((row) => {
            // @ts-ignore
            return Object.values(row).some((cellValue) => cellValue.includes ? cellValue.includes(filterValue) : false);
        });
    }
    return rows;
};

const applyPagination = (
    rows: any[],
    page: number,
    limit: number
): any[] => {
    return rows.slice(page * limit, page * limit + limit);
};

const MyTable: FC<TableProps> = ({ rows, columns, title, addAction, deleteAction, viewAction }) => {

    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(5);
    const [filterValue, setFilterValue] = useState<string>("");
    const [filteredData, setFilteredData] = useState<any[]>(rows);
    const [paginatedData, setPaginatedData] = useState<any[]>(rows);

    const handlePageChange = (event: any, newPage: number): void => {
        setPage(newPage);
    };

    const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLimit(parseInt(event.target.value));
    };

    useEffect(() => {
        setFilteredData(applyFilters(rows, columns, filterValue))
    }, [rows, columns, filterValue]);

    useEffect(() => {
        setPaginatedData(applyPagination(
            filteredData,
            page,
            limit
        ))
    }, [filteredData, page, limit])

    const theme = useTheme();

    return (
        <Card>
            <CardHeader
                action={
                    <Box width={200} display={"flex"} gap={1}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                value={filterValue}
                                onChange={(e) => {
                                    setFilterValue(e.target.value)
                                }}
                                label="Filtrar"
                            >
                            </TextField>
                        </FormControl>
                        <Tooltip title="Agregar" arrow>
                            <IconButton
                                sx={{
                                    '&:hover': {
                                        background: theme.colors.success.lighter
                                    },
                                    color: theme.palette.success.dark
                                }}
                                color="inherit"
                                size="medium"
                                onClick={addAction}
                            >
                                <AddTwoToneIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>
                    </Box>
                }
                title={title}
            />
            <Divider/>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((col) => {
                                    return (
                                        <TableCell key={`col-${col.title}`}>
                                            {col.title}
                                        </TableCell>
                                    )
                                })
                            }
                            <TableCell align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`table-row-${index}`}
                                >
                                    {
                                        columns.map((col, cellIndex) => {
                                            return (
                                                <TableCell key={`cell-${index}-${cellIndex}`}>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                        color="text.primary"
                                                        gutterBottom
                                                        noWrap
                                                    >
                                                        {paginatedData[index][col.key] || ""}
                                                    </Typography>
                                                </TableCell>
                                            )
                                        })
                                    }
                                    <TableCell align="right">
                                        <Tooltip title="Ver" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => viewAction(paginatedData[index])}
                                            >
                                                <VisibilityTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Borrar" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {background: theme.colors.error.lighter},
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
                                                onClick={() => deleteAction(paginatedData[index])}
                                            >
                                                <DeleteTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box p={2}>
                <TablePagination
                    component="div"
                    count={filteredData.length}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleLimitChange}
                    page={page}
                    rowsPerPage={limit}
                    rowsPerPageOptions={[5, 10, 25, 30]}
                    labelDisplayedRows={({from, to, count}) => {
                        return `${from}-${to} de ${count !== -1 ? count : `mas de ${to}`}`
                    }}
                    labelRowsPerPage={'Filas por página:'}
                />
            </Box>
        </Card>
    );
};

MyTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    addAction: PropTypes.func.isRequired,
    deleteAction: PropTypes.func.isRequired,
    viewAction: PropTypes.func.isRequired
};


export default MyTable;