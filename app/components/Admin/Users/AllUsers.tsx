import React from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from "next-themes";
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import Loader from '../../Loader/Loader';
import { format } from 'timeago.js';

type Props = {}

const AllUsers = (props: Props) => {
    const { theme, setTheme } = useTheme();

    const { isLoading, data, error } = useGetAllUsersQuery({});

    const columns = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Họ và tên", flex: 0.4 },
        { field: "email", headerName: "Email", flex: 0.6 },
        { field: "role", headerName: "Vai trò", flex: 0.3 },
        { field: "courses", headerName: "Số khóa học", flex: 0.3 },
        { field: "created_at", headerName: "Ngày tham gia", flex: 0.4 },
        {
            field: " ",
            headerName: "Xóa",
            flex: 0.3,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete
                                className="dark:text-white text-black"
                                size={20}
                            />
                        </Button>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.3,
            renderCell: (params: any) => {
                return (
                    <>
                        <a href={`mailto:${params.row.email}`}>
                            <AiOutlineMail
                                className="dark:text-white text-black ml-8 mt-4"
                                size={20}
                            />
                        </a>
                    </>
                )
            }
        }
    ]

    const localeText = {
        noRowsLabel: 'Không có hàng',
        noResultsOverlayLabel: 'Không tìm thấy kết quả',
        errorOverlayDefaultLabel: 'Có lỗi xảy ra',
        footerRowSelected: (count: number) => `${count} hàng được chọn`,
        footerTotalRows: 'Tổng số hàng:',
        footerPage: 'Trang',
        footerPaginationRowsPerPage: 'Hàng mỗi trang:',
        footerPaginationButton: 'Đi',
    };

    const rows: any = [];
    {
        if (data) {
            data.users.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    email: item.email,
                    role: item.role,
                    course: item.course,
                    created_at: format(item.createdAt),
                });
            });
        }
    }
    return (
        <div className="mt-[120px] flex justify-center">
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <Box m="20px" sx={{ width: '80%', maxWidth: '1200px', padding: '20px' }}>
                        <Box
                            height="75vh"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                overflowY: 'auto',
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                    outline: "none",
                                },
                                "& .MuiSelect-icon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-sortIcon": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-row ": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                    borderBottom:
                                        theme === "dark"
                                            ? "1px solid #ffffff30!important"
                                            : "1px solid #ccc!important",
                                },
                                "& .MuiTablePagination-root": {
                                    color: theme === "dark" ? "#000" : "#fff",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                },
                                "& .name-column--cell": {
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderBottom: "none",
                                    color: theme === "dark" ? "" : "#000",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    color: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                    borderTop: "none",
                                    color: theme === "dark" ? "#fff" : "#000",
                                },
                                "& .MuiCheckBox-root": {
                                    color: theme === "dark" ? `#b7ebde !important` : `#000 !important `,
                                },
                                "& .MuiDataGrid-toolbaarContainer .MuiButton-text": {
                                    color: `#fff !important`,
                                },
                            }}
                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} localeText={localeText} />
                        </Box>
                    </Box>
                )
            }
        </div>
    )
}

export default AllUsers