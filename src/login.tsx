import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  CircularProgress,
} from "@mui/material"
import { useNavigate } from 'react-router-dom';

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: "#00968e",
    },
  },
});

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // ここに実際の認証ロジックを追加します
    console.log("Login attempt", { email, password, rememberMe });

    navigate('/dashboard');

    // ローディング状態をシミュレート
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          bgcolor: "#e6f3f2",
          width: "100vw", // 必要であれば変更
        }}
      >
        <Card sx={{ width: "60vh", boxShadow: 3 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              align="center"
              color="primary"
              gutterBottom
            >
              ログイン
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                }
                label="ログイン情報を保存"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "ログイン"}
              </Button>
              <Link href="#" variant="body2" color="primary">
                パスワードをお忘れですか？
              </Link>
            </form>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

export default App;
