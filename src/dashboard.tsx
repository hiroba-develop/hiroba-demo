// Dashboard.tsx
import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import LisConne from "./images/LisConne.png";
// import TeamBase from "./images/TeamBase.png";

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: "#00968e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

// メインダッシュボードコンポーネント
const Dashboard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = () => {
    navigate("/");
  };

  const handleContact = () => {
    window.open("https://p00-nx001a.yohaku2022.work/cdn/v0face/#/yohaku/w6dumwrmds/j88wpkafqz", "_blank");
  };

  const handlePhotoClick = (url: string) => {
    window.open(url, "_blank");
  };

  const photos = [
    {
      url: "https://p00-nx001a.yohaku2022.work/cdn/v0face/#/yohaku/w6dumwrmds/j88wpkafqz",
      src: "https://placehold.jp/128/66cdaa/ffffff/1000x300.png?text=HIROBA+Face",
      label: "クリック一つでビデオ通話のお問い合わせアプリ",
    },
    {
      url: "https://lisconne.jp/",
      src: LisConne,
      label:
        "戦略策定から施策までこれ一つで一気通貫で行う<br>事業成長に寄り添う営業支援ツール",
    },
    {
      url: "https://example.com",
      src: "https://placehold.jp/1000x300.png?text=New image",
      label: "Coming soon...",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* AppBar */}
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 10 }}
              fontWeight="bold"
            >
              セカンドエリア
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleContact}>お問い合わせ</MenuItem>
              <MenuItem onClick={handlelogout}>ログアウト</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* メインコンテンツ */}
        <ThemeProvider theme={theme}>
          <Box padding={4}>
            <Grid container spacing={4} marginTop={2}>
              {photos.map((photo, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  onClick={() => handlePhotoClick(photo.url)}
                  style={{ cursor: "pointer", textAlign: "center" }}
                >
                  <img
                    src={photo.src}
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                  <Typography variant="caption" display="block" marginTop={1} fontWeight="bold" fontSize={12}>
                    {parse(photo.label)}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ThemeProvider>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
