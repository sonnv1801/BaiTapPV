import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Cart from "../cart/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function NavBar() {
  const user = JSON.parse(localStorage.getItem("token"));
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");

    navigate("/");
    toast.success("Đăng xuất thành công! Hẹn gặp lại", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <AppBar position="static">
      <ToastContainer />
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Nguyễn Văn Sơn
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Thêm loại sản phẩm</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Thêm sản phẩm</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Nguyễn Văn Sơn
          </Typography>
          {user?.role === true ? (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link
                to="/create-prd"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Thêm sản phẩm
                </Button>
              </Link>
              <Link
                to="/type-prd"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Thêm loại sản phẩm
                </Button>
              </Link>
            </Box>
          ) : (
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
          )}
          <MenuItem>
            <Typography textAlign="center">
              Xin Chào: {user?.fullname}
            </Typography>
          </MenuItem>
          <Cart />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={user?.image} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {user === null ? (
                <Link
                  to="/login"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <MenuItem>
                    <Typography textAlign="center">Đăng nhập</Typography>
                  </MenuItem>
                </Link>
              ) : (
                <>
                  <Link
                    to="/order"
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <MenuItem>
                      <Typography textAlign="center">
                        Đơn hàng của bạn!
                      </Typography>
                    </MenuItem>
                  </Link>
                  <MenuItem onClick={handlelogout}>
                    <Typography textAlign="center">Đăng xuất</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
