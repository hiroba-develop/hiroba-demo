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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  LinearProgress,
  Menu,
  MenuItem,
  Stack,
  Drawer,
} from "@mui/material";

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

// 定数の定義
const MENU_ITEMS = [
  { text: "ダッシュボード", icon: <DashboardIcon />, transition: "/dashboard" },
  { text: "ユーザー", icon: <PeopleIcon />, transition: "/dashboard" },
  { text: "レポート", icon: <BarChartIcon />, transition: "/dashboard" },
  { text: "プロジェクト", icon: <LayersIcon />, transition: "/dashboard" },
];

const CARD_DATA = [
  { title: "タスク完了率", value: "75%", progress: 75 },
  { title: "アクティブプロジェクト", value: "12" },
  { title: "新規メッセージ", value: "18" },
];

const ACTIVITY_DATA = [
  { date: "2023-05-01", user: "山田太郎", action: "タスク完了" },
  { date: "2023-05-02", user: "鈴木花子", action: "コメント追加" },
  { date: "2023-05-03", user: "佐藤次郎", action: "プロジェクト作成" },
];

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

// SummaryCardコンポーネントのプロパティの型定義
interface SummaryCardProps {
  title: string;
  value: string;
  progress?: number;
}

// カードコンポーネント
const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  progress,
}) => (
  <Card>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" component="div">
        {value}
      </Typography>
      {progress !== undefined && (
        <LinearProgress variant="determinate" value={progress} sx={{ mt: 2 }} />
      )}
    </CardContent>
  </Card>
);

// アクティビティテーブルコンポーネント
const ActivityTable: React.FC = () => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" gutterBottom>
      最近のアクティビティ
    </Typography>
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>日付</TableCell>
          <TableCell>ユーザー</TableCell>
          <TableCell>アクション</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ACTIVITY_DATA.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{row.date}</TableCell>
            <TableCell>{row.user}</TableCell>
            <TableCell>{row.action}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

// メインダッシュボードコンポーネント
const Dashboard: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const handleMenuItems = (transition: string) => {
    navigate(transition);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        {/* AppBar */}
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" }, mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ marginRight: 10 }}
            >
              セカンドエリア
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                }}
              >
                <List
                  sx={{ display: "flex", flexDirection: "row", padding: 0 }}
                >
                  {MENU_ITEMS.map(({ text, icon, transition }) => (
                    <ListItem
                      key={text}
                      disablePadding
                      sx={{ width: "auto", mr: 2 }}
                    >
                      <ListItemButton>
                        <IconButton
                          size="large"
                          aria-label="account of current user"
                          aria-controls="menu-appbar"
                          aria-haspopup="true"
                          onClick={() => handleMenuItems(transition)}
                          color="inherit"
                        >
                          <ListItemIcon
                            sx={{ color: "white", minWidth: "auto", mr: 1 }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={text}
                            sx={{ color: "white" }}
                          />
                        </IconButton>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
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
              <MenuItem onClick={handlelogout}>ログアウト</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* ドロワー */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          <List>
            {MENU_ITEMS.map(({ text, icon, transition }) => (
              <ListItemButton>
                <ListItem
                  key={text}
                  onClick={() => handleMenuItems(transition)}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        {/* メインコンテンツ */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            pt: 10,
            px: 3,
          }}
        >
          <Stack spacing={3}>
            {/* 概要カード */}
            <Stack direction="row" spacing={3} flexWrap="wrap">
              {CARD_DATA.map(({ title, value, progress }, index) => (
                <Box key={index} flex="1 1 25%">
                  <SummaryCard
                    title={title}
                    value={value}
                    progress={progress}
                  />
                </Box>
              ))}
            </Stack>

            {/* 最近のアクティビティとグラフ */}
            <Stack direction="row" spacing={3}>
              <Box flex="1">
                <ActivityTable />
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
