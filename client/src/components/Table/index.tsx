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

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

interface IColumn {
    title: string;
}

interface TableProps {
    className?: string;
    rows: any[];
    title: string;
    columns: IColumn[]
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

const MyTable: FC<TableProps> = ({ rows, columns, title }) => {

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
                    <Box width={150}>
                        <FormControl fullWidth variant="outlined">
                            <TextField
                                value={filterValue}
                                onChange={(e) => {
                                    setFilterValue(e.target.value)
                                }}
                                label="Filter"
                            >
                            </TextField>
                        </FormControl>
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
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                >
                                    {
                                        Object.values(paginatedData[index]).map(cellValue => {
                                            return (
                                                <>
                                                    <TableCell>
                                                        <Typography
                                                            variant="body1"
                                                            fontWeight="bold"
                                                            color="text.primary"
                                                            gutterBottom
                                                            noWrap
                                                        >
                                                            {cellValue}
                                                        </Typography>
                                                    </TableCell>
                                                </>
                                            )
                                        })
                                    }
                                    <TableCell align="right">
                                        <Tooltip title="Edit" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {
                                                        background: theme.colors.primary.lighter
                                                    },
                                                    color: theme.palette.primary.main
                                                }}
                                                color="inherit"
                                                size="small"
                                            >
                                                <EditTwoToneIcon fontSize="small"/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete" arrow>
                                            <IconButton
                                                sx={{
                                                    '&:hover': {background: theme.colors.error.lighter},
                                                    color: theme.palette.error.main
                                                }}
                                                color="inherit"
                                                size="small"
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
                />
            </Box>
        </Card>
    );
};

MyTable.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};


export default MyTable;