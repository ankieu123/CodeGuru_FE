import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import toast from "react-hot-toast";


type Props = {
  isTeam: boolean;
};


const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [loadUser, setLoadUser] = useState(false);
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();

  const { isLoading, data, error } = useGetAllUsersQuery({});
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      toast.success("Cập nhật vai trò người dùng thành công!");
      setActive(false);
      setLoadUser(true);
    }
    if (deleteSuccess) {
      toast.success("Xóa người dùng thành công!");
      setOpen(false);
      setLoadUser(true);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Họ và tên", flex: 0.4 },
    { field: "email", headerName: "Email", flex: 0.5 },
    { field: "role", headerName: "Vai trò", flex: 0.3 },
    { field: "created_at", headerName: "Ngày tham gia", flex: 0.5 },
    {
      field: " ",
      headerName: "Xóa",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        );
      },
    },
    {
      field: "  ",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <Button>
            <a href={`mailto:${params.row.email}`}>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </Button>
        );
      },
    },
  ];

  const localeText = {
    noRowsLabel: "Không có dữ liệu",
    noResultsOverlayLabel: "Không tìm thấy kết quả",
    errorOverlayDefaultLabel: "Có lỗi xảy ra",
    footerRowSelected: (count: number) => `${count} học viên được chọn`,
    footerTotalRows: "Tổng số học viên:",
    footerPage: "Trang",
    footerPaginationRowsPerPage: "Học viên mỗi trang:",
    footerPaginationButton: "Đi",
  };
>>>>>>> b22d0b55909f439d960cfb08cddbdcd60275a158

  const rows: any = [];

  if (data) {
    if (isTeam) {
      // Hiển thị các admin khi isTeam = true
      const adminData = data.users.filter((item: any) => item.role === "admin");
      adminData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: format(item.createdAt, "vi"),
        });
      });
    } else {
      // Hiển thị các role khác khi isTeam = false
      const userData = data.users.filter((item: any) => item.role !== "admin");
      userData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          created_at: format(item.createdAt, "vi"),
        });
      });
    }
  }
  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px] flex justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <Box
          m="20px"
          sx={{ width: "80%", maxWidth: "1200px", padding: "20px" }}
        >
          {isTeam && (
            <div className="full justify-end">
              <div
                className={`flex flex-row justify-center items-center py-3 px-6 !rounded-[10px] cursor-pointer bg-[#57c7a3] !h-[35px] text-[16px] font-Poppins font-semibold !w-[200px] dark:bg-[#57c7a3] !h-[35px] dark:border  dark:text-[#fff] `}
                onClick={() => setActive(!active)}
              >
                Thêm thành viên
              </div>
              <br />
            </div>
          )}

          <Box
            height="70vh"
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect_icon": {
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
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important `,
              },
              "& .MuiDataGrid-toolbaarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              localeText={localeText}
            />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={"styles.title  dark:text-white"}>
                  Thêm người dùng mới
                </h1>
                <div className="mt-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                    className="styles.input dark:text-white"
                  />
                  <select
                    name=""
                    id=""
                    className="{style.input}  !mt-6 dark:text-white"
                  >
                    <option value="admin" className="dark:text-white">
                      Admin
                    </option>
                    <option value="user">Học viên</option>
                  </select>
                  <br />
                  <div
                    className="styles.button  my-6 !h-[30px] flex flex-row justify-center items-center py-3 px-6 !rounded-[10px] cursor-pointer bg-[#57c7a3]"
                    onClick={handleSubmit}
                  >
                    Tạo
                  </div>
                </div>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className="styles.title dark:text-white">
                  Bạn có muốn xóa người dùng này không?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    className="styles.button w-[120px] h-[30px] bg-[#57c7a3] flex justify-center items-center cursor-pointer rounded"
                    onClick={() => setOpen(false)}
                  >
                    Hủy bỏ
                  </div>
                  <div
                    className="styles.button w-[120px] h-[30px] bg-[#d63f3f] flex justify-center items-center cursor-pointer rounded"
                    onClick={handleDelete}
                  >
                    Xóa
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
