"use client";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "@/public/img/icono.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const pages = ["Listado Post","Listado Usuarios"];
const settings = ["Perfil", "Cerrar Sesión"];

const NavBar = () => {
  const router = useRouter();
  const userState = useAppSelector((state) => state.userReducer);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleRouter = (route) => {
    if (route === "Listado") {
      router.push("/listado");
    }
  };
  const handleCloseNavMenu = () => {
    router.push("");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickCloseSession = (setting) => {
    if(setting === 'Cerrar Sesión'){
      router.push('/');
    }
    setAnchorElUser(null);
  }

  return (
    <AppBar
      position="fixed"
      style={{ background: "#fedd63", fontFamily: "Edo" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Icon
            sx={{
              width: 104,
              height: 65,
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          >
            <Image src={logo} alt="" width={104} height={65}></Image>
          </Icon>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#000000" }}
            >
              <MenuIcon sx={{ color: "#000000" }} />
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
                {pages.map((page) => (
                  <MenuItem
                    sx={{
                      background: "#fedd63",
                      paddingTop: 0,
                      paddingBottom: 0,
                      fontWeight: 600,
                    }}
                    key={page}
                    onClick={() => handleRouter(page)}
                  >
                    <Typography
                      sx={{ color: "#000000", fontWeight: "600" }}
                      textAlign="center"
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
          </Box>
          <Icon
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              width: 104,
              height: 65,
            }}
          >
            <Image src={logo} alt="" width={104} height={65}></Image>
          </Icon>
            <>
              <Box
                style={{ background: "#fedd63", fontFamily: "Edo" }}
                sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={() => handleRouter(page)}
                    sx={{
                      my: 2,
                      color: "#000000",
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src={userState.imageUrl}
                    />
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
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={()=> handleClickCloseSession(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
